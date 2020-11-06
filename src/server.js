import express from 'express'
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');



const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_PATH = 'token.json';

const app = express();

app.use(express.json());
//setings

app.set('port', process.env.PORT ||4000 );



app.post('/peticionCallpicker', function(request, response) {
       // your JSON
    cargarASpreadsheet(request,'Prueba callpicker',true,"")
      response.send('Transeferencia de datos exitosa'); 
    
    

});

function cargarASpreadsheet(request,hoja,callpicker,ciudad){

let cargado = false;
  
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });
  
  
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  
  function listMajors(auth) {

    let values;
  
    if(callpicker){
      values= [
        [
          // Cell values ...
          request.body.duration, request.body.answered_by, request.body.date
        ],
        // Additional rows ...
      ];
    
  }else{
    [
      [
        // Cell values ...
        ciudad,request.body.name, request.body.visitor.name , request.body.visitor.city
      ],
      // Additional rows ...
    ];
    
    }
    const sheets = google.sheets({version: 'v4', auth});

    const resource = {
      values,
    };
  
    sheets.spreadsheets.values.append({
      'spreadsheetId':'1RcLoACX_Fgs-KB0_au40fX5KILxvHY5I6kotC4sD0x0',
      'range':hoja+'!A2:C',
      'valueInputOption': 'RAW',
      'resource': resource,
    }, (err, result) => {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log( result.data);
      }
    });
  
  }

}
 //tawk to 
// Poner Llave Secreta que te genera tawk.to al crear un webhook 

 const WEBHOOK_SECRET = 'ed48d55bb633064d008dd320f9bfd8ab2a8fba6d15500b60ed55439443d3eca7ee8f86cc619e2775c34352485fc497d9';
const sucursal = 'Buenos aires'
function verifySignature (body, signature) {
  console.log("Verificando cuenta tawk to")
    const digest = crypto
        .createHmac('sha1', WEBHOOK_SECRET)
        .update(body)
        .digest('hex');
    return signature === digest;
};
app.post('/tawkto', function (req, res, next) {
    if (!verifySignature(JSON.stringify(req.body), req.headers['x-tawk-signature'])) {
         
        console.log("Verificacion tawk to fallo")
        
        
    }else{
      cargarASpreadsheet(req,'Tawk.to',false,sucursal)
      res.sendStatus(200)
      console.log("Verificacion tawk to succes")
    }     
    
    // verification success

});

 export default app;