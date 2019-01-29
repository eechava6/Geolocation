const userModel = require('../models/users');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

module.exports = {
 create: function(req, res, next) {
   req.checkBody('email', 'Email is not valid').isEmail();
   var errors = req.validationErrors();
   if(errors){
      next(errors)
   }else
      userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err){ 
         next(err);
         }else
         res.json({status: "User added! ", message: "username : "+req.body.username + " mail : "+ req.body.email, data: null});
      });
 },

authenticate: function(req, res, next) {
    userModel.findOne({username:req.body.username}, function(err, userInfo){
     if (userInfo == null || err) {
         next("Username not found");
     } else {
        console.log(userInfo)
if(bcrypt.compareSync(req.body.password, userInfo.password)) {
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
res.json({status:"Success", message: "User found!", data:{user: userInfo, token:token}});
}else{
res.json({status:"Error", message: "Invalid username/password!", data:null});
}
     }
    });
 },
}