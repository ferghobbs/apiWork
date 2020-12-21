import '@babel/polyfill'

import app from './server';
const denta = require('./dentalinkserver.js');
const monday = require ('./monday.js')

var cron = require('node-cron');

async function main(){
    await app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))

    cron.schedule('0 0 3 * * *', () => {
      console.log('entre')
      denta.actualizarData();
      },{
        scheduled: true,
        timezone: "America/Mexico_City"
      });
}



main();

