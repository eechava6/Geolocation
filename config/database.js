//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/trackingGPS';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB")
    db.modelNames()
    .forEach(name => {
        console.log(`model name ${name}`);                                        
        db.model(name).ensureIndexes((err)=> {
            if(err) throw new Error(err);              
        });

        db.model(name).on('index',function(err){                
            if (err) throw new Error(err); 
        });                                      
        });
        });
module.exports = mongoose;
