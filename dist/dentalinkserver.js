"use strict";

var _require = require('fs'),
    fdatasync = _require.fdatasync;

var https = require('https');

function actualizacionDiaria() {
  console.log("Actualizacion de monday diaria iniciada... ");
  var options = {
    hostname: "api.nasa.gov",
    path: '/planetary/apod?api_key=DEMO_KEY',
    method: 'GET'
  };
  var req = https.request(options, function (res) {
    console.log("statusCode: ".concat(res.statusCode));
    var data = " ";
    res.on('data', function (d) {
      data = data + d;
    });
    res.on('end', function () {
      console.log("Termino de Pasar");
      var aux = JSON.parse(data);
      console.log(aux.date);
    });
  });
  req.on('error', function (error) {
    console.error(error);
  });
  req.end();
}

exports.actualizarData = actualizacionDiaria;