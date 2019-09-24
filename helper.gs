// this is hacked for use in the Central Time Zone
// 5am CST is the first hour the whole world has the same date. This is basically a bugfix to adjust for spreadsheet timezone and UTC on server.
function universalDate(adjustDate, timezone) {
  var timezone='CST';
  return adjustDate.setHours(adjustDate.getHours() + 5);
}

function isEmpty(value) {
  if((value.length < 2) || (value === null) || (value === undefined)) {
    return true;
  } else {
    return false;
  }
}

function isNumber(value) {
 return !isNaN(parseFloat(value)) && isFinite(value);
}


