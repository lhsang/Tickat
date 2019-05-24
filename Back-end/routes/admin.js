const express = require('express');
const router = express.Router();
const session = require('express-session');
const LocalStratery = require('passport-local').Strategy;
const Passport = require('passport');
const {ensureAuthenticated, forwardAuthenticated} = require('../configs/ensureAuthenticated');
const flash = require('connect-flash');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
require('../configs/passport_admin')(Passport);

router.use(session({
    secret: 'secret',
    name: 'tickat_cookie',
    resave: true,
    saveUninitialized: true
}));
router.use(Passport.initialize());
router.use(Passport.session());

router.all('*', ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login',(req,res)=>{
    var message = "";
    if(req.query.error !=null)
       message = "Invalid username or password";
    res.render('admin/login',{
        title : 'Admin login',
        layout: 'empty',
        message: message
    });
});

router.route('/login').post(Passport.authenticate('local',{
        failureRedirect: '/admin/login?error',
        successRedirect: '/admin/dashboard',
        badRequestMessage : 'Missing username or password.',
        failureFlash: true
    }
));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('admin/login');
});

router.get('/(|dashboard)$',(req,res)=>{
    res.render('admin/dashboard',{
        title: 'Dashboard',
        layout :'admin'
    });
});

module.exports = router;