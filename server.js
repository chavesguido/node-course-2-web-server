const express = require('express');
const hbs = require ('hbs');
const fs = require ('fs');

var app = express();//Crea la aplicacion

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));//App use es para usar express middleware

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { //Setea un handler para un http get request a la app. Uso / porque estoy refiriendome al root de la app
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to my page'
  });
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle:'About Page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    error:'Unable to fullfill your request'
  });
});

app.listen(3000,() =>{
  console.log("Server is running on port 3000");
}); //Hace que la app se ponga a funcionar en un puerto
