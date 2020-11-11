"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var crypto = require('crypto');

var fs = require('fs');

var readline = require('readline');

var _require = require('googleapis'),
    google = _require.google;

var googlesheets = require('./spreadsheets.js');

var app = (0, _express["default"])();
app.use(_express["default"].json()); //setings

app.set('port', process.env.PORT || 4000);
app.post('/peticionCallpicker', function (request, response) {
  // your JSON
  googlesheets.cargarASpreadsheet(request, 'Prueba callpicker', true, "");
  response.send('Transeferencia de datos exitosa');
}); //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

var WEBHOOK_SECRET = 'ed48d55bb633064d008dd320f9bfd8ab2a8fba6d15500b60ed55439443d3eca7ee8f86cc619e2775c34352485fc497d9';
var sucursal = 'Buenos aires';
app.post('/tawkto', function (req, res, next) {
  googlesheets.cargarTawkto(req, res, WEBHOOK_SECRET, sucursal);
});
var _default = app;
exports["default"] = _default;