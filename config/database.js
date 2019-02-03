//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://eechava6.dis.edu.eafit:27017/trackingGPS';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB")
    });
module.exports = mongoose;
