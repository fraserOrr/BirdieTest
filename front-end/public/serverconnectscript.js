
var mysql = require('mysql');
var config = require('./sqlconfig.json');

var connect = mysql.createConnection(config);


// connect to the database.
connect.connect(function(err) { 
  if (err) throw err; 
  console.log("Connected!"); 
}); 


connect.end();