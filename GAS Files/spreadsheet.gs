const doGet = (e) => {  
  const game = e.parameter.game;
  const playtime = e.parameter.playtime;
  const start = e.parameter.start;
  const end = e.parameter.end;
  
  const sheet = SpreadsheetApp.getActiveSheet();

  sheet.appendRow([game, playtime, start, end]);
}