const locationModel = require('../models/locations');

module.exports = {
 save: function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/')
    } else {
      var date = new Date();
      var hour = date.getHours();
         
      locationModel.create({ username: req.session.data.username, 
         latitude: req.body.latitude, 
         longitude: req.body.longitude, 
         hour: hour, 
         date: date.toDateString}, 
         function (err, result) {
         if (err){ 
            next(err);
            }else
            res.json({status: "success"});
         });
    }
     
 },

 search: function(req, res, next) {
    locationModel.findOne({username:req.body.username}, function(err, userInfo){
     if (userInfo == null || err) {
         next("Username not found!");
     } else {
        console.log(userInfo)
        res.json({status:"Success", message: "User found!", data:{user: userInfo}});
     }
    });
 },
}