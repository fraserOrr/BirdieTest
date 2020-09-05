import app from './application';

const port = process.env.PORT || 8000;
app.use(function (_req, res, next) {

   
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    

    

    // Pass to next layer of middleware
    next();
});
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
  var stringoutput = "";
	connect.connect(function(err:string) { 
  	if (err) throw err; 
  		console.log("Connected!"); 
  
    connect.query("SELECT payload FROM birdietest.events WHERE event_type = 'mood_observation' order by  care_recipient_id,timestamp;",function (err:string, result:any){
      if (err) throw err;
        console.log("Query Sucess");
        stringoutput+=("<table style='width:100%' border='1'>");
        stringoutput+=("<tr><th>Mood</th><th>Additonal Notes</th><th>Date and Time</th><th>Care Recipient</th></tr>")
        result.forEach(function(value:any){
          var output = value.payload.split(',');
          
          stringoutput+=("<tr>");
          //console.log(value.payload);
          //console.log(output);
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
              
              stringoutput+=("<th>"+str+"</th>")
              
            
            }else if( row.includes("care_recipient_id") || row.includes("timestamp")  ){
              if(noteinrow==true){
               var tmp = row.split(':');
               var row = tmp[1];
               var str = String(row).replace(/"/g,'');
               
               stringoutput+=("<th>"+str+"</th>");
               
              }else{
               var tmp = row.split(':');
               var row = tmp[1];
               var str = String(row).replace(/"/g,'');
               stringoutput+=("<th>"+"</th>");
               stringoutput+=("<th>"+str+"</th>");
               noteinrow=true;
              }
              
            
              
            }else{
             
            }
            
            
            
          });
            
            
          
          stringoutput+=("</tr>");
        });
        stringoutput+=("</table>");
        console.log("result sent");
        return res.send(stringoutput);
        
         
          
          
        
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
  var stringoutput = "";
  connect.connect(function(err:string) { 
  	if (err) throw err; 
  		console.log("Connected!"); 
  
    connect.query("Select payload From birdietest.events WHERE event_type = 'concern_raised' order by care_recipient_id , timestamp;",function (err:string, result:any){
     if (err) throw err; 
      console.log("Query Success"); 
      
      stringoutput+=("<table style='width:100%' border='1'>");
      stringoutput+=("<tr><th>note</th><th>Severity</th><th>Date and Time</th><th>Care Recipient</th></tr>");
       // res.write("<tr><th>Mood</th><th>Additonal Notes</th><th>Date and Time</th><th>Care Recipient</th></tr>")
      result.forEach(function(value:any){
       var output = value.payload.split(',');
       stringoutput+=("<tr>");
          //console.log(value.payload);
       //console.log(output);
       output.forEach(function(row:any){
         if(row.includes("note")|| row.includes("severity")|| row.includes("timestamp") ||row.includes("care_recipient_id")){
          var tmp = row.split(':');
          var row = tmp[1];
          var str = String(row).replace(/"/g,'');
          stringoutput+=("<th>"+str+"</th>");
         }else{}
          
          
        });
            
            
          
        stringoutput+=("</tr>");
        });
        stringoutput+=("</table>");
        console.log("result sent");
        return res.send(stringoutput)
        
         
          
          
          
    });
  
  //return res.redirect('http://localhost:3000/hom.html');
  });
});
  
app.get('/',(_req,res)=> {
    res.redirect('http://localhost:3000/home.html')
});
 
 
app.get('/test',function(req,res){
  console.log(req.body)
	//console.log(req);
  return res.send("data");

  
  
});
 
 
 