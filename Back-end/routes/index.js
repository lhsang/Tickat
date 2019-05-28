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

router.get('/events/:event_id/booking', bookingController.bookingPage);

router.get('/about/:id', homeController.about);

router.post('/about/:id/send-email',urlencodedParser, homeController.send_email);

module.exports = router;

