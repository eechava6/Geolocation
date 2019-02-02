const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const locations = require('./routes/locations')
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid/v4')
const passport = require('passport');

const app = express();
//var jwt = require('jsonwebtoken');
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },store: new FileStore(), 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){  
  res.redirect('/users/authenticateUser')
});

//Public views
app.use(express.static(__dirname + '/public/'));
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

	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else
    if(err[0] && err[0].msg){
    res.status(500).json({message: "There was an error : " + err[0].msg});
    }
});

//Server listening at port 3000
app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});