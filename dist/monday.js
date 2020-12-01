"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var readline = require('readline');

var fetch = require('node-fetch');

var token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjkwOTE3NjY0LCJ1aWQiOjE3MTc5OTE2LCJpYWQiOiIyMDIwLTExLTE0VDIzOjE1OjIyLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.2HtVGmiiyKiLj3gJDdVjRaeRA6gbxwr7jFnWOeJDiuA';
var group_id = 'grupo_nuevo67956';
var item_name = 'Hello world';
var query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:855974821,group_id:' + group_id + ', item_name:$myItemName, column_values:$columnVals) { id } }';

function subirFilaNueva(_x, _x2) {
  return _subirFilaNueva.apply(this, arguments);
} // Carga en sucursalesMonday.json los idgroup y nombres


function _subirFilaNueva() {
  _subirFilaNueva = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(itemName, sucursal) {
    var sucursalMonday, query5, vars;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sucursalMonday = group_id;
            sucursalMonday = buscarIdSucursal(sucursal);
            query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:855974821,group_id:' + sucursalMonday + ', item_name:$myItemName, column_values:$columnVals) { id } }';
            vars = {
              "myItemName": itemName || item_name,
              "columnVals": JSON.stringify({
                "texto": "text1",
                "date": {
                  "date": "1992-07-05"
                },
                "status": {
                  "index": 2
                },
                "n_meros": 55000
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
              return console.log(JSON.stringify(res, null, 2));
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _subirFilaNueva.apply(this, arguments);
}

function cargarSucursal() {
  return _cargarSucursal.apply(this, arguments);
}

function _cargarSucursal() {
  _cargarSucursal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var queryBoard, idBoard, queryGroups, jsonSucursales;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryBoard = 'query{boards{id name}}';
            _context2.next = 3;
            return fetch("https://api.monday.com/v2", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify({
                'query': queryBoard
              })
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              return idBoard = res.data.boards[0].id;
            });

          case 3:
            queryGroups = 'query{boards(ids:' + idBoard + '){groups{id title}}}';
            _context2.next = 6;
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

          case 6:
            fs.writeFile('sucursalesMonday.json', JSON.stringify(jsonSucursales), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _cargarSucursal.apply(this, arguments);
}

exports.subirFilaAMonday = subirFilaNueva;
exports.cargarSucursaleJSON = cargarSucursal;