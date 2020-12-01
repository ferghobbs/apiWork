"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('fs'),
    fdatasync = _require.fdatasync;

var https = require('https');

var token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar; // Para sacar presupuesto de citas, obtenerlo desde id_tratamiento 
// monday : presupuesto, 

function actualizacionDiaria() {
  return _actualizacionDiaria.apply(this, arguments);
}

function _actualizacionDiaria() {
  _actualizacionDiaria = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var date, aux;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            date = '"2020-11-16"';
            console.log("Actualizacion de monday diaria iniciada... ");
            _context.next = 4;
            return pedirDatos('citas', '?q={"fecha":{"eq":' + date + '}}');

          case 4:
            infoDentalinkSinprocesar = _context.sent;
            //infoDentalinkSinprocesar = await pedirDatos('cajas','')
            //infoDentalinkSinprocesar = await pedirDatos('pagos','')
            //infoDentalinkSinprocesar = await pedirDatos('pacientes/909','')
            console.log(infoDentalinkSinprocesar.data);
            _context.next = 8;
            return pedirDatos('tratamientos/' + infoDentalinkSinprocesar.data[2].id_tratamiento, '');

          case 8:
            aux = _context.sent;
            console.log(aux.data.total); //var link1 =

            /*
            console.log(aux.data.links)
            for(let i=0; i<aux.data.links.length; i++){
              if(aux.data.links[i].rel === 'citas')
              {
            
              var link = aux.data.links[i].href.replace('https://api.dentalink.healthatom.com/api/v1/','')
              var aux2 = await pedirDatos(link,'')
              console.log(aux2)
            }
            }*/

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _actualizacionDiaria.apply(this, arguments);
}

function pedirDatos(extension, queryString) {
  return new Promise(function (resolve) {
    var url = '/api/v1/' + extension;
    var url = encodeURI(url + queryString);
    var settings = {
      hostname: 'api.dentalink.healthatom.com',
      path: url,
      method: "GET",
      headers: {
        "Authorization": "Token " + token
      }
    };
    var req = https.request(settings, function (res) {
      console.log("statusCode: ".concat(res.statusCode));
      var data = " ";
      res.on('data', function (d) {
        data = data + d;
      });
      res.on('end', function () {
        console.log("Termino de Pasar");
        resolve(JSON.parse(data));
      });
    });
    req.on('error', function (error) {
      console.error(error);
    });
    req.end();
  });
}

function pedirDatosQueryJson(extension, queryJson) {
  pedirDatos(extension, '?q=' + JSON.stringify(queryJson));
}

exports.actualizarData = actualizacionDiaria;