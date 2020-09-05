var app = require('express');


app.post('/create-readout',function(req,res){
	return res.redirect('')
	});


function sqlconnect(){



	var mysql = require('mysql');
	var config = {
		host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
		Database: 'birdietest',
		user: 'test-read',
		password: 'xnxPp6QfZbCYkY8',
		port: '3306'
	};


	var connect = mysql.createConnection(config);


	// connect to the database.
	connect.connect(function(err) { 
  	if (err) throw err; 
  		console.log("Connected!"); 
  	connect.query("SELECT payload FROM birdietest.events WHERE event_type = 'mood_observation';",function (err, result) {
  		if (err) throw err;
  			Object.keys(result).forEach(function(key){
  				var row = result[key];
  				console.log(row)
  			});

  			//console.log("result: " + result);
  			connect.end();
  	});
	}); 
}


 
