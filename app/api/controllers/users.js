const userModel = require('../models/users');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const fs = require('fs');
module.exports = {
 create: function(req, res, next) {
      userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err){ 
         next(err);
         }else
         return res.redirect('/users/authenticateUser');
      });
 },

authenticate: function(req, res, next) {
    userModel.findOne({username:req.body.username}, function(err, userInfo){
     if (userInfo == null || err) {
         next("Username not found");
     } else {
if(bcrypt.compareSync(req.body.password, userInfo.password)) {
   const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
   //res.json({status:"Success", message: "User found!", data:{user: userInfo, token:token}});
   return res.redirect('/users/userPage');
}else{
   res.json({status:"Error", message: "Invalid username/password!", data:null});
   }
     }
    });
 },

   loadRegister: function(req, res, next) {
   fs.readFile('./app/views/register.html',function (err, data){
      res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
      res.write(data);
      res.end();
    })},

   loadAuthenticate: function(req, res, next) {
      fs.readFile('./app/views/login.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
       })
      },

   loadUserPage: function(req, res, next) {
      fs.readFile('./app/views/userpage.html',function (err, data){
         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();
         })
      }
}
