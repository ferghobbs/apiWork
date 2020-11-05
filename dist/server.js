"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fs = require('fs');

var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google;

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_PATH = 'token.json';
var app = (0, _express["default"])();
app.use(_express["default"].json()); //setings

app.set('port', process.env.PORT || 3000);
app.get("/", function (req, res) {
  return res.send("Hello world");
});
app.post('/peticionCallpicker', function (request, response) {
  // your JSON
  cargarASpreadsheet(request);
  response.send('Transeferencia de datos exitosa');
});

function cargarASpreadsheet(request) {
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
    var colA;
    var colB;
    var colC;

    if (request.body.duration) {
      colA = request.body.duration;
    } else {
      colA = "0";
    }

    if (request.body.answered_by) {
      colB = request.body.answered_by;
    } else {
      colB = " ";
    }

    ;

    if (request.body.date) {
      colC = request.body.date;
    } else {
      colC = " ";
    }

    var sheets = google.sheets({
      version: 'v4',
      auth: auth
    });
    var values = [[// Cell values ...
    colA, colB, colC] // Additional rows ...
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
}

var _default = app;
exports["default"] = _default;