const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var homeController = require('../controller/customer/homeController');
var bookingController = require('../controller/customer/bookingController');

router.get('/(|home)$', homeController.homePage);

router.get('/events/:event_id/booking', bookingController.bookingPage);

router.get('/about/:id', homeController.about);

router.post('/about/:id/send-email',urlencodedParser, homeController.send_email);

module.exports = router;

