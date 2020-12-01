import '@babel/polyfill'

import app from './server';
const denta = require('./dentalinkserver.js');
const monday = require ('./monday.js')

var cron = require('node-cron');


async function main(){
    await app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))

    //monday.cargarSucursaleJSON();
    //denta.actualizarData();
    
    //monday.subirFilaAMonday('Gonzalo Pelotudo', 'roma_norte',0,"2019-06-03","12:00:00","2020-12-08","20:16:15",'Fernando','Asistido')
    //cron.schedule('*/5 * * * * *', () => {
        //console.log('entre')
        
       
      //},{
       // scheduled: true,
        //timezone: "America/Mexico_City"
      //});
}



main();