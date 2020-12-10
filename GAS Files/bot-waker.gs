var GLITCH_URL = "https://{YOUR_GLITCH_PROJECT_NAME}.glitch.me";
function wakeGlitch(){
 var json = {
   'type':'wake'
 };
 sendGlitch(GLITCH_URL, json);
}

function sendGlitch(uri, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(uri, params);
}