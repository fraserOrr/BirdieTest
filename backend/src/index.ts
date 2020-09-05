import app from './application';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

app.get('/MoodObservation-readout',function(_req,res){
  
  
  
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
  
    connect.query("SELECT payload FROM birdietest.events WHERE event_type = 'mood_observation' order by  care_recipient_id,timestamp;",function (err:string, result:any){
      if (err) throw err;
        console.log("Query Sucess");
        res.write("<table style='width:100%' border='1'>");
        res.write("<tr><th>Mood</th><th>Additonal Notes</th><th>Date and Time</th><th>Care Recipient</th></tr>")
        result.forEach(function(value:any){
          var output = value.payload.split(',');
          
          res.write("<tr>");
          //console.log(value.payload);
          console.log(output);
          //res.write("<th>"+output+"</th>");
          var noteinrow = false;
          
          output.forEach(function(row:any){
            
            if(row.includes("note")){
              noteinrow=true;
            }
            if(row.includes("event")){
             
            }else if(row.includes("mood")|| row.includes("note") ){
              var tmp = row.split(':');
              var row = tmp[1];
              var str = String(row).replace(/"/g,'');
              
              res.write("<th>"+str+"</th>")
              
            
            }else if( row.includes("care_recipient_id") || row.includes("timestamp")  ){
              if(noteinrow==true){
               var tmp = row.split(':');
               var row = tmp[1];
               var str = String(row).replace(/"/g,'');
               
               res.write("<th>"+str+"</th>");
               
              }else{
               var tmp = row.split(':');
               var row = tmp[1];
               var str = String(row).replace(/"/g,'');
               res.write("<th>"+"</th>");
               res.write("<th>"+str+"</th>");
               noteinrow=true;
              }
              
            
              
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
 
 
 app.get('/Concern-Raised',function(_req,res){
  
  var mysql = require('mysql');
  var config = {
   host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
   Database: 'birdietest',
   user: 'test-read',
   password: 'xnxPp6QfZbCYkY8',
   port: '3306'
  };
  
  var connect = mysql.createConnection(config);
  
  connect.connect(function(err:string) { 
  	if (err) throw err; 
  		console.log("Connected!"); 
  
    connect.query("Select payload From birdietest.events WHERE event_type = 'concern_raised' order by care_recipient_id , timestamp;",function (err:string, result:any){
     if (err) throw err; 
      console.log("Query Success"); 
      
      res.write("<table style='width:100%' border='1'>");
      res.write("<tr><th>note</th><th>Severity</th><th>Date and Time</th><th>Care Recipient</th></tr>");
       // res.write("<tr><th>Mood</th><th>Additonal Notes</th><th>Date and Time</th><th>Care Recipient</th></tr>")
      result.forEach(function(value:any){
       var output = value.payload.split(',');
       res.write("<tr>");
          //console.log(value.payload);
       console.log(output);
       output.forEach(function(row:any){
         if(row.includes("note")|| row.includes("severity")|| row.includes("timestamp") ||row.includes("care_recipient_id")){
          var tmp = row.split(':');
          var row = tmp[1];
          var str = String(row).replace(/"/g,'');
          res.write("<th>"+str+"</th>");
         }else{}
          
          
        });
            
            
          
        res.write("</tr>");
        });
        res.write("</table>");
        res.end
        
         
          
          
          
    });
  
  //return res.redirect('http://localhost:3000/hom.html');
  });
 });
  
 app.get('/',(_req,res)=> {
    res.redirect('http://localhost:3000/hom.html')
  })
 
 
 app.post('/test',function(_req,res){
	return res.redirect('http://localhost:3000/hom.html');

  
  
	});
 
 
 