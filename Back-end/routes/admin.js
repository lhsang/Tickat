const express = require('express');
const router = express.Router();
const session = require('express-session');
const Passport = require('passport');
const LocalStratery = require('passport-local').Strategy;
const {ensureAuthenticated} = require('../services/ensureAuthenticated');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(Passport.initialize());
router.use(Passport.session());
router.use(session({
    secret: 'mySecret',
    name: 'tickat_cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
//require('../configs/passport_admin')(Passport);
router.route('/login').post(Passport.authenticate('local',{
    failureRedirect: '/admin/login',
    successRedirect: '/admin/loginOK'
}));

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

router.get('/private',ensureAuthenticated,(req,res)=>{
    res.send("hihi");
});

router.get('/login',(req,res)=>{
    console.log(req.isAuthenticated());
    
    res.render('admin/login',{
        title : 'Admin login',
        layout: 'empty'
    });
});


router.get('/loginOK',(req, res)=>{
    res.send("Login thanh cong");
});



module.exports = router;