"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetch = require('node-fetch');

var item_name = 'Default';
var token = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4NTI2OTU5LCJ1aWQiOjEwNjYyNDcwLCJpYWQiOiIyMDIwLTEwLTIwVDAxOjE1OjA1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9._IxIFFWwfuegTLrfQxDAWNjAbXBfTy_4yquoosrp7xc";

function subirFilaNueva(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13) {
  return _subirFilaNueva.apply(this, arguments);
}

function _subirFilaNueva() {
  _subirFilaNueva = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(itemName, idPaciente, nombreDentista, fechaCita, horaFC, motivoConsulta, primerPago, presupuesto, proximaCitaDia, horaPC, abonoLibre, telefono, sucursal) {
    var query5, vars;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:861085342, item_name:$myItemName, column_values:$columnVals) { id } }';
            vars = {
              "myItemName": itemName || item_name,
              "columnVals": JSON.stringify({
                "texto": idPaciente,
                //id paciente
                "texto9": nombreDentista,
                // odontolog general 
                "fecha": {
                  "date": fechaCita,
                  "time": horaFC
                },
                // fecha valoracion
                "tipo_paciente7": "NUEVO",
                // Tipo paciente, (nuevo, revalorizacion, actual ), va siempre nuevo? hay que fijarse si con 1 se llena nuevo
                "men__desplegable5": motivoConsulta,
                // Esto esta pesimo 
                "n_meros": primerPago,
                "due_date": {
                  "date": fechaCita,
                  "time": horaFC
                },
                // Fecha primera cita? idem fecha valorizacion? 
                "date": {
                  "date": proximaCitaDia,
                  "time": horaPC
                },
                // Proximo contacto 
                "numbers": presupuesto,
                // presupuesto
                "n_meros2": presupuesto - primerPago,
                // Pago estimado
                "numbers8": undefined,
                // (primerPago-abonoLibre) , // Probabilidad de pago? 
                "texto5": telefono,
                "texto1": sucursal
              })
            };
            fetch("https://api.monday.com/v2", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                'query': query5,
                'variables': JSON.stringify(vars)
              })
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return console.log(res.data);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _subirFilaNueva.apply(this, arguments);
}

exports.subirFilaAMonday = subirFilaNueva;