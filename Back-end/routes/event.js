const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var bookingController = require('../controller/customer/bookingController');

router.get('/:event_id/booking', bookingController.bookingPage);

module.exports = router;
