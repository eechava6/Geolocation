//Set up mongoose connection and db config
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/trackingGPS';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB")
    });
module.exports = mongoose;
