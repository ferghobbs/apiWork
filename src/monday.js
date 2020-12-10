const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch')

//var token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjkxMTY2NzI1LCJ1aWQiOjE3MjI2MDI3LCJpYWQiOiIyMDIwLTExLTE3VDE2OjM1OjQwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.m_PZDojXOXIANAMdAsKLbSs9haIuxbwXKcaDfufpJWw'
//var sucursalIdDefault = 'topics'
var item_name = 'Default'
//var idBoard= '861032256';

var idBoard = "861085342";
var token = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4NTI2OTU5LCJ1aWQiOjEwNjYyNDcwLCJpYWQiOiIyMDIwLTEwLTIwVDAxOjE1OjA1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9._IxIFFWwfuegTLrfQxDAWNjAbXBfTy_4yquoosrp7xc";


 async function subirFilaNueva(itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago, presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal){

  //let sucursalMonday = await buscarIdSucursal(sucursal)

   let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:861085342, item_name:$myItemName, column_values:$columnVals) { id } }';
   //numMotivoConsulta = codificarMotivoConsulta(motivoConsulta);

  let vars = {
    "myItemName" : itemName || item_name,
    "columnVals" : JSON.stringify({
      "texto" : idPaciente, //id paciente
      "texto9" : nombreDentista, // odontolog general 
      "fecha" : {"date" : fechaCita ,"time": horaFC }, // fecha valoracion
      "tipo_paciente7" : "NUEVO" ,  // Tipo paciente, (nuevo, revalorizacion, actual ), va siempre nuevo? hay que fijarse si con 1 se llena nuevo
      "men__desplegable5" : motivoConsulta,// Esto esta pesimo 
      "n_meros" : primerPago, 
      "due_date":{"date" : fechaCita ,"time": horaFC }, // Fecha primera cita? idem fecha valorizacion? 
      "date":{"date" : proximaCitaDia ,"time": horaPC }, // Proximo contacto 
      "numbers" : presupuesto, // presupuesto
      "n_meros2": presupuesto-primerPago, // Pago estimado
      "numbers8" : undefined, // (primerPago-abonoLibre) , // Probabilidad de pago? 
      "texto5" : telefono,
      "texto1": sucursal
    })
  };
  let query6= 'mutation {create_item (board_id: 861085342, item_name: "new item") { id }}'
  fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body: JSON.stringify({
      'query' : query5,
      'variables' : JSON.stringify(vars)
    })
  }).then(res => res.json())
  .then(res => console.log(res.data));
}


//Agrega un grupo
async function agregarGrupo(nombre){
  let queryGroup = 'mutation {create_group (board_id:'+idBoard+', group_name:'+nombre+') {id}}'
  fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body: JSON.stringify({
      'query' : queryGroup
    })
  }).then(res => res.json())
  .then(res => console.log(JSON.stringify(res, null, 2)));
}

function codificarMotivoConsulta(motivoConsulta1)
{ 
  motivoConsultaAux= motivoConsulta1.toLowerCase();
  numaro= 1;
  switch(motivoConsultaAux) {
    case "Alineadores Invisibles":
      numero=2;
      // code block
      break;
    case "Implantes":
      numero=3;
      // code block
      break;
    case "Blanqueamiento":
      numero=4;
      break;    
    case "Caries":
      numero=5;
      break;
    case "Dolor - Urgencia":
      numero=6;
      break;
    case "Diseño de Sonrisa":
      numero=7;
      break;
    case "Prótesis":
      numero=8;
      break;
    case "Extracciones y/o Cirugías":
      numero=9;
      break;
    case "Limpieza":
      numero=10;
      break;
    

    } 
  return numero;
}

// Carga en sucursalesMonday.json los idgroup y nombres

async function cargarSucursal(){


  let queryBoard = 'query{boards{id name}}';
  
 
/*
  await fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body: JSON.stringify({
      'query' : queryBoard
    })
  }).then(res => res.json())
  .then(res =>{
    for(let i=0; i<res.data.boards.length; i++ ){
      if(res.data.boards[i].name=== "Dentalink"){
        idBoard=res.data.boards[i].id;
      }     
    }
     } )*/
  
  let queryGroups = 'query{boards(ids:'+idBoard+'){groups{id title}}}';
  let jsonSucursales; 

  await fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body: JSON.stringify({
      'query' : queryGroups
    })
  }).then(res => res.json())
  .then(res => jsonSucursales=res.data.boards[0].groups);


  fs.writeFile('sucursalesMonday.json', JSON.stringify(jsonSucursales), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

 function buscarIdSucursal(sucursal){
    return new Promise(resolve=>{
      let sucursales;
    let idSucursal = sucursalIdDefault
      fs.readFile('sucursalesMonday.json',  function (err,data) {
      if (err) throw err;
      
      sucursales=JSON.parse(data)
      
      for(let i=0; i< sucursales.length; i++){
        if(sucursales[i].title===sucursal){
          idSucursal= sucursales[i].id
          break;
        }}
        resolve(idSucursal)
    })
  })
  }

  exports.agregarGrupo = agregarGrupo;
  exports.subirFilaAMonday = subirFilaNueva;
  exports.cargarSucursaleJSON = cargarSucursal;


  

  