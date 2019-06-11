const express = require('express');
const router = express.Router();

var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var eventController = require('../controller/customer/eventController');
var decodeToken = require('../middleware/authenticate').decodeToken;

router.get('/', decodeToken, eventController.allEvents);

router.get('/:event_id/booking',decodeToken, eventController.bookingPage);

router.get('/:id([0-9]+)',decodeToken, eventController.eventDetail);

router.get('/filter', eventController.filter);

module.exports = router;
