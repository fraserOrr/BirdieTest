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

app.get('/GeneralObservation-readout',function(_req,res){
  // THis is for getting general observations from the DataBase 
  var mysql = require('mysql');
  //db info
  var config = {
    host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
    Database: 'birdietest',
    user: 'test-read',
    password: 'xnxPp6QfZbCYkY8',
    port: '3306'
  };
  //connection and output variables
  var connect = mysql.createConnection(config);
  var stringoutput = "";

  connect.connect(function(err:string){
    if (err) throw err;
      console.log("Connected");
      connect.query("SELECT payload FROM birdietest.events WHERE event_type = 'general_observation' order by  care_recipient_id,timestamp ;",function(err:string,result:any){
        //sql request
        if (err) throw err;
          console.log("Query Success");
          stringoutput+=("<table style='width:100%' border='1'>");
          stringoutput+=("<tr><th>Observation</th><th>Date and Time</th><th>Care Recipient</th></tr>")
          //formatting output
          result.forEach(function(value:any){
            
            var x = value.payload.indexOf("note")
            var y = value.payload.indexOf("media")
            var notes = value.payload.substring(x,y);
            //console.log(notes);
            //console.log(value.payload);
            var output = value.payload.split(',');
            
            /*this is here as originall i was using the split, however some of the notes have a comma in 
              which messed up the string splitting so this was an altenative method
            */
            stringoutput+=("<tr>");
            if(value.payload.includes("note") ){
              var str = String(notes).replace(/"/g,'');
              
              stringoutput+=("<th>"+str+"</th>")
              
            }

                
            output.forEach(function(row:any){
              if(row.includes("notes") ){

              
              }else if(row.includes("care_recipient_id")  ){
                var tmp = row.split(':');
                var row = tmp[1];
                var str = String(row).replace(/"/g,'');   // more formatting
              
                stringoutput+=("<th>"+str+"</th>")
              
                
              }else if(row.includes("timestamp")) {
                var str = String(row).replace(/"/g,'');
                stringoutput+=("<th>"+str+"</th>")
              }


            });

            stringoutput+=("</tr>");
          });
        stringoutput+=("</table>");
        console.log("result sent");
        return res.send(stringoutput);      //return string output formatted for a htmml table
      });
  });

});
app.get('/MoodObservation-readout',function(_req,res){
  
  
  //sql config
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
          // these console logs are useful for deciphering what the sql queries return 
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
                // this is all for formatting the table and a way to leave a blank column should there be no note in the payload
              stringoutput+=("<th>"+str+"</th>")
              
            
            }else if(  row.includes("timestamp")  ){
              if(noteinrow==true){
               // the note in row ->true is a way of tracking if we have a note to display or need to leave a empty table slot 
               var str = String(row).replace(/"/g,'');
               
               stringoutput+=("<th>"+str+"</th>");
               
              }else{
               
               var str = String(row).replace(/"/g,'');
               stringoutput+=("<th>"+"</th>");
               stringoutput+=("<th>"+str+"</th>");
               noteinrow=true;
              }
              
            
              
            }else if (row.includes("care_recipient_id") ){
              var tmp = row.split(':');
              var row = tmp[1];
              var str = String(row).replace(/"/g,'');
              
              stringoutput+=("<th>"+str+"</th>")
            }
            
            
            
          });
            
            
          
          stringoutput+=("</tr>");
        });
        stringoutput+=("</table>");
        console.log("result sent");
        return res.send(stringoutput);   //return string output formatted for a htmml table
        
         
          
          
        
    }); 
	});
  
  
});
 
 
app.get('/Concern-Raised',function(_req,res){
  //sql connection and config
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
    //sql query and response
    if (err) throw err; 
      console.log("Query Success"); 
      
      stringoutput+=("<table style='width:100%' border='1'>");
      stringoutput+=("<tr><th>note</th><th>Severity</th><th>Date and Time</th><th>Care Recipient</th></tr>");
      
      //starting table formatting
      result.forEach(function(value:any){
        
        var output = value.payload.split(',');
        stringoutput+=("<tr>");
          
        output.forEach(function(row:any){
          if(row.includes("note")|| row.includes("severity") ||row.includes("care_recipient_id")){
            var tmp = row.split(':');
            var row = tmp[1];     // this split the header of the infomation and the bit we want to display
            var str = String(row).replace(/"/g,'');
            stringoutput+=("<th>"+str+"</th>");
          }else if( row.includes("timestamp")){
            var str = String(row).replace(/"/g,''); //time stamp has different formatting as we want the full time so isnt being split
            stringoutput+=("<th>"+str+"</th>");
          } 
        });
            
            
          
        stringoutput+=("</tr>");
        });
        stringoutput+=("</table>"); //final table format and some console logging to check code is executing
        console.log("result sent");
        return res.send(stringoutput)  //return string output formatted for a htmml table
        
         
          
          
          
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
  // this is a test function when i was first using the ajax request to undertsand how data would be parsed
  
  
});
 
 
 