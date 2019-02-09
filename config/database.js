//Set up mongoose connection and db config
/*const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/trackingGPS';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB")
    });
module.exports = mongoose;
*/

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env =  process.env.NODE_ENV || 'development';   

var config = {
  dev: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'TrackingGpsPR1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/TrackingGps'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'TrackingGpsPR1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/TrackingGps'
  },

  prod: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'TrackingGpsPR1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/TrackingGps'
  }
};

module.exports = config[env];