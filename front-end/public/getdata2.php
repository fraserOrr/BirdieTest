<!DOCTYPE html>
<html lang="en">
  <head onload="test()">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <!--<script type="text/javascript">
      function test(){
      alert("This Is running");
      var mysql = require('mysql');


      var connect = mysql.createConnection({
      // properties 
        host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
        port: '3306',
        user: 'test-read',
        password: 'xnxPp6QfZbCYkY8',
        Database: 'birdietest' 
  
      });
      var connected = false;
      var container = document.getElementById("root");
      container.innerHTML = "Script Failure";

      // connect to the database.
      connect.connect(function(err) { 
      if (err) throw err; 
        connected = true;  
        
      }); 
      
      if (connected = true){
      
        container.innerHTML = "Connected";
      }else{
        container.innerHTML = "Not Connected";
      }
        

      connect.end();

    }
    </script>-->
  

  </head>
  <body >
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    
    <?php
        $host='birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
        $port= '3306',
        $user= 'test-read',
        $password= 'xnxPp6QfZbCYkY8',
        $Database= 'birdietest'  

      

      $conn -> new mysqli($host,$user,$password,$Database,$port);
         
      if ($mysqli -> connect_errno) {
        echo 'console.log("connection error")';
        exit();
      } 
      

      
      $conn->close(); 
    ?>
    
    
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>