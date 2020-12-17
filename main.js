const discord = require("discord.js");
const client = new discord.Client();

const moment = require("moment-timezone");

const http = require("http");
const requestPromise = require("request-promise");
const querystring = require("querystring");

moment.tz.setDefault("Asia/Tokyo");

// 記録開始時刻をログ出力まで保持しておくための変数
let start = undefined;


client.on("ready", message => {
  console.log("bot is ready!");
});


// Steamのプレイログを出力する
client.on("presenceUpdate", (oldPresence, newPresence) => { 
  if (newPresence.userID == process.env.USER_ID) {
    if (!oldPresence.activities[0]) return false;

    oldPresence.activities.forEach(activity => {
      if (activity.type == "PLAYING") {
        // 現在もプレイ中である場合（activity.detailsとかが変わるとpresenceUpdateのトリガーがかかる）
        newPresence.activities.forEach(newActivity => {
          if (start == undefined) {
            start = activity.createdTimestamp;
          }
        });
        
        // プレイしていたゲームが終了した場合
        if (!newPresence.activities[0]) {
          if (start == undefined) {
              start = activity.createdTimestamp;
          }
          let end = Date.now();
          let playtime = moment.duration(end - start);

          let hour = playtime.hours();
          let minute = ("00" + playtime.minutes()).slice(-2);
          let second = ("00" + playtime.seconds()).slice(-2);

          let startDate = moment(start).format("YYYY/MM/DD HH:mm:ss");
          let endDate = moment(end).format("YYYY/MM/DD HH:mm:ss");


          // プレイログをDiscordに出力
          if (playtime.hours() == 0) {
            client.channels.cache.get(process.env.CHANNEL_ID).send(`${activity.name}を${playtime.minutes()}分プレイしました`);
          } else {
            client.channels.cache.get(process.env.CHANNEL_ID).send(`${activity.name}を${playtime.hours()}時間${playtime.minutes()}分プレイしました`);
          }
          
          // プレイログをspreadsheetに出力
          let url = process.env.GAS_URL;

          // spreadsheet URLにパラメータを付加
          url = `${url}?game=${activity.name}&playtime=${hour}:${minute}:${second}&start=${startDate}&end=${endDate}`;

          // 文字コードの変換
          url = encodeURI(url);

          // API通信
          const doApi = async () => {
            try {
              const result = await requestPromise({
                uri: url,
                method: "GET"
              });
            } catch (error) {
              console.log("Error message: " + error.message);
            }
          };

          // 実行
          doApi();
          
          // 変数の初期化
          start = undefined;
          }
        } 
    });
  }
});


// GASを用いてbotを定期的に起動させる
http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          console.log("No post data");
          res.end();
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);


// ENV関係
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

if (process.env.USER_ID == undefined) {
  console.log("please set ENV: USER_ID");
  process.exit(0);
}

if (process.env.CHANNEL_ID == undefined) {
  console.log("please set ENV: CHANNEL_ID");
  process.exit(0);
}

if (process.env.GAS_URL == undefined) {
  console.log("please set ENV: GAS_URL\nOR if you don't want to record playlog in spreadsheet, please comment out lines 42-70 and here.");
  process.exit(0);
}