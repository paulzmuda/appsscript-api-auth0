function refreshToken(_callback, args) {
  var output = {
    "client_id": AUTH0_CLIENT_ID,
    "client_secret": AUTH0_CLIENT_SECRET,
    "audience": AUTH0_AUDIENCE,
    "grant_type":"client_credentials"
  };
  var url = AUTH0_AUTH_URL;
  var options = {
    'method': 'POST',
    'contentType': 'application/json',
    'payload' : JSON.stringify(output)
  };
  var response = UrlFetchApp.fetch(url, options);
  response = JSON.parse(response);
  var token = response.access_token;
  var tokenReceived = new Date().getTime();

  var storedTokenObject = {
    token: response.access_token,
    expireTime: (new Date().getTime() + (response.expires_in * 1000)) - 1000000
  };

  storedTokenObject = JSON.stringify(storedTokenObject);
  PropertiesService.getScriptProperties().setProperty('API_TOKEN', storedTokenObject);
  if(TESTING_MODE) {
    MailApp.sendEmail(DEVELOPER_EMAIL, APPLICATION_NAME + ' New Token Expire Time', JSON.parse(PropertiesService.getScriptProperties().getProperty('API_TOKEN')).expireTime);
  }
  return _callback(token, args);
}

function apiAccess(_callback, args) {
  if(!args) {
    var args = {};
    args.data = '';
  }
  var tokenObject = JSON.parse(PropertiesService.getScriptProperties().getProperty('API_TOKEN'));
  if(isTokenValid(tokenObject)){
    return _callback(tokenObject.token, args);
  } else {
    return refreshToken(_callback, args);
  }
}

function isTokenValid(tokenObject) {
  if(!tokenObject) {
    return false;
  }
  if(!tokenObject.token) { // does property exist?
   return false;
  }
  if(!tokenObject.expireTime) { // does property exist?
    return false;
  }
  if(tokenObject.token.length < 100) {  // valid token exists in object?
    return false; // get a new token false
  }
  if(tokenObject.expireTime < new Date().getTime()) {
    return false; // a refresh is needed false
  } else {
    return true; // no refresh needed true
  }
}

function syncSheet1Example() {
  return apiAccess(function(token) {
    var data = sheet1Data();
    var output = {
      'refId': 1, // anything that you need to reference with
      'data': data
    };
    var url = API_BASE_URL + '/target/path/';
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      "headers": { "Authorization": "Bearer " + token },
      'payload' : JSON.stringify(output)
    };
    var response = UrlFetchApp.fetch(url, options);
    response = JSON.parse(response);
    return response;
  });
}


