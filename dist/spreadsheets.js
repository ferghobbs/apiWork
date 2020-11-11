"use strict";

var crypto = require('crypto');

var fs = require('fs');

var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google;

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_PATH = 'token.json';

function cargarASpreadsheet(request, hoja, callpicker, ciudad) {
  var cargado = false;
  fs.readFile('credentials.json', function (err, content) {
    if (err) return console.log('Error loading client secret file:', err); // Authorize a client with credentials, then call the Google Sheets API.

    authorize(JSON.parse(content), listMajors);
  });

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
    var values;

    if (callpicker) {
      values = [[// Cell values ...
      request.body.duration, request.body.answered_by, request.body.date, request.body.city] // Additional rows ...
      ];
    } else {
      values = [[// Cell values ...
      ciudad, request.body.visitor.name, request.body.time.substr(0, 10), request.body.visitor.city] // Additional rows ...
      ];
    }

    var sheets = google.sheets({
      version: 'v4',
      auth: auth
    });
    var resource = {
      values: values
    };
    sheets.spreadsheets.values.append({
      'spreadsheetId': '1RcLoACX_Fgs-KB0_au40fX5KILxvHY5I6kotC4sD0x0',
      'range': hoja + '!A2:C',
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
}

function cargarTawkto(req, res, WEBHOOK_SECRET, sucursal) {
  if (!verifySignature(JSON.stringify(req.body), req.headers['x-tawk-signature'], WEBHOOK_SECRET)) {
    console.log("Verificacion tawk to fallo");
  } else {
    spreadsheets.cargarTawkto(req, 'Tawk.to', false, sucursal);
    res.sendStatus(200);
    console.log("Verificacion tawk to succes");
  } // verification success

}

function verifySignature(body, signature, WEBHOOK) {
  console.log("Verificando cuenta tawk to");
  var digest = crypto.createHmac('sha1', WEBHOOK).update(body).digest('hex');
  return signature === digest;
}

;
exports.cargarTawkto = cargarTawkto;
exports.cargarASpreadsheet = cargarASpreadsheet;