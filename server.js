const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const locations = require('./routes/locations')
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const fs = require('fs');
const expressValidator = require('express-validator');

const app = express();
app.use(logger('dev'));
app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator())

app.get('/', function(req, res){  
  fs.readFile('./app/views/index.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
});

//Public views
app.use(express.static(__dirname + '/public/css'));
//Public route
app.use('/users', users);
app.use('/locations',locations);

// Express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else
    if(err[0].msg){
    res.status(500).json({message: "There was an error : " + err[0].msg});
    }else{
      res.status(500).json({message: "There was an error : " + err});
    }
});

//Server listening at port 3000
app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});