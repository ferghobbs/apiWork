const fs = require('fs');
const readline = require('readline');
const fetch = require('node-fetch')

var token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjkxMTY2NzI1LCJ1aWQiOjE3MjI2MDI3LCJpYWQiOiIyMDIwLTExLTE3VDE2OjM1OjQwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.m_PZDojXOXIANAMdAsKLbSs9haIuxbwXKcaDfufpJWw'
var sucursalIdDefault = 'topics'
var item_name = 'Default'
var idBoard= '861032256';




 async function subirFilaNueva(itemName,sucursal,presupuesto,fechaCita,horaFC,proximaCitaDia,horaPC,cliente,estadoCita){

  let sucursalMonday = await buscarIdSucursal(sucursal)

   let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:861032256,group_id:'+sucursalMonday+', item_name:$myItemName, column_values:$columnVals) { id } }';

  let vars = {
    "myItemName" : itemName || item_name,
    "columnVals" : JSON.stringify({
      "texto0" : sucursal,
      "fecha" : {"date" : fechaCita ,"time": horaFC },
      "fecha1":{"date" : proximaCitaDia ,"time": horaPC },
      "texto" : estadoCita,
      "n_meros": presupuesto||0,
      "texto4": cliente

    })
  };
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


  

  