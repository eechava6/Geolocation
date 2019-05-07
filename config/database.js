//Set up mongoose connection and db config

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env =  process.env.NODE_ENV || 'dev';   

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