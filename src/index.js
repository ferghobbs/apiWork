import '@babel/polyfill'

import app from './server';
const denta = require('./dentalinkserver.js');

var cron = require('node-cron');


async function main(){
    await app.listen(app.get('port'))
    console.log('Server on port ', app.get('port'))
    //cron.schedule('* * * * * *', () => {
    //    denta.actualizarData();
   //   });
}




main();