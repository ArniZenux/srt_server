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
  
  //console.log(info); 

  let tyding_setning = ''; 

  if(info === ''){
    console.log("Engin text í textarea");
  } else {
    let newtext = await translate(info, {from: 'en', to: 'is'});
    tyding_setning += newtext.text; 
  }
  //console.log(tyding_setning); 
  res.json(tyding_setning);
}

/*async function profaIndex(req, res) {
  let info = [req.body.nafn];
  console.log(info); 
  let data = 'Loksins!!';
  return res.json(data); 
}*/

/**
 *   GET     
 */
app.get('/', (req, res) => {
  res.send("Welcome to Server Translate");
  console.log("Welcome to Server Translate");
});

app.get('/translate', (req, res) => {
  res.send("Plz Write some word to Server Translate----");
  //console.log("Plz Write some word to Server Translate - console");
});

/*app.get('/profaTranslate', (req, res) => {
  let data = 'Loksins!!';
  console.log("Hello profa profa - express  -- console");
  console.log(data); 
  return res.json(data); 
});*/


/**
 *   POST
 */
app.post('/translate', catchErrors(indexTranslate));
//app.post('/profaTranslate2', catchErrors(profaIndex));

/**
 *   Handler error 
 */
function notFoundHandler(_req, res, _next) { // eslint-disable-line
    res.status(404).send('error - 404 - Client finnst ekki');
}
        
function errorHandler(err, _req, res, _next) { // eslint-disable-line
    console.error(err);
    res.status(500).send('error - 500 - Villa kom upp');
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});