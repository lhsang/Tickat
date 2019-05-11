const LocalStratery = require('passport-local').Strategy;

module.exports = function(Passport){
    Passport.use(new LocalStratery(
        (username, password, done)=>{
            if(username=='lhsang' && password=='123'){
                done(null, {'username':'lhsang','password':'123'});
            }else{
                done(null,false);
            }
        }
    ));
    
    Passport.serializeUser((user, done)=>{
        done(null, user.username);
    });
    
    Passport.deserializeUser((user, done)=>{
        if(user.username=='lhsang'){
            done(null, {'username':'lhsang','password':'123'});
        }else{
            done(null,false);
        }
    });
};