// this is one example of preparing data into JSON format to send to API
function sheet1Data() {
  var preparedArray = [];
  for(var i=0;i<spreadsheet1Data.length;i++)
  {
    // make sure to adjust the date if working dates/times (spreadsheet time !== server time)
    // This was important to me but you can put any other logic here
    // to skip a row for invalid data. Remove this check if you dont
    // need to validate or prefer to validate differently.
    var thisItemDate = universalDate(new Date(spreadsheet1Data[i][3])).getTime();
    var thisItemDateInvalid = isEmpty(thisItemDate) || !isNumber(thisItemDate);
    // check if a valid listing
    if ((thisItemDateInvalid) || isEmpty(spreadsheet1Data[i][3])) {
      // "Skip this row if date value invalid"
    }
    // proceed
    else {
      preparedArray.push({
        'columntitle1': spreadsheet1Data[i][0], // column A
        'columntitle2': spreadsheet1Data[i][1], // column B
        'columntitle3': spreadsheet1Data[i][2], // column C
        'columntitle4': thisItemDate // forced date value seen in above check
     });
    }
  }
 return preparedArray;
}
