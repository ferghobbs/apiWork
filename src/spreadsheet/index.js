
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_PATH = 'token.json';

function cargarASpreadsheet(request,hoja,callpicker,ciudad,tawkto){
    
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

        if (callpicker) {
          var colA = "indefinido";
    
          if (request.body.caller_id) {
            colA = request.body.caller_id;
          }
    
          var colB = "indefinido";
    
          if (request.body.dialed_number) {
            colB = request.body.dialed_number;
          }
          
          values = [[// Cell values ... callpicker
          colA, colB, request.body.call_type, request.body.duration, request.body.answered_by, request.body.dialed_by, request.body.call_status, request.body.date.substr(0, 10), request.body.date.substr(11, 8), request.body.city, request.body.callpicker_number, request.body.municipality, request.body.state
        
              ] // Additional rows ...
          ];
        } else {
          if(tawkto){
            console.log(request.body)
            let time = tiempo(request.body.time);
            let hora = (time.toString().substr(16, 8))
            let dia = formatDate(time)
          values = [[// Cell values ... tawkto
          ciudad, request.body.visitor.name,dia, hora, request.body.visitor.city, request.body.message.text
            ] // Additional rows ...
          ];
          }else{//          let dentalink = { name : itemName , id: idPaciente , nombreDent : nombreDentista, idT: idTratamiento , estCita : estadoCita,  fechaC : fechaCita , horaC : horaFC , pPago : primerPago, pres : presupuesto , abL : abonoLibre , tel : telefono , suc : sucursal , pNuevo : pacNuevo  }

            values = [[// Cell values ... dentalink
              request.name,  request.id,request.nombreDent , request.idT , request.estCita, request.fechaC , request.horaC , request.pPago , request.pres , request.abL , request.tel , request.suc , request.pNuevo
            ] // Additional rows ...
              ];
          }
          
        }
        const sheets = google.sheets({version: 'v4', auth});
    
        const resource = {
          values,
        };
      
        sheets.spreadsheets.values.append({
          'spreadsheetId':'14MQZiryRvCIipF5-9EcN7Kt_LQ4Lak4nA-dwTaa10RE',
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

    async function cargarDentalink(data,hoja,callpicker,presupuesto){
      new Promise (resolve=>{
        cargarASpreadsheet(data,hoja,callpicker,presupuesto,false)
        resolve(true)
      })
    }

    exports.cargarAhoja = cargarASpreadsheet;
    exports.cargarDentalink = cargarDentalink;

  /*
function tiempo(timeTawkto)
{
    let dia = new Date(timeTawkto.substr(0, 4),timeTawkto.substr(5, 2)-1,timeTawkto.substr(8, 2),timeTawkto.substr(11, 2),timeTawkto.substr(14, 2),timeTawkto.substr(17,3));

    let offset = dia-dia.getTimezoneOffset()*60*1000-6*60*60*1000;

  return new Date(offset);
}
*/
function tiempo(timeTawkto)
{
    let dia = new Date(timeTawkto.substr(0, 4),timeTawkto.substr(5, 2)-1,timeTawkto.substr(8, 2),timeTawkto.substr(11, 2),timeTawkto.substr(14, 2),timeTawkto.substr(17,3));

    let offset = dia-6*60*60*1000;

  return new Date(offset);
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth()+1 ),
      day = '' + d.getDate(),
      year = ''+d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 3) 
      day = '0' + day;

  return [year, month, day].join('-');
}