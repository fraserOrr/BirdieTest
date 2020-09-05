import app from './application';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

app.post('/create-readout',function(_req,res){
  
  
  
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
	connect.connect(function(err:string) { 
  	if (err) throw err; 
  		console.log("Connected!"); 
  
    connect.query("SELECT payload FROM birdietest.events WHERE event_type = 'mood_observation';",function (err:string, result:any){
      if (err) throw err;
        console.log("Query Sucess");
        res.write("<table style='width:100%'>");
        result.forEach(function(value:any){
          var output = value.payload.split(',');
          
          res.write("<tr>");
          //console.log(value.payload);
          console.log(output);
          //res.write("<th>"+output+"</th>");
          output.forEach(function(row:any){
            if(row.includes("mood") || row.includes("care_recipient_id") || row.includes("timestamp")  ){
              res.write("<th>"+row+"</th>")
            }else{
              
            }
            
            
          });
            
            
          
          res.write("</tr>");
        });
        res.write("</table>");
        res.end
        
         
          
          
        
    }); 
	});
  
  //return res.redirect('http://localhost:3000/hom.html');
});
 
 app.get('/',(_req,res)=> {
    res.redirect('http://localhost:3000/hom.html')
  })
 
 
 app.post('/test',function(_req,res){
	return res.redirect('http://localhost:3000/hom.html');

  
  
	});
 
 
 