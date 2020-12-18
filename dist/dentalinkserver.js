"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('fs'),
    fdatasync = _require.fdatasync;

var https = require('https');

var monday = require('./monday.js');

var google = require('./spreadsheet/index.js');

var token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar; // Para sacar presupuesto de citas, obtenerlo desde id_tratamiento 
// monday : presupuesto, 

function actualizacionDiaria() {
  return _actualizacionDiaria.apply(this, arguments);
}

function _actualizacionDiaria() {
  _actualizacionDiaria = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var date, agregarEstado, loop, _loop;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _loop = function _loop3() {
              _loop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(largo, data) {
                var j, itemName, idPaciente, nombreDentista, fechaCita, horaFC, motivoConsulta, primerPago, presupuesto, proximaCitaDia, horaPC, abonoLibre, telefono, sucursal, tratamiento, idTratamiento, paciente, pacNuevo, estadoCita, citasTratamiento, aux, dentalink;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        j = 0;

                      case 1:
                        if (!(j < largo)) {
                          _context.next = 44;
                          break;
                        }

                        console.log("Estado de la cita: " + data[j].id_estado.toString() + " : " + data[j].estado_cita);
                        itemName = void 0, idPaciente = void 0, nombreDentista = void 0, fechaCita = void 0, horaFC = void 0, motivoConsulta = void 0, primerPago = void 0, presupuesto = void 0, proximaCitaDia = void 0, horaPC = void 0, abonoLibre = void 0, telefono = void 0, sucursal = void 0;
                        _context.next = 6;
                        return buscarTratamiento(data[j].id_tratamiento);

                      case 6:
                        tratamiento = _context.sent;
                        idTratamiento = tratamiento.id;
                        _context.next = 10;
                        return pedirDatos('pacientes/' + data[j].id_paciente, '');

                      case 10:
                        paciente = _context.sent;
                        telefono = paciente.data.celular;

                        if (telefono == undefined) {
                          telefono = pactien.data.telefono;
                        }

                        pacNuevo = false;
                        itemName = data[j].nombre_paciente;
                        idPaciente = data[j].id_paciente.toString();
                        nombreDentista = tratamiento.nombre;
                        fechaCita = data[j].fecha;
                        horaFC = data[j].hora_inicio;
                        primerPago = tratamiento.abonado;
                        presupuesto = tratamiento.total;
                        abonoLibre = tratamiento.abono_libre;
                        telefono = telefono;
                        sucursal = tratamiento.nombre_sucursal;
                        estadoCita = data[j].estado_cita;
                        console.log("Nombre del tratamiento: " + tratamiento.nombre);
                        _context.next = 28;
                        return pedirDatos('tratamientos/' + tratamiento.id + '/citas', '');

                      case 28:
                        citasTratamiento = _context.sent;

                        if (!esPrimeraCitaAtendida(citasTratamiento.data, data[j].id)) {
                          _context.next = 38;
                          break;
                        }

                        pacNuevo = true;
                        console.log("Se encontro primera cita");
                        motivoConsulta = undefined; // TODO: Ver como arreglar esto

                        aux = obtenerProximaCita(citasTratamiento.data, data[j].id);
                        proximaCitaDia = aux.fecha;
                        horaPC = aux.hora; //cargo en monday

                        _context.next = 38;
                        return monday.subirFilaAMonday(itemName, idPaciente, nombreDentista, fechaCita, horaFC, motivoConsulta, primerPago, presupuesto, proximaCitaDia, horaPC, abonoLibre, telefono, sucursal);

                      case 38:
                        dentalink = {
                          name: itemName,
                          id: idPaciente,
                          nombreDent: nombreDentista,
                          idT: idTratamiento,
                          estCita: estadoCita,
                          fechaC: fechaCita,
                          horaC: horaFC,
                          pPago: primerPago,
                          pres: presupuesto,
                          abL: abonoLibre,
                          tel: telefono,
                          suc: sucursal,
                          pNuevo: pacNuevo
                        };
                        _context.next = 41;
                        return google.cargarDentalink(dentalink, 'dentalinkCitas', false, presupuesto);

                      case 41:
                        j++;
                        _context.next = 1;
                        break;

                      case 44:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _loop.apply(this, arguments);
            };

            loop = function _loop2(_x8, _x9) {
              return _loop.apply(this, arguments);
            };

            date = obtenerDia();
            agregarEstado = ', "id_estado":{"eq":"2"}}';
            console.log("Actualizacion de monday diaria iniciada... "); //cargarCitasDiarias();

            _context2.next = 7;
            return actualizacionASPreadSIn2();

          case 7:
            _context2.next = 9;
            return pedirDatos('citas', '?q={"fecha":{"eq":' + date + '}, "id_estado":{"eq":"2"}}');

          case 9:
            infoDentalinkSinprocesar = _context2.sent;
            //infoDentalinkSinprocesar = await buscarPresupuesto(894)
            //infoDentalinkSinprocesar = await buscarProximasCitas(aux,988)
            console.log("Se cargan citas del dia: " + date);
            console.log("cantidad de citas en el dia que fueron atendidas: " + infoDentalinkSinprocesar.data.length.toString());
            ;
            loop(infoDentalinkSinprocesar.data.length, infoDentalinkSinprocesar.data);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _actualizacionDiaria.apply(this, arguments);
}

function actualizacionDiariaSpreadSheet() {
  return _actualizacionDiariaSpreadSheet.apply(this, arguments);
}

function _actualizacionDiariaSpreadSheet() {
  _actualizacionDiariaSpreadSheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _actualizacionDiariaSpreadSheet.apply(this, arguments);
}

function obtenerDia() {
  var date1 = new Date();
  var date = date1 - 1000 * 60 * 60 * 24; //console.log(new Date(date));

  return formatDate(date);
}

function esPrimeraCitaAtendida(citasTratamiento, citaId) {
  var esPrimeraCita = false;
  var i = citasTratamiento.length - 1;
  var loop = true;
  console.log("CAntidad de citas por tratamiento : " + (i + 1).toString());

  while (loop && i >= 0) {
    if (citasTratamiento[i].estado_cita == "Atendido") {
      if (citasTratamiento[i].id == citaId) {
        esPrimeraCita = true;
        loop = false;
      } else {
        esPrimeraCita = false;
        loop = false;
      }
    }

    i--;
  }

  return esPrimeraCita;
}

function obtenerProximaCita(citasTratamiento, citaId) {
  var proxCita = {
    fecha: undefined,
    hora: undefined
  };
  var i = citasTratamiento.length - 1;
  var loop = true;

  while (loop && i >= 0) {
    if (citasTratamiento[i].id == citaId) {
      if (i - 1 >= 0) {
        proxCita.fecha = citasTratamiento[i - 1].fecha;
        proxCita.hora = citasTratamiento[i - 1].hora_inicio;
        loop = false; // TODO: Chequear si la proxima cita no se cancelo
      }
    }

    i--;
  }

  return proxCita;
}

function obtenerTelefonoPaciente(_x) {
  return _obtenerTelefonoPaciente.apply(this, arguments);
}

function _obtenerTelefonoPaciente() {
  _obtenerTelefonoPaciente = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(idPaciente) {
    var paciente;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return pedirDatos('pacientes/' + idPaciente, '');

          case 2:
            paciente = _context4.sent;
            console.log(paciente.data.celular);
            return _context4.abrupt("return", paciente.data.celular);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _obtenerTelefonoPaciente.apply(this, arguments);
}

function cargarSucursales(_x2) {
  return _cargarSucursales.apply(this, arguments);
}

function _cargarSucursales() {
  _cargarSucursales = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sucursales) {
    var i;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < sucursales.length)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 4;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 6000);
            });

          case 4:
            monday.agregarGrupo(normalize(sucursales[i].nombre));
            console.log("Se cargo: " + normalize(sucursales[i].nombre));

          case 6:
            i++;
            _context5.next = 1;
            break;

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _cargarSucursales.apply(this, arguments);
}

function cargarCitasDiarias() {
  return _cargarCitasDiarias.apply(this, arguments);
}

function _cargarCitasDiarias() {
  _cargarCitasDiarias = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var date, citas, loop, _loop4;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _loop4 = function _loop6() {
              _loop4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(largo) {
                var i, itemName, presupuesto, fechaPC, horarioPC, proximaCita;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        i = 0;

                      case 1:
                        if (!(i < largo)) {
                          _context6.next = 22;
                          break;
                        }

                        _context6.next = 4;
                        return new Promise(function (resolve) {
                          return setTimeout(resolve, 5000);
                        });

                      case 4:
                        if (!esClienteNuevo(citas.data[i])) {
                          _context6.next = 19;
                          break;
                        }

                        itemName = +citas.data[i].nombre_paciente;
                        _context6.next = 8;
                        return buscarTratamiento(citas.data[i].id_tratamiento);

                      case 8:
                        presupuesto = _context6.sent;
                        fechaPC = void 0;
                        horarioPC = void 0;
                        _context6.next = 13;
                        return buscarProximasCitas('"' + citas.data[i].fecha + '"', citas.data[i].id_paciente);

                      case 13:
                        proximaCita = _context6.sent;

                        if (proximaCita) {
                          fechaPC = proximaCita.fecha;
                          horarioPC = proximaCita.hora_inicio;
                        }

                        _context6.next = 17;
                        return google.cargarDentalink(citas.data[i], 'dentalinkCitas', false, presupuesto);

                      case 17:
                        _context6.next = 19;
                        return monday.subirFilaAMonday(itemName, normalize(citas.data[i].nombre_sucursal), presupuesto.total, citas.data[i].fecha, citas.data[i].hora_inicio, fechaPC, horarioPC, citas.data[i].nombre_paciente, citas.data[i].estado_cita);

                      case 19:
                        i++;
                        _context6.next = 1;
                        break;

                      case 22:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));
              return _loop4.apply(this, arguments);
            };

            loop = function _loop5(_x10) {
              return _loop4.apply(this, arguments);
            };

            date = '"2020-11-16"';
            _context7.next = 5;
            return pedirDatos('citas', '?q={"fecha":{"eq":' + date + '}}');

          case 5:
            citas = _context7.sent;
            ;
            loop(citas.data.length);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _cargarCitasDiarias.apply(this, arguments);
}

function buscarTratamiento(_x3) {
  return _buscarTratamiento.apply(this, arguments);
}

function _buscarTratamiento() {
  _buscarTratamiento = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(idTratamiento) {
    var tratamiento;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return pedirDatos('tratamientos/' + idTratamiento, '');

          case 2:
            tratamiento = _context8.sent;
            return _context8.abrupt("return", tratamiento.data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _buscarTratamiento.apply(this, arguments);
}

function buscarProximasCitas(_x4, _x5) {
  return _buscarProximasCitas.apply(this, arguments);
}

function _buscarProximasCitas() {
  _buscarProximasCitas = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(date, id) {
    var citas;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return pedirDatos('pacientes/' + id + '/citas', '?q={"fecha":{"gt":' + date + '}}');

          case 2:
            citas = _context9.sent;
            return _context9.abrupt("return", citas.data[0]);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _buscarProximasCitas.apply(this, arguments);
}

function pedirDatos(_x6, _x7) {
  return _pedirDatos.apply(this, arguments);
}

function _pedirDatos() {
  _pedirDatos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(extension, queryString) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 5000);
            });

          case 2:
            return _context10.abrupt("return", new Promise(function (resolve) {
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
            }));

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _pedirDatos.apply(this, arguments);
}

exports.actualizarData = actualizacionDiaria;

var normalize = function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for (var i = 0, j = from.length; i < j; i++) {
    mapping[from.charAt(i)] = to.charAt(i);
  }

  return function (str) {
    var ret = [];

    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);else ret.push(c);
    }

    return ret.join('').replace(/[^-A-Za-z0-9]+/g, '_').toLowerCase();
  };
}();

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate() + '"',
      year = '"' + d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 3) day = '0' + day;
  return [year, month, day].join('-');
} // not equeal to 2


function actualizacionASPreadSIn2() {
  return _actualizacionASPreadSIn.apply(this, arguments);
}

function _actualizacionASPreadSIn() {
  _actualizacionASPreadSIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var date, agregarEstado, citas, loop, _loop7;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _loop7 = function _loop9() {
              _loop7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(largo, data) {
                var j, itemName, idPaciente, nombreDentista, fechaCita, horaFC, motivoConsulta, primerPago, presupuesto, proximaCitaDia, horaPC, abonoLibre, telefono, sucursal, tratamiento, idTratamiento, paciente, pacNuevo, estadoCita, citasTratamiento, aux, dentalink;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        j = 0;

                      case 1:
                        if (!(j < largo)) {
                          _context11.next = 36;
                          break;
                        }

                        console.log("Estado de la cita: " + data[j].id_estado.toString() + " : " + data[j].estado_cita);
                        itemName = void 0, idPaciente = void 0, nombreDentista = void 0, fechaCita = void 0, horaFC = void 0, motivoConsulta = void 0, primerPago = void 0, presupuesto = void 0, proximaCitaDia = void 0, horaPC = void 0, abonoLibre = void 0, telefono = void 0, sucursal = void 0;
                        _context11.next = 6;
                        return buscarTratamiento(data[j].id_tratamiento);

                      case 6:
                        tratamiento = _context11.sent;
                        idTratamiento = tratamiento.id;
                        _context11.next = 10;
                        return pedirDatos('pacientes/' + data[j].id_paciente, '');

                      case 10:
                        paciente = _context11.sent;
                        telefono = paciente.data.celular;

                        if (telefono == undefined) {
                          telefono = pactien.data.telefono;
                        }

                        pacNuevo = false;
                        itemName = data[j].nombre_paciente;
                        idPaciente = data[j].id_paciente.toString();
                        nombreDentista = tratamiento.nombre;
                        fechaCita = data[j].fecha;
                        horaFC = data[j].hora_inicio;
                        primerPago = tratamiento.abonado;
                        presupuesto = tratamiento.total;
                        abonoLibre = tratamiento.abono_libre;
                        telefono = telefono;
                        sucursal = tratamiento.nombre_sucursal;
                        estadoCita = data[j].estado_cita;
                        console.log("Nombre del tratamiento: " + tratamiento.nombre);
                        _context11.next = 28;
                        return pedirDatos('tratamientos/' + tratamiento.id + '/citas', '');

                      case 28:
                        citasTratamiento = _context11.sent;

                        //console.log(data[j].idPaciente)
                        if (esPrimeraCitaAtendida(citasTratamiento.data, data[j].id)) {
                          pacNuevo = true;
                          console.log("Se encontro primera cita");
                          motivoConsulta = undefined; // TODO: Ver como arreglar esto

                          aux = obtenerProximaCita(citasTratamiento.data, data[j].id);
                          proximaCitaDia = aux.fecha;
                          horaPC = aux.hora; //cargo en monday
                          //TODO: Cargar en google sheet
                          //await monday.subirFilaAMonday(itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago,presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal);
                        }

                        dentalink = {
                          name: itemName,
                          id: idPaciente,
                          nombreDent: nombreDentista,
                          idT: idTratamiento,
                          estCita: estadoCita,
                          fechaC: fechaCita,
                          horaC: horaFC,
                          pPago: primerPago,
                          pres: presupuesto,
                          abL: abonoLibre,
                          tel: telefono,
                          suc: sucursal,
                          pNuevo: pacNuevo
                        };
                        _context11.next = 33;
                        return google.cargarDentalink(dentalink, 'dentalinkCitas', false, presupuesto);

                      case 33:
                        j++;
                        _context11.next = 1;
                        break;

                      case 36:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
              return _loop7.apply(this, arguments);
            };

            loop = function _loop8(_x11, _x12) {
              return _loop7.apply(this, arguments);
            };

            date = obtenerDia();
            agregarEstado = ', "id_estado":{"neq":"2"}}'; //cargarCitasDiarias();

            _context12.next = 6;
            return pedirDatos('citas', '?q={"fecha":{"eq":' + date + '}, "id_estado":{"neq":"2"}}');

          case 6:
            citas = _context12.sent;
            console.log("cantidad de citas en el dia que no fueron atendidas: " + citas.data.length.toString());
            ;
            loop(citas.data.length, citas.data);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _actualizacionASPreadSIn.apply(this, arguments);
}