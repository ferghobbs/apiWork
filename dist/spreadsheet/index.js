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
        var time = tiempo(request.body.time);
        var hora = time.toString().substr(16, 8);
        var dia = formatDate(time);
        values = [[// Cell values ... tawkto
        ciudad, request.body.visitor.name, dia, hora, request.body.visitor.city, request.body.message.text] // Additional rows ...
        ];
      } else {
        //          let dentalink = { name : itemName , id: idPaciente , nombreDent : nombreDentista, idT: idTratamiento , estCita : estadoCita,  fechaC : fechaCita , horaC : horaFC , pPago : primerPago, pres : presupuesto , abL : abonoLibre , tel : telefono , suc : sucursal , pNuevo : pacNuevo  }
        values = [[// Cell values ... dentalink
        request.name, request.id, request.nombreDent, request.idT, request.estCita, request.fechaC, request.horaC, request.pPago, request.pres, request.abL, request.tel, request.suc, request.pNuevo] // Additional rows ...
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

function tiempo(timeTawkto) {
  var dia = new Date(timeTawkto.substr(0, 4), timeTawkto.substr(5, 2) - 1, timeTawkto.substr(8, 2), timeTawkto.substr(11, 2), timeTawkto.substr(14, 2), timeTawkto.substr(17, 3));
  var offset = dia - 6 * 60 * 60 * 1000;
  return new Date(offset);
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}