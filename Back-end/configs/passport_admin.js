const LocalStratery = require('passport-local').Strategy;
var {hash_bcrypt,check_password} = require('../utils/bcrypt');

var userRecord = {
    'username':'lhsang',
    'password':'123',
    'role_id' : '2'
};

module.exports = function(Passport){
    Passport.use(new LocalStratery(
        (username, password, done)=>{
            if(username==userRecord.username && password==userRecord.password ){
                done(null, userRecord);
            }else{
                done(null,false);
            }
        }
    ));
    
    Passport.serializeUser((user, done)=>{
        done(null, user.username);
    });
    
    Passport.deserializeUser((username, done)=>{
        if(username==userRecord.username){
            done(null, userRecord);
        }else{
            done(null,false);
        }
    });
    
};