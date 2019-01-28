const locationModel = require('../models/locations');

module.exports = {
 save: function(req, res, next) {
      locationModel.create({ username: req.body.username, latitude: req.body.latitude, longitude: req.body.longitude, hour: req.body.hour, date: req.body.date}, function (err, result) {
      if (err){ 
         next(err);
         }else
         res.json({status: "Location added! ", message: "", data: null});
      });
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