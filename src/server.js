import express from 'express'

const app = express();

app.use(express.json());
//setings

app.set('port', process.env.PORT ||3000 );

app.get("/", (req,res)=> res.send("Hello world"));


app.post('/peticionCallpicker', function(request, response) {

    console.log(request.body);      // your JSON
    response.send('Duraracion: '  +request.body.duration+ ', Respondido por:'+ request.body.answered_by); 

});



 export default app;