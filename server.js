var translate = require('@iamtraction/google-translate');
var bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

const { 
  HOST: hostname,
  PORT: port 
} = process.env;

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next); 
}

async function indexTranslate(req, res) {
  let info  = [ req.body.nafn ];
  
  console.log(info); 

  let tyding_setning = ''; 

  if(info === ""){
    console.log("Engin text í textarea");
  } else {
    let newtext = await translate(info, {from: 'en', to: 'is'});
    tyding_setning += newtext.text; 
  }
  
  console.log(tyding_setning); 

  //res.json({ text : text , newtext: tyding_setning});
  //res.send(`Hello ${req.body.info}`)
  //res.json(req.body);
}

/**
 *   GET     
 */
app.get('/', (req, res) => {
  res.send("Welcome to Server Translate");
  console.log("Welcome to Server Translate");
});

app.get('/translate', (req, res) => {
  res.send("Plz Write some word to Server Translate----");
  console.log("Plz Write some word to Server Translate - console");
});

app.get('/profaTranslate', (req, res) => {
  /*let text = 'profa';
  let tyding_setning = 'new word for icelandic';
  res.json({ text : text , newtext: tyding_setning});*/
  res.send("Hello profa profa - express");
  console.log("Hello profa profa - express  -- console");
});


/**
 *   POST
 */
app.post('/translate', catchErrors(indexTranslate));

/**
 *   Handler error 
 */
function notFoundHandler(_req, res, _next) { // eslint-disable-line
    //const title = 'SRT - túlkuþjónusta';
    //const subtitle = 'Síða fannst ekki';
    //res.status(404).render('error', { title: title,subtitle : subtitle });
    res.status(404).send('error - 404 - Client finnst ekki');
}
        
function errorHandler(err, _req, res, _next) { // eslint-disable-line
    console.error(err);
    //const title = 'SRT - túlkuþjónusta';
    //const subtitle = 'Villa kom upp';
    //res.status(500).render('error', { title: title, subtitle : subtitle });
    res.status(500).send('error - 500 - Villa kom upp');
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});