var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
var rand = require("random-key");

var app = express();

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

 // Connect flash
 app.use(flash());



 app.get('/',(req,res)=>{
    req.flash('info', 'Flash is back!');
    res.send('hello');
 });

 app.get('/flash', function(req, res){
   
    res.send(req.flash('info'));
  });
 
  app.get('/randomkey',(req,res)=>{
   console.log(rand.generate());
 });

 app.get('/date',(req,res)=>{

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let cA = new Date(year - 18, month, day);
  let cB = new Date(year - 65, month, day).toDateString();
  console.log(cA);
  console.log(cB);
 })

 


   

 app.listen(4020,console.log('ser ver run...'));


