"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var googlesheets = require('./spreadsheets.js');

var googleHoja = require('./spreadsheet/index.js');

var app = (0, _express["default"])();
app.use(_express["default"].json()); //setings

app.set('port', process.env.PORT || 4000);
app.post('/peticionCallpicker', function (request, response) {
  // your JSON
  googleHoja.cargarAhoja(request, 'Prueba callpicker', true, "");
  response.send('Transeferencia de datos exitosa');
}); //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

var WEBHOOK_SECRET = 'ed48d55bb633064d008dd320f9bfd8ab2a8fba6d15500b60ed55439443d3eca7ee8f86cc619e2775c34352485fc497d9';
var sucursal = 'Buenos aires';
app.post('/tawkto', function (req, res, next) {
  googlesheets.cargarTawkto(req, res, WEBHOOK_SECRET, sucursal);
});
/*
const WEBHOOK_SECRET1= 'fwe'
const sucursal1 = 'Cordoba'
app.post('/'+sucursal1, function (req, res, next) {

  googlesheets.cargarTawkto(req,res,WEBHOOK_SECRET1,sucursal1)

});*/

var _default = app;
exports["default"] = _default;