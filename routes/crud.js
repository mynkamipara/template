const express = require('express');
const router = express.Router();
var connection  = require('../config/mysql');
var rand = require("random-key");
const { check, validationResult } = require('express-validator');

router.get('/add',(req,res)=>{
  
  res.render('add',{user:{}})
}  );

router.post('/add',
[check('fname')
  .not().isEmpty().withMessage('Firstname is required')
  .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),

check('email')
  .not().isEmpty().withMessage('email is required')
  .isEmail().withMessage('Enter Valida Email'),

check('contact')
  .not().isEmpty().withMessage('contact is required')
  .isLength({min:10,max:10}).withMessage('contact number 10 Digit require')
  .isNumeric().withMessage('Plese enter Valid number'),

  
check('bod')
  .not().isEmpty().withMessage('Birthdate is required')
  .custom((value,{req})=>{
    var value=new Date(value);
    if(new Date(value) > new Date()){
     // console.log('true');
      throw new Error('Birthdate not valid');
    }
    else{
      return true;
    }
  }),

check('address').not().isEmpty().withMessage('Address is required')],


(req,res)=>{
  //console.log(req.body.date);

  const errors=validationResult(req);
  var user=req.body;
  user.keyid=rand.generate();
  //console.log(user);
  if(!errors.isEmpty()){
    //console.log(errors);
    console.log(new Date(1997,07,10) < new Date(2019, 07, 10));
    console.log(user);
    res.render('add',{error:errors.mapped(),user:user})
  }
  else{
    
    
    const sql="insert into user SET ?";
    connection.query(sql, user,function(err, rows) {
   
        if (!err){
          console.log('The solution is: ', rows);
          res.redirect('./view');
        }
        
        else
          console.log('Error while performing Query.');
    })

  }
 
  
})

router.get('/view',(req,res)=>{

  const sql="select * from user";
  connection.query(sql,function(err, rows) {
  
      if (!err){
        console.log(rows);
        res.render('view' ,{
					title: 'All Countries', 
					data: rows
})
      }
      else{
        console.log('Error while performing Query.');
      }
     
  })
 
})

router.get('/update/:keyid',(req,res)=>{
  var keyid = req.params.keyid;
  connection.query('select * from user where keyid=?',keyid,(err,result)=>{
    if(err)
      console.log(err);
      else{
        
        console.log(result);
        res.render('update' ,{
					title: 'All Countries', 
					data: result
})
    
      }
    })
})


router.post('/update/:keyid',(req,res)=>{

  var keyid = req.params.keyid;

  const user=req.body;

console.log(user);
connection.query("UPDATE user set ? WHERE keyid = ? ",[user,keyid], function(err, result)
{

  if (err){
    console.log(err)
  }
  else{
    res.redirect('../view');
  }
  
})

})



router.get('/delete/:keyid',(req,res)=>{
  var keyid = req.params.keyid;
connection.query('DELETE from user where keyid=?',keyid,(err,result)=>{
if(err)
  console.log(err);
  else{
    console.log(result);
    res.redirect('../view');
  }
}) 


})

module.exports=router;