import express from 'express'

const app = express();

app.use(express.json());
//setings

app.set('port', process.env.PORT ||3000 );

app.get("/", (req,res)=> res.send("Hello world"));

app.get('/dale', (req,res)=> res.send("Dale"));

app.post('/peticionCallpicker', function(request, response) {

    console.log(request.body);      // your JSON
    response.send(request.body.name); 
    
});

 export default app;