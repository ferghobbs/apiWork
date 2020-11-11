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

const WEBHOOK_SECRET1 = '8f5e6345ff835d9d8259abefc348013befa462facfeaf350b1dec2323f8b1c43ebd68fc4719dd08fcaec68851c57d73a';
const sucursal1 = 'Coapa'

app.post('/Coapa', function (req, res, next) {

  tawkto.cargarTawkto(req,res,WEBHOOK_SECRET1,sucursal1)
});

const WEBHOOK_SECRET2 = '8f5e6345ff835d9d8259abefc348013befa462facfeaf350b1dec2323f8b1c43ebd68fc4719dd08fcaec68851c57d73a';
const sucursal2 = 'Boca del rio'

app.post('/BocaDelRio', function (req, res, next) {

  tawkto.cargarTawkto(req,res,WEBHOOK_SECRET2,sucursal2)
});

 export default app;