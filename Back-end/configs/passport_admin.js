const LocalStratery = require('passport-local').Strategy;
const Account = require('../models/account');
var {hash_bcrypt,check_password} = require('../utils/bcrypt');


module.exports = function(Passport){
    Passport.use(new LocalStratery(
        (username, password, done)=>{
            Account.findOne({
                where : {
                    username: username
                },
                attributes:[
                    'id', 'username', 'password', 'role_id'
                ]
            }).then(user=>{
                if(user!=null && check_password(password, user.password)){
                    done(null, user);
                }else done(null,false,{message: 'deo tim thay'});
            });
        }
    ));
    
    Passport.serializeUser((user, done)=>{
        done(null, user.username);
    });
    
    Passport.deserializeUser((username, done)=>{
        Account.findOne({
            where : {
                username: username
            }
        }).then(user=>{
            if(user){
                done(null, user);
            }else done(null,false);
        });
    });
    
};