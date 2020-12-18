"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tawkto = require('./tawkto.js');

var googleHoja = require('./spreadsheet/index.js');

var app = (0, _express["default"])();
app.use(_express["default"].json()); //setings

app.set('port', process.env.PORT || 4000);
app.get('/', function (request, response) {
  console.log("conecto correctamente");
  response.send('Conecto correctamente');
});
app.post('/peticionCallpicker', function (request, response) {
  // your JSON
  googleHoja.cargarAhoja(request, 'Callpicker', true, "");
  response.send('Transeferencia de datos exitosa');
}); //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

var WEBHOOK_SECRET1 = '8f5e6345ff835d9d8259abefc348013befa462facfeaf350b1dec2323f8b1c43ebd68fc4719dd08fcaec68851c57d73a';
var sucursal1 = 'Coapa';
app.post('/Coapa', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET1, sucursal1);
});
var WEBHOOK_SECRET2 = '86c6773b7397fb41e89fce697a422ebcb545e7897ccef3705a5232da14395f69bbf17a249def2c81003bdf0a48c0dfbb';
var sucursal2 = 'Boca del rio';
app.post('/BocaDelRio', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET2, sucursal2);
});
var WEBHOOK_SECRET3 = '6c0cea88dec4706d509596ab7c2c3f7c053984c24d340014f0662d72ec6934a59932ecc7a2f0126d535b621a74f1a751';
var sucursal3 = 'Interlomas';
app.post('/Interlomas', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET3, sucursal3);
});
var WEBHOOK_SECRET4 = '27a8885c806c8e1d1602fa7a1cdb6371c6684feb02f7655119aede597a661f35980a77732d9e503df7e8c9d738be8a43';
var sucursal4 = 'Palmas';
app.post('/Palmas', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET4, sucursal4);
});
var WEBHOOK_SECRET5 = '2e22660d5b6e5b934d0ecd6d6b6ace8b345a31e3ed263d281d1af646111bf7f31050a68135384eec223637c58fc130c9';
var sucursal5 = 'Roma norte';
app.post('/RomaNorte', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET5, sucursal5);
});
var WEBHOOK_SECRET6 = 'cfa073430de9b3ecbf290c793aca672a1be8d0987ccadbb6d3e8f626bdf7c357b7e93dedde4af877ee9575b8836300c6';
var sucursal6 = 'Santa Fe - Boutique';
app.post('/SantaFe', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET6, sucursal6);
});
var WEBHOOK_SECRET19 = '0bbdd67189710332775e537bbd936a99f658a9c823e96d5a40b249a9f3a7df7727e4a8b1c28c5286cb4800ebc2f4e3a8';
var sucursal19 = 'Lindavista';
app.post('/Lindavista', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET19, sucursal19);
});
var WEBHOOK_SECRET9 = 'fb12e57be68045356284255ce4ef73f1562537f7481472383b874aecba4e8d53902b14bc8c49aa6bae959c49448b9c6a';
var sucursal9 = 'Narvarte';
app.post('/Narvarte', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET9, sucursal9);
});
var WEBHOOK_SECRET7 = 'b162968c136e56eb1888bfd057add6515b611bb757fdd57ad9830090c63261fb3398a4288f61811359b0715ed13e0ebb';
var sucursal7 = 'Santa Fe';
app.post('/SantaFe2', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET7, sucursal7);
});
var WEBHOOK_SECRET8 = '4207aaaad031773f5366b72f63b8d65bf466a8123b34e30239dca36f456a28e995955ad7e466e11caf6ce88d07a0eefd';
var sucursal8 = 'Mixcoac';
app.post('/Mixcoac', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET8, sucursal8);
});
var WEBHOOK_SECRET10 = '6c763003b10d57e28ff8857cacbf1a120821f24d0afa8b51ac2a17844fe722518bda783d56f79c018225261dc1df7645';
var sucursal10 = 'Roma';
app.post('/Roma', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET10, sucursal10);
});
var WEBHOOK_SECRET11 = '959d53c1036bc0fca573a7cdc4839dff85ea2e5c5aab846a7a96a12a63248b0c9f69ff2d3f50847d6eec4bc51fa1d208';
var sucursal11 = 'Polanco';
app.post('/Principal', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET11, sucursal11);
});
var WEBHOOK_SECRET12 = '7c8bf9e90589e43fc1572f304592a0807ffc8ea213923885dab6da301fd89838955c9f85a606d78258bcb5f84f5a76fa';
var sucursal12 = 'Chapultepec';
app.post('/Chapultepek', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET12, sucursal12);
});
var WEBHOOK_SECRET13 = 'a45615b285421f961c87b75c1d5cf1cc3b9c0a388ea05463b2a238dac85cdea3c0cb931f571c19ed6612b6260cb4c868';
var sucursal13 = 'Guadalupe Inn';
app.post('/GuadalupeInn', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET13, sucursal13);
});
var WEBHOOK_SECRET14 = '596b4a09ca8a61ac964ed13bbc19f3b1c732967ea279c2e3f30d6d14f4b9ba12c93fe09da2f7795609ff7bc5f0f146d9';
var sucursal14 = 'Leon';
app.post('/Leon', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET14, sucursal14);
});
var WEBHOOK_SECRET15 = 'a8f2f557825335cc3b88701ac7cbc10b12333d8a928b36e5f1f0a85dbd22bffb440b9d50446d3127c63b731b02262acc';
var sucursal15 = 'Org';
app.post('/Org', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET15, sucursal15);
});
var WEBHOOK_SECRET16 = '5d2cc6ed13b27a079f03eb49b6a1442510a62f4c81f9de0b8ce7f319d7c7912e14efc3acda17e6aafd64a4f514dd1a04';
var sucursal16 = 'Tecamachalco';
app.post('/Tecamachalco', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET16, sucursal16);
});
var WEBHOOK_SECRET17 = 'ed3ec3473425f38999634867812f0b67bf2a7546b16e1f18cc7247fb4ce79e86313143dea74a61a5dd6272fd18b7dcde';
var sucursal17 = 'Satelite';
app.post('/Satelite', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET17, sucursal17);
});
var WEBHOOK_SECRET18 = '70ffaebc3e0532836192164d8f1503a6ed7d3361e86943bf8b6125137bddd79a0d3bba1890104846904fa0fb32d10954';
var sucursal18 = 'Sonrisas';
app.post('/Sonrisas', function (req, res, next) {
  tawkto.cargarTawkto(req, res, WEBHOOK_SECRET18, sucursal18);
});
var _default = app;
exports["default"] = _default;