
const fetch = require('node-fetch')

var item_name = 'Default'

var token = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4NTI2OTU5LCJ1aWQiOjEwNjYyNDcwLCJpYWQiOiIyMDIwLTEwLTIwVDAxOjE1OjA1LjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9._IxIFFWwfuegTLrfQxDAWNjAbXBfTy_4yquoosrp7xc";


 async function subirFilaNueva(itemName,idPaciente,nombreDentista,fechaCita,horaFC,motivoConsulta,primerPago, presupuesto,proximaCitaDia,horaPC,abonoLibre,telefono,sucursal){


   let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:861085342, item_name:$myItemName, column_values:$columnVals) { id } }';
   

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

  exports.subirFilaAMonday = subirFilaNueva;


  

  