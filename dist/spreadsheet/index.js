"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google;

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_PATH = 'token.json';

function cargarASpreadsheet(request, hoja, callpicker, ciudad, tawkto) {
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
      var colA = "indefinido";

      if (request.body.caller_id) {
        colA = request.body.caller_id;
      }

      var colB = "indefinido";

      if (request.body.dialed_number) {
        colB = request.body.dialed_number;
      }

      values = [[// Cell values ... callpicker
      colA, colB, request.body.call_type, request.body.duration, request.body.answered_by, request.body.dialed_by, request.body.call_status, request.body.date.substr(0, 10), request.body.date.substr(11, 8), request.body.city, request.body.callpicker_number, request.body.municipality, request.body.state] // Additional rows ...
      ];
    } else {
      if (tawkto) {
        console.log(request.body);
        values = [[// Cell values ... tawkto
        ciudad, request.body.visitor.name, request.body.time.substr(0, 10), request.body.time.substr(11, 8), request.body.visitor.city, request.body.message.text] // Additional rows ...
        ];
      } else {
        // let dentalink = { name : itemName , id: idPaciente , nombreDent : nombreDentista }
        values = [[// Cell values ... dentalink
        request.name, request.id, request.nombreDent] // Additional rows ...
        ];
      }
    }

    var sheets = google.sheets({
      version: 'v4',
      auth: auth
    });
    var resource = {
      values: values
    };
    sheets.spreadsheets.values.append({
      'spreadsheetId': '14MQZiryRvCIipF5-9EcN7Kt_LQ4Lak4nA-dwTaa10RE',
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

function cargarDentalink(_x, _x2, _x3, _x4) {
  return _cargarDentalink.apply(this, arguments);
}

function _cargarDentalink() {
  _cargarDentalink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, hoja, callpicker, presupuesto) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            new Promise(function (resolve) {
              cargarASpreadsheet(data, hoja, callpicker, presupuesto, false);
              resolve(true);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cargarDentalink.apply(this, arguments);
}

exports.cargarAhoja = cargarASpreadsheet;
exports.cargarDentalink = cargarDentalink;