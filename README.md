# Gaming-Logger Discord Bot
## このBotについて
PCで「いつ」「どのくらい」「どのゲーム」をプレイしたのかをDiscordのチャンネルとGoogle スプレッドシートに記録するDiscord Botです（24時間オンライン！）  
コードはNode.jsで記述してあり、Glitch\*上で動作を確認しています

\*Glitch: Node.jsを使ったウェブアプリを作成・公開することができるサービス

## 使い方
1. Discordのユーザー設定 > ゲームアクティビティから`起動しているゲームをステータスに表示する`をONにする
1. Discord Botを動作させる（詳細は下記参照）
1. 結果: PCゲームのプレイ内容が記録される！

## 注意
このBotの仕様と作成者の技術不足により、作成したBot自体の公開はしていません🙇‍♂️  
そのため、サーバーに導入する場合は各自でBotをつくる必要があります

以下にBot準備についての簡単な説明、詳細に関しては下記リンクの記事に書いたので、これら等を参考に各種設定を行ってみてください  
[page](link)

## 全体の構成図

<img src="https://user-images.githubusercontent.com/75773842/101753465-025e8400-3b16-11eb-894b-b39f2857dd3d.png" width="600px*">

## 必要なもの
- Glitchアカウント（Node.js実行環境が他にある場合はなくてもいいが、あったほうがGASとの連携が簡単）
- Googleアカウント
- Discordアカウント

## 準備
### 1) Botをつくる
- Discord Developer PortalにDiscordアカウントでログインし、Botを新規作成
  
- 作成後`SETTINGS` > `Bot` をクリックし、`PRESENCE INTENT`をONにする

### 2) Glitchのプロジェクトを作成する
- Glitchで`New Project` > `Import from Github`をクリックし、ポップアップ画面に下記URLをコピペ  
UUUUUUUUUUUUUURLLLLLLLLLLLLLLLLLLLLLLLLLL
  
- Importが成功したら`.env`を開き、DISCORD_BOT_TOKEN, USER_ID, CHANNEL_IDを入力  
このとき GAS_URL はまだ空欄でOK
  - `DISCORD_BOT_TOKEN` : 1)で作成したBotのページから`SETTINGS` > `Bot`の中にある`TOKEN`から入手できる文字列
  - `USER_ID`           : 自分のDiscord User ID 
  - `CHANNEL_ID`        : プレイ記録を出力したいチャンネルのChannel ID 

### 3) GASのプロジェクトを作成する① ーBotを24時間起動させるー
- Googleドライブから`＋新規` > `その他` > `Google Apps Script`を選択して新規プロジェクトを作成
  
- 右記リンク記事の手順3をやる => [EOiさんのnote記事](https://note.com/exteoi/n/nf1c37cb26c41#oj02A)  
（Glitch`GAS Files`フォルダ内の`bot-waker.gs`の中身はこの記事のコードと同内容です）  

### 4) GASのプロジェクトを作成する② ースプレッドシートへの書き込みー
- Googleドライブに戻り、`＋新規` > `Google スプレッドシート`で新規スプレッドシートを開く
- 画面上のツールバーから`ツール` > `スクリプト エディタ`でGASの新規プロジェクトを作成
  
- 表示されているスクリプトファイル`コード.js`にGlitch`GAS Files`フォルダ内の`spreadsheet.gs`の中身をコピペして保存
  - 上記の作業が終わったらGlitchの`GAS Files`は削除してOK
- 画面上のツールバーから`公開` > `ウェブアプリケーションとして導入`、ポップアップ画面一番下の`Who has access to the app:`だけ`Anyone, even anonymous`に変更して導入をクリック
  - [許可を承認] をクリックして次の画面でアカウントを選択、警告画面は 3) と同様に [詳細]、[安全ではないページに移動] をクリック
  - 最後に[許可]ボタンをクリックすると、今作成したウェブアプリケーションのURLが生成されるのでこれをコピー
- Glitchに戻って`.env`を開き、`GAS_URL`の欄に↑でコピーしたURLを貼り付け

### 5) 最終確認
- Steam等の適当なゲームを起動して、Discordの自分のステータスにゲーム名が表示されていることを確認する
  - 表示されていなかったら上記の使い方 1. をやる
- ゲームを閉じた後、以下の2点を確認する
  - Discordの指定したチャンネルにメッセージが送信されているか
  - スプレッドシートにゲーム名、プレイ時間、開始時刻、終了時刻が出力されているか
  
- 全部OKだったら完了です！お疲れさまでした👏

## 連絡先
不明点、気づいたことなどありましたら、お手数ですが下記のいずれかにご連絡ください
- Twitter: [@esmieimse](https://twitter.com/esmieimse)
- Discord: esmie#9408
