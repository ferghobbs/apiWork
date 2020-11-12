const { fdatasync } = require('fs');
const https = require('https')
function actualizacionDiaria(){
    console.log("Actualizacion de monday diaria iniciada... ");

    let options = {
        hostname: "api.nasa.gov",
        path: '/planetary/apod?api_key=DEMO_KEY',
        method: 'GET'
      }
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
        let data = " ";
    res.on('data', d => {
        data = data + d
    })
    res.on('end', function() {
        console.log("Termino de Pasar")
        let aux = JSON.parse(data)
        console.log(aux.date)
    }
  )})
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()
}

exports.actualizarData = actualizacionDiaria;