"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var readline = require('readline');

var fetch = require('node-fetch'); //var token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjkxMTY2NzI1LCJ1aWQiOjE3MjI2MDI3LCJpYWQiOiIyMDIwLTExLTE3VDE2OjM1OjQwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.m_PZDojXOXIANAMdAsKLbSs9haIuxbwXKcaDfufpJWw'
//var sucursalIdDefault = 'topics'


var item_name = 'Default'; //var idBoard= '861032256';

var idBoard = "861085342";
var token = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4NTI2OTU5LCJ1aWQiOjEwNjYyNDcwLCJpYWQiOiIyMDIwLTEwLTIwVDAxOjE1OjA1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9._IxIFFWwfuegTLrfQxDAWNjAbXBfTy_4yquoosrp7xc";

function subirFilaNueva(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13) {
  return _subirFilaNueva.apply(this, arguments);
} //Agrega un grupo


function _subirFilaNueva() {
  _subirFilaNueva = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(itemName, idPaciente, nombreDentista, fechaCita, horaFC, motivoConsulta, primerPago, presupuesto, proximaCitaDia, horaPC, abonoLibre, telefono, sucursal) {
    var query5, vars, query6;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //let sucursalMonday = await buscarIdSucursal(sucursal)
            query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:861085342, item_name:$myItemName, column_values:$columnVals) { id } }'; //numMotivoConsulta = codificarMotivoConsulta(motivoConsulta);

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
                "numbers8": primerPago - abonoLibre,
                // Probabilidad de pago? 
                "texto5": telefono,
                "texto1": sucursal
              })
            };
            query6 = 'mutation {create_item (board_id: 861085342, item_name: "new item") { id }}';
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

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _subirFilaNueva.apply(this, arguments);
}

function agregarGrupo(_x14) {
  return _agregarGrupo.apply(this, arguments);
}

function _agregarGrupo() {
  _agregarGrupo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(nombre) {
    var queryGroup;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryGroup = 'mutation {create_group (board_id:' + idBoard + ', group_name:' + nombre + ') {id}}';
            fetch("https://api.monday.com/v2", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                'query': queryGroup
              })
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return console.log(JSON.stringify(res, null, 2));
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _agregarGrupo.apply(this, arguments);
}

function codificarMotivoConsulta(motivoConsulta1) {
  motivoConsultaAux = motivoConsulta1.toLowerCase();
  numaro = 1;

  switch (motivoConsultaAux) {
    case "Alineadores Invisibles":
      numero = 2; // code block

      break;

    case "Implantes":
      numero = 3; // code block

      break;

    case "Blanqueamiento":
      numero = 4;
      break;

    case "Caries":
      numero = 5;
      break;

    case "Dolor - Urgencia":
      numero = 6;
      break;

    case "Diseño de Sonrisa":
      numero = 7;
      break;

    case "Prótesis":
      numero = 8;
      break;

    case "Extracciones y/o Cirugías":
      numero = 9;
      break;

    case "Limpieza":
      numero = 10;
      break;
  }

  return numero;
} // Carga en sucursalesMonday.json los idgroup y nombres


function cargarSucursal() {
  return _cargarSucursal.apply(this, arguments);
}

function _cargarSucursal() {
  _cargarSucursal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var queryBoard, queryGroups, jsonSucursales;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queryBoard = 'query{boards{id name}}';
            /*
              await fetch ("https://api.monday.com/v2", {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : token
                },
                body: JSON.stringify({
                  'query' : queryBoard
                })
              }).then(res => res.json())
              .then(res =>{
                for(let i=0; i<res.data.boards.length; i++ ){
                  if(res.data.boards[i].name=== "Dentalink"){
                    idBoard=res.data.boards[i].id;
                  }     
                }
                 } )*/

            queryGroups = 'query{boards(ids:' + idBoard + '){groups{id title}}}';
            _context3.next = 4;
            return fetch("https://api.monday.com/v2", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                'query': queryGroups
              })
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return jsonSucursales = res.data.boards[0].groups;
            });

          case 4:
            fs.writeFile('sucursalesMonday.json', JSON.stringify(jsonSucursales), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _cargarSucursal.apply(this, arguments);
}

function buscarIdSucursal(sucursal) {
  return new Promise(function (resolve) {
    var sucursales;
    var idSucursal = sucursalIdDefault;
    fs.readFile('sucursalesMonday.json', function (err, data) {
      if (err) throw err;
      sucursales = JSON.parse(data);

      for (var i = 0; i < sucursales.length; i++) {
        if (sucursales[i].title === sucursal) {
          idSucursal = sucursales[i].id;
          break;
        }
      }

      resolve(idSucursal);
    });
  });
}

exports.agregarGrupo = agregarGrupo;
exports.subirFilaAMonday = subirFilaNueva;
exports.cargarSucursaleJSON = cargarSucursal;