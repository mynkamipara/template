
var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'remotemysql.com',
  user:'XwiDnqTOXd',
  password:'9frTIxJuyO',
  database:'XwiDnqTOXd'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 