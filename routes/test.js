var express=require('express');
var router=express.Router();
const session = require('express-session');
const flash = require('connect-flash');

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


router.get('/', function(req, res){

   req.flash('info', 'Flash is back!');
    res.send('hello');
  });


  router.get('/flash', function(req, res){
    res.send(req.flash('info'));
  });
   

module.exports = router;