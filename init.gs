var APPLICATION_NAME='';
var DEVELOPER_EMAIL='';
var TESTING_MODE=true;

// AUTH0 variables
var AUTH0_CLIENT_ID='';
var AUTH0_CLIENT_SECRET='';
var AUTH0_AUDIENCE='';
var AUTH0_AUTH_URL='';

// API variables
var API_BASE_URL='';

// SHEETS SELECTED AND DEFINED
var ssActive = SpreadsheetApp.getActiveSpreadsheet();
var spreadsheet1 = ssActive.getSheetByName('Sheet1');
// ... new tabs in spreadsheet added here

// DATA SOURCE
var spreadsheet1Data = spreadsheet1.getRange(2,1,spreadsheet1.getLastRow(),spreadsheet1.getLastColumn()).getValues(); // selecting 2nd row because the 1st is usually a title row, then starting with 1st cell (2,1). Then dynamically get the last row and last column that any data exists.
// ... new tabs in spreadsheet added here

