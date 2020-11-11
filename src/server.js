import express from 'express'
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const googlesheets = require('./spreadsheets.js');




const app = express();

app.use(express.json());
//setings

app.set('port', process.env.PORT ||4000 );



app.post('/peticionCallpicker', function(request, response) {
       // your JSON
       googlesheets.cargarASpreadsheet(request,'Prueba callpicker',true,"")
      response.send('Transeferencia de datos exitosa'); 
    
    

});

 //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

 const WEBHOOK_SECRET = 'ed48d55bb633064d008dd320f9bfd8ab2a8fba6d15500b60ed55439443d3eca7ee8f86cc619e2775c34352485fc497d9';
const sucursal = 'Buenos aires'

app.post('/tawkto', function (req, res, next) {

  googlesheets.cargarTawkto(req,res,WEBHOOK_SECRET,sucursal)

});

 export default app;