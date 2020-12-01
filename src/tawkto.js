const crypto = require('crypto');
const googleSheets = require('./spreadsheet/index.js')


    function cargarTawkto(req,res,WEBHOOK_SECRET,sucursal){
      
    if (!verifySignature(JSON.stringify(req.body), req.headers['x-tawk-signature'],WEBHOOK_SECRET)) {
         
      console.log("Verificacion tawk to fallo")
    
      res.sendStatus(500)
      
  }else{
    googleSheets.cargarAhoja(req,'Tawkto',false,sucursal,true)
    res.sendStatus(200)
    console.log("Verificacion tawk to succes")
  }     
  
  // verification success


    }

    function verifySignature (body, signature,WEBHOOK ) {
      console.log("Verificando cuenta tawk to")
        const digest = crypto
            .createHmac('sha1', WEBHOOK)
            .update(body)
            .digest('hex');
        return signature === digest;
    };


exports.cargarTawkto = cargarTawkto;

//exports.cargarASpreadsheet = cargarASpreadsheet;