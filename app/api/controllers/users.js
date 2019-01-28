const userModel = require('../models/users');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

module.exports = {
 create: function(req, res, next) {
   
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Email is not valid').isEmail();
   req.checkBody('name', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();
   var errors = req.validationErrors();
   if(errors){
      next(errors)
   }else
      userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err){ 
         next(err);
         }else
         res.json({status: "Successfuly added! ", message: "name : "+req.body.name + " mail : "+ req.body.email, data: null});
      });
 },

authenticate: function(req, res, next) {
console.log("AQUII")   
console.log(req.body.password)
  userModel.findOne({email:req.body.email}, function(err, userInfo){
     if (userInfo == null || err) {
         next("Email not found");
     } else {
        console.log(userInfo)
if(bcrypt.compareSync(req.body.password, userInfo.password)) {
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
res.json({status:"Success", message: "User found!", data:{user: userInfo, token:token}});
}else{
res.json({status:"Error", message: "Invalid email/password!", data:null});
}
     }
    });
 },
}