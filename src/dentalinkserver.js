
const https = require('https')
const monday = require('./monday.js')
const google = require('./spreadsheet/index.js')
const token = "txtZpq29rffsB80lplLc3rSy6IIf1sS0BV8n8ZAu.YWHlAxLYmqba4KuVY9c4VJroNiypCkv97NDrQVd5";
var infoDentalinkSinprocesar;


async function actualizacionDiaria(){
    let date = obtenerDia();
    console.log("Actualizacion de monday diaria iniciada... ");

    await actualizacionASPreadSIn2(date);
    infoDentalinkSinprocesar = await pedirDatos('citas','?q={"fecha":{"eq":'+date+'}, "id_estado":{"eq":"2"}}')

    
    console.log("Se cargan citas del dia: "+ date)
    console.log("cantidad de citas en el dia que fueron atendidas: "+ infoDentalinkSinprocesar.data.length.toString())
    async function loop(largo, data) {
      for (let j = 0; j < largo; j++) {
        console.log("Estado de la cita: "+data[j].id_estado.toString()+ " : "+ data[j].estado_cita)
          let  itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago, presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal;
          let tratamiento = await buscarTratamiento(data[j].id_tratamiento)
          let idTratamiento = tratamiento.id;
          let paciente  = await pedirDatos('pacientes/'+data[j].id_paciente,'');
           telefono = paciente.data.celular;
          if(telefono == undefined){
            telefono = pactien.data.telefono;
          }
          let pacNuevo= false;
          itemName = data[j].nombre_paciente;
          idPaciente = data[j].id_paciente.toString();
          nombreDentista =tratamiento.nombre
          fechaCita = data[j].fecha;
          horaFC = data[j].hora_inicio;
          primerPago = tratamiento.abonado;
          presupuesto = tratamiento.total;
          abonoLibre = tratamiento.abono_libre;
          telefono = telefono;
          sucursal = tratamiento.nombre_sucursal
          let estadoCita = data[j].estado_cita;
          
          console.log("Nombre del tratamiento: "+ tratamiento.nombre)
          let citasPorPaciente = await pedirDatos('pacientes/'+idPaciente+'/citas','')

          if(esPrimeraCitaAtendida(citasPorPaciente.data,data[j].id ))
          { 
            pacNuevo = true;
            console.log("Se encontro primera cita")
            
            motivoConsulta = undefined;
            let aux = obtenerProximaCita(citasPorPaciente.data,data[j].id);
            proximaCitaDia = aux.fecha;
            horaPC = aux.hora;

            
            //cargo en monday
            
            await monday.subirFilaAMonday(itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago,presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal);
            
          }
          let dentalink = { name : itemName , id: idPaciente , nombreDent : nombreDentista, idT: idTratamiento , estCita : estadoCita,  fechaC : fechaCita , horaC : horaFC , pPago : primerPago, pres : presupuesto , abL : abonoLibre , tel : telefono , suc : sucursal , pNuevo : pacNuevo  }
          await google.cargarDentalink(dentalink,'dentalinkCitas',false,presupuesto)
          
  
      }
  };
  loop(infoDentalinkSinprocesar.data.length,infoDentalinkSinprocesar.data);
}
function obtenerDia()
{
  let date1 = new Date();
  let date = (date1 - 1000* 60 *60 *24)
  return formatDate(date)
  

}
function esPrimeraCitaAtendida(citasTratamiento,citaId )
{   
    let esPrimeraCita= false;
    let i = citasTratamiento.length-1;
    let loop = true;
    console.log("CAntidad de citas del paciente : "+ (i+1).toString());
    while(loop && i>=0)
    {
      if(citasTratamiento[i].estado_cita == "Atendido")
      {
        if(citasTratamiento[i].id == citaId){
          esPrimeraCita = true;
          loop=false;
        }
        else{
          esPrimeraCita= false;
          loop = false;
        }
      }
      i--;
    }
    return esPrimeraCita;
}

function obtenerProximaCita(citasTratamiento,citaId)
{ 
  let proxCita ={ fecha: undefined , hora :undefined};
  let i = citasTratamiento.length-1;
  let loop = true;
  while(loop && i>=0)
  {
    if(citasTratamiento[i].id == citaId)
      {
        if(i-1>=0)
        {
        proxCita.fecha = citasTratamiento[i-1].fecha;
        proxCita.hora = citasTratamiento[i-1].hora_inicio;
        loop=false;
        // TODO: Chequear si la proxima cita no se cancelo
      }
    }
    i--;
  }  
  return proxCita;
}


async function buscarTratamiento(idTratamiento){
  let tratamiento = await pedirDatos('tratamientos/'+idTratamiento,'')
  return tratamiento.data
}

async function pedirDatos(extension,queryString){
  await new Promise(resolve => setTimeout(resolve,5000));
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


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth()+1 ),
      day = '' + d.getDate()+ '"',
      year = '"'+d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 3) 
      day = '0' + day;

  return [year, month, day].join('-');
}

// Carga citas que no fueron atendidas a goggle sheet

async function actualizacionASPreadSIn2(day){
  let date = day;
  let agregarEstado = ', "id_estado":{"neq":"2"}}'
  //cargarCitasDiarias();
  let citas = await pedirDatos('citas','?q={"fecha":{"eq":'+date+'}, "id_estado":{"neq":"2"}}')
  console.log("cantidad de citas en el dia que no fueron atendidas: "+ citas.data.length.toString())

  async function loop(largo, data) {
    for (let j = 0; j < largo; j++) {
      console.log("Estado de la cita: "+data[j].id_estado.toString()+ " : "+ data[j].estado_cita)
        let  itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago, presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal;
        let tratamiento = await buscarTratamiento(data[j].id_tratamiento)
        let idTratamiento = tratamiento.id;
        let paciente  = await pedirDatos('pacientes/'+data[j].id_paciente,'');
         telefono = paciente.data.celular;
        if(telefono == undefined){
          telefono = pactien.data.telefono;
        }
        let pacNuevo= false;
        itemName = data[j].nombre_paciente;
        idPaciente = data[j].id_paciente.toString();
        nombreDentista =tratamiento.nombre
        fechaCita = data[j].fecha;
        horaFC = data[j].hora_inicio;
        primerPago = tratamiento.abonado;
        presupuesto = tratamiento.total;
        abonoLibre = tratamiento.abono_libre;
        telefono = telefono;
        sucursal = tratamiento.nombre_sucursal
        let estadoCita = data[j].estado_cita;
        
        
        console.log("Nombre del tratamiento: "+ tratamiento.nombre)
        let citasTratamiento = await pedirDatos('tratamientos/'+tratamiento.id+'/citas','')

        if(esPrimeraCitaAtendida(citasTratamiento.data,data[j].id ))
        { 
          pacNuevo = true;
          console.log("Se encontro primera cita")
          
          motivoConsulta = undefined; 
          let aux = obtenerProximaCita(citasTratamiento.data,data[j].id);
          proximaCitaDia = aux.fecha;
          horaPC = aux.hora;

        }
        let dentalink = { name : itemName , id: idPaciente , nombreDent : nombreDentista, idT: idTratamiento , estCita : estadoCita,  fechaC : fechaCita , horaC : horaFC , pPago : primerPago, pres : presupuesto , abL : abonoLibre , tel : telefono , suc : sucursal , pNuevo : pacNuevo  }
        await google.cargarDentalink(dentalink,'dentalinkCitas',false,presupuesto)
        

    }
};
loop(citas.data.length,citas.data);
}