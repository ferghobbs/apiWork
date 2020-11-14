const { fdatasync } = require('fs');
const https = require('https')
const token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar;

// Para sacar presupuesto de citas, obtenerlo desde id_tratamiento 
// monday : presupuesto, 
async function actualizacionDiaria(){
    let date = '"2020-11-16"'
    console.log("Actualizacion de monday diaria iniciada... ");
    infoDentalinkSinprocesar = await pedirDatos('citas','?q={"fecha":{"eq":'+date+'}}')
    //infoDentalinkSinprocesar = await pedirDatos('cajas','')
    //infoDentalinkSinprocesar = await pedirDatos('pagos','')
    //infoDentalinkSinprocesar = await pedirDatos('pacientes/909','')
    console.log(infoDentalinkSinprocesar.data)
    var aux = await pedirDatos('tratamientos/'+infoDentalinkSinprocesar.data[2].id_tratamiento,'')
    console.log(aux.data.total)
    //var link1 =
    /*
    console.log(aux.data.links)
    for(let i=0; i<aux.data.links.length; i++){
      if(aux.data.links[i].rel === 'citas')
      {
    
      var link = aux.data.links[i].href.replace('https://api.dentalink.healthatom.com/api/v1/','')
      var aux2 = await pedirDatos(link,'')
      console.log(aux2)
    }
    }*/
   
}

function pedirDatos(extension,queryString){
  return new Promise(resolve=>{
  var url = '/api/v1/'+extension;
  var url = encodeURI(url+queryString);
  var settings = {
    hostname: 'api.dentalink.healthatom.com',
    path: url,
    method: "GET",
    headers: {
        "Authorization": "Token " + token
    }
  }
  const req = https.request(settings, res => {
    console.log(`statusCode: ${res.statusCode}`)
        let data = " ";
    res.on('data', d => {
        data = data + d
    })
    res.on('end', function() {
        console.log("Termino de Pasar")
        resolve(JSON.parse(data));
    }
  )})
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
})
}

function pedirDatosQueryJson(extension, queryJson){
  pedirDatos(extension, '?q='+JSON.stringify(queryJson))

}
exports.actualizarData = actualizacionDiaria;