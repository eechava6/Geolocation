//Import Location Model
const locationModel = require('../models/locations');

module.exports = {

//Save a new location, user just send a post request and 
//system based on Location model determines username, location, date and hour.
 save: function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/')
    } else {
      var date = new Date();
      var hour = (date.getHours()-5) + ":"+date.getMinutes().toString();
         
      locationModel.create({ username: req.session.data.username, 
         trackId:req.body.trackId,
         latitude: req.body.latitude, 
         longitude: req.body.longitude, 
         hour: hour, 
         date: date.toDateString()},      
         function (err, result) {
         if (err){ 
            next(err);
            }else
            res.json({status: "success"});
         });
    }
     
 },

 //Search all locations related to a user, user just send post request
 //and system determines username and calls DB finding his routes history
 search: function(req, res, next) {
    locationModel.find({username:req.session.data.username},'trackId latitude longitude hour date -_id',
     function(err, userInfo){
     if (userInfo == null || err) {
         next("Username not found!");
     } else {
        res.json({status:"success", data:userInfo});
     }
    });
 },

//Given a track name return all latitudes and longitudes saved with that track ID
 filter: function(req, res, next) {
   locationModel.find({trackId:req.body.trackId},'latitude longitude -_id',
    function(err, userInfo){
    if (userInfo == null || err) {
        next("Track name not found!");
    } else {
       res.json({status:"success", data:userInfo});
    }
   });
},
 //Clear all locations related to a user, user just send post request
 //and system determines username and calls DB removing his history
 clear: function(req,res,next){
   locationModel.deleteMany({username:req.session.data.username},function(err){
      res.json({status:"success"})
   })
 }
}