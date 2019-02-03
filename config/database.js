//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://www.eechava6.tk:27017/trackingGPS';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB")
    });
module.exports = mongoose;
