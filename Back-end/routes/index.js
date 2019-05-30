const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var path = require('path');
var cookieParser = require('cookie-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var homeController = require('../controller/customer/homeController');
var bookingController = require('../controller/customer/bookingController');
var decodeToken = require('../middleware/authenticate').decodeToken;

router.use(cookieParser());

router.get('/(|home)$',decodeToken, homeController.homePage);

router.post('/login', urlencodedParser, homeController.login);

router.get('/logout', homeController.logout);

router.post('/sign-up',urlencodedParser, homeController.signUp);

router.get('/switch-acc',decodeToken, homeController.switchAcc);

router.get('/events/:event_id/booking',decodeToken, bookingController.bookingPage);

router.get('/about/:id',decodeToken, homeController.about);

router.post('/about/:id/send-email',urlencodedParser, homeController.send_email);

//router.get('/detailEvent',(req,res)=>res.render('customer/detailEvent'));

router.get('/detailevent',detailEvent.detailPage);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/test', urlencodedParser,(req, res)=>{
    var username = req.body.username;
    res.send("server nhan:"+username);
})

module.exports = router;

