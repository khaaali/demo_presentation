
const express = require('express');
const router = express.Router();
const mysql     =    require('mysql');


var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'roo',
    password : 'sairam',
    database : 'SMIP',
    debug    :  false
});



/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


/*Query to Mysql on mac01*/
router.get("/api/mac01",function(req,res){
        pool.getConnection(function(err,connection){
        if (err) {
          console.log(err);
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from Temperature_table WHERE mac='3s-ds-23-sf-23-ce-32'",function(err,rows){
            console.log(rows);
            
            if(!err) {
                res.send(JSON.stringify(rows));
            }       
            connection.release();    
        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
        //res.sendFile(__dirname+'/public/index.html');
});


router.get("api/all",function(req,res){
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from Temperature_table",function(err,rows){
            console.log(rows);
            
            if(!err) {
                res.send(JSON.stringify(rows));
            }       
            connection.release();    
        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
        //res.sendFile(__dirname+'/public/index.html');
});

module.exports = router;






































//sudo netstat -lpn |grep :3000
//sudo kill -9 8047(PID
//const port=3000;
const express   =    require("express");
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const http = require('http');

const api = require('./server/routes/api');


const app       =    express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */



app.listen(port);

console.log('Listening on localhost port '+port);

//USE SMIP;
//select * from Temperature_table
//WHERE mac='3s-ds-23-sf-23-ce-32';


