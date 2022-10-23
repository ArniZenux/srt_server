var translate = require('@iamtraction/google-translate');
var bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
// add cors.js 

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(express.json());

const { 
  HOST: hostname,
  PORT: port 
} = process.env;

function catchErrors(fn){
  return (req, res, next) => fn(req, res, next); 
}

async function indexTranslate(req, res){
  /*const text = "Hello boy";
  // const { xtext } = req.params;
  const info  = req.body.info;
  const { xinfo } = req.params; 

  //const text = req.body.text; 
  console.log(info);
  console.log(xinfo); 
  console.log(text); 

  let tyding_setning = ''; 

  if(text === ''){
    console.log("Engin text í textarea");
  } else {
    let newtext = await translate(text, {from: 'en', to: 'is'});
    tyding_setning += newtext.text; 
  }

  res.json({ text : text , newtext: tyding_setning});
  */
  res.send(`Hello ${req.body.info}`)
  //res.json(req.body);
}

/**
 *   GET     
 */
app.get('/', (req, res) =>{
  res.send("Server Translate");
  console.log("Server Translate");
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