const { fdatasync } = require('fs');
const https = require('https')
const monday = require('./monday.js')
const google = require('./spreadsheet/index.js')
const token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar;

// Para sacar presupuesto de citas, obtenerlo desde id_tratamiento 
// monday : presupuesto, 
async function actualizacionDiaria(){
    let aux = '"2020-11-16"'
    let date = '"2020-11-16"'
    console.log("Actualizacion de monday diaria iniciada... ");

    //cargarCitasDiarias();
    infoDentalinkSinprocesar = await pedirDatos('citas','?q={"fecha":{"eq":'+date+'}}')
    //infoDentalinkSinprocesar = await pedirDatos('cajas','')
    //infoDentalinkSinprocesar = await pedirDatos('sucursales','')
    //infoDentalinkSinprocesar = await buscarPresupuesto(894)
    //infoDentalinkSinprocesar = await buscarProximasCitas(aux,988)
    console.log(infoDentalinkSinprocesar.data.length)
    //cargarSucursales(infoDentalinkSinprocesar.data)

    
   
}

async function cargarSucursales(sucursales){
  for(let i = 0 ; i<sucursales.length; i++){
    await new Promise(resolve => setTimeout(resolve,6000));
    monday.agregarGrupo(normalize(sucursales[i].nombre))
    console.log("Se cargo: "+normalize(sucursales[i].nombre))
  }
}

async function cargarCitasDiarias(){
  let date = '"2020-11-16"'
  let citas = await pedirDatos('citas','?q={"fecha":{"eq":'+date+'}}')
  async function loop(largo) {
    for (let i = 0; i < largo; i++) {
        await new Promise(resolve => setTimeout(resolve,5000));
        let itemName= 'Cliente '+ citas.data[i].id_paciente
        let presupuesto = await buscarPresupuesto(citas.data[i].id_tratamiento)
        let fechaPC;
        let horarioPC
        let proximaCita = await buscarProximasCitas('"'+citas.data[i].fecha+'"',citas.data[i].id_paciente)
        if(proximaCita) {
          fechaPC = proximaCita.fecha
          horarioPC = proximaCita.hora_inicio
        }
        await google.cargarDentalink(citas.data[i],'dentalinkCitas',false,presupuesto)
        await monday.subirFilaAMonday(itemName,normalize(citas.data[i].nombre_sucursal),presupuesto.total,citas.data[i].fecha,citas.data[i].hora_inicio,fechaPC,horarioPC,citas.data[i].nombre_paciente,citas.data[i].estado_cita)

    }
};
loop(citas.data.length);


}
async function buscarPresupuesto(idTratamiento){
  let tratamiento = await pedirDatos('tratamientos/'+idTratamiento,'')
  return tratamiento.data
}
async function buscarProximasCitas(date,id){
  
  let citas = await pedirDatos('pacientes/'+id+'/citas','?q={"fecha":{"gt":'+date+'}}')
  return citas.data[0]
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


exports.actualizarData = actualizacionDiaria;

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '_' ).toLowerCase();
  }
 
})()
