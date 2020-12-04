import '@babel/polyfill'

import app from './server';
const denta = require('./dentalinkserver.js');
const monday = require ('./monday.js')

var cron = require('node-cron');


async function main(){
    await app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))

    //monday.cargarSucursaleJSON();

    
    //monday.subirFilaAMonday('Gonzalo',"15654","clinicaboutiquedental@gmail.com","2020-12-03","12:00:00",undefined,1500,50000,"2020-12-08","20:16:15",20000,"+5215551870867")
    
    cron.schedule('0 0 3 * * *', () => {
        console.log('entre')
        denta.actualizarData();
      },{
        scheduled: true,
        timezone: "America/Mexico_City"
      });
}



main();

