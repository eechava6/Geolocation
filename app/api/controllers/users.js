const userModel = require('../models/users');
const bcrypt = require('bcryptjs'); 
const fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// configure passport.js to use the local strategy
passport.use(new LocalStrategy({},
  (username, password, done) => {
    

   //call database
    userModel.findOne({username:username}, function(err, userInfo){
       if(err){
         return done(null, false, { message: 'Invalid credentials.\n' });
       }
       if (!userInfo) {
         return done(null, false, { message: 'Invalid credentials.\n' });
       }
      if(!bcrypt.compareSync(password, userInfo.password)) {
         return done(null, false, { message: 'Invalid credentials.\n' });
       }else{
         return done(null, userInfo);
       }
    }).catch(error => done(error));
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  
   done(null, user.id);
 });

 passport.deserializeUser((id, done) => {
   userModel.findById(id, function(err, user) {
      done(err, user);
    });
 });

module.exports = {
 create: function(req, res, next) {
      userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err){ 
         return res.json({status:"failed"})
         }else
         return res.json({status:"success"})
      });
 },

authenticate: function(req, res, next) {
   passport.authenticate('local', (err, user, info) => {
    if(info) { return res.send(info.message)}
    if (err) { return next(err); }
   req.login(user, (err) => {
      if(err){ return next(err)}
      req.session.data = user;
      return res.json({status:"success"})
   })
   })(req, res, next);
 },

   loadRegister: function(req, res, next) {
      if(req.isAuthenticated()) {
         res.redirect('./userPage')
       }else{
         fs.readFile('./app/views/register.html',function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
          })
       }
  },

   loadAuthenticate: function(req, res, next) {
      if(req.isAuthenticated()) {
         res.redirect('./userPage')
       } else {
         fs.readFile('./app/views/login.html',function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
            })
       }
      },

   loadUserPage: function(req, res, next) {
      if(req.isAuthenticated()) {
         fs.readFile('./app/views/userpage.html',function (err, data){
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
            })
       } else {
         res.redirect('/')
       }
      
      }
}
