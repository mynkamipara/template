
var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'192.168.137.152',
  user:'innvonix',
  password:'innvonix@123',
  database:'user_test'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});  
module.exports = connection; 