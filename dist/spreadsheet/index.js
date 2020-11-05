"use strict";

/*
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
var url = 'https://api.callpicker.com/oauth/token';
req.open('POST',url , true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200)
     
        var datos = JSON.parse(req.responsetext);
        console.log("Entre");}
     else{
        console.log(req.responseText);
  }
};
req.send(null); 

console.log("hOLA MUNDO");

const https = require('https')



const data = JSON.stringify({
    grant_type: 'Buy client_credentials milk',
    scope:"calls",
    client_id:"CP.CU.xxx.xxxxxx",
    client_secret:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  });

const options = {
  hostname: 'https://api.callpicker.com',
  port: 443,
  path: '/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
      console.log(d);
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
*/
//process.exit(1)

/*
const https =   require("https");

const key = "5ZJRkLDIgV37M0glEB22P9u0fBNY69l8BnFhwsNt";

let url = "https://api.nasa.gov/planetary/apod?api_key="+ key;
https.get(url, resp =>{
  let data ='';
  resp.on("data", chunk =>{
      data += chunk;

  });
  resp.on("end", ()=>{
    let final = JSON.parse(data);
    console.log(final);
  });
  resp.on("error", error=>{
    console.log(error.message);

  })
})
*/
var fs = require('fs');

var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google; // If modifying these scopes, delete token.json.


var SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; // The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

var TOKEN_PATH = 'token.json'; // Load client secrets from a local file.

fs.readFile('credentials.json', function (err, content) {
  if (err) return console.log('Error loading client secret file:', err); // Authorize a client with credentials, then call the Google Sheets API.

  authorize(JSON.parse(content), listMajors);
});
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, callback) {
  var _credentials$installe = credentials.installed,
      client_secret = _credentials$installe.client_secret,
      client_id = _credentials$installe.client_id,
      redirect_uris = _credentials$installe.redirect_uris;
  var oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // Check if we have previously stored a token.

  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */


function getNewToken(oAuth2Client, callback) {
  var authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oAuth2Client.getToken(code, function (err, token) {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token); // Store the token to disk for later program executions

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listMajors(auth) {
  var sheets = google.sheets({
    version: 'v4',
    auth: auth
  });
  var values = [[// Cell values ...
  "Llamada ", "Gonzalo"] // Additional rows ...
  ];
  var resource = {
    values: values
  };
  sheets.spreadsheets.values.append({
    'spreadsheetId': '1RcLoACX_Fgs-KB0_au40fX5KILxvHY5I6kotC4sD0x0',
    'range': 'Prueba callpicker!B2:C',
    'valueInputOption': 'RAW',
    'resource': resource
  }, function (err, result) {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log(result.data);
    }
  });
}
/*
self.addEventListener('push', (event) => {
  // data is available in event.data
})*/