import express from 'express'

const app = express();

//setings

app.set('port', process.env.PORT ||3000 );

app.get("/", (req,res)=> res.send("Hello world"));

app.get('/dale', (req,res)=> res.send("Dale"))

 export default app;