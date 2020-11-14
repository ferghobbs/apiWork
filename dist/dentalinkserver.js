"use strict";

var _require = require('fs'),
    fdatasync = _require.fdatasync;

var https = require('https');

var token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar;

function actualizacionDiaria() {
  console.log("Actualizacion de monday diaria iniciada... "); //pedirDatos
  //ProcesarDatos

  var options = {
    //hostname: "api.nasa.gov",
    // path: '/planetary/apod?api_key=DEMO_KEY',
    //method: 'GET'
    hostname: 'https://api.dentalink.healthatom.com',
    path: '/api/v1/dentistas',
    method: "GET",
    headers: {
      "Authorization": "Token " + token
    }
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

function pedirDatos(extension, queryString) {
  infoDentalinkSinprocesar = "";
  var url = '/api/v1/' + extension;
  var url = encodeURI(url + queryString);
  var settings = {
    hostname: 'https://api.dentalink.healthatom.com',
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
      infoDentalinkSinprocesar = data;
    });
  });
  req.on('error', function (error) {
    console.error(error);
  });
  req.end();
}

function pedirDatosQueryJson(extension, queryJson) {
  pedirDatos(extension, '?q=' + JSON.stringify(queryJson));
}

exports.actualizarData = actualizacionDiaria;