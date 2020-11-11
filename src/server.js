import express from 'express'

const tawkto = require('./tawkto.js');
const googleHoja = require('./spreadsheet/index.js')



const app = express();

app.use(express.json());
//setings

app.set('port', process.env.PORT ||3000 );

app.get('/', function () {
      console.log("conecto correctamente")
})

app.post('/peticionCallpicker', function(request, response) {
       // your JSON
       googleHoja.cargarAhoja(request,'Callpicker',true,"")
      response.send('Transeferencia de datos exitosa'); 
    
    

});

 //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

 const WEBHOOK_SECRET = 'ed48d55bb633064d008dd320f9bfd8ab2a8fba6d15500b60ed55439443d3eca7ee8f86cc619e2775c34352485fc497d9';
const sucursal = 'Buenos aires'

app.post('/tawkto', function (req, res, next) {

  tawkto.cargarTawkto(req,res,WEBHOOK_SECRET,sucursal)
});

/*
const WEBHOOK_SECRET1= 'fwe'
const sucursal1 = 'Cordoba'
app.post('/'+sucursal1, function (req, res, next) {

  googlesheets.cargarTawkto(req,res,WEBHOOK_SECRET1,sucursal1)

});*/

 export default app;