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
var eventService = require('../service/eventService');
var handle = require('../utils/handleData');

var Event = require('../models/event');
var Organization = require('../models/organization');

router.use(cookieParser());

router.get('/(|home)$',decodeToken, homeController.homePage);

router.post('/login', urlencodedParser, homeController.login);

router.get('/logout', homeController.logout);

router.post('/sign-up',urlencodedParser, homeController.signUp);

router.get('/switch-acc',decodeToken, homeController.switchAcc);

router.get('/events/:event_id/booking',decodeToken, bookingController.bookingPage);

router.get('/about/:id',decodeToken, homeController.about);

router.post('/about/:id/send-email',urlencodedParser, homeController.send_email);

router.get('/users/:username',decodeToken, homeController.profile);

router.get('/test', async (req, res)=>{
    var comming_events = await eventService.getSuggestEvents(true);

    res.send(comming_events);
});

router.get('/test1', async (req, res)=>{
    var comming_events = await eventService.getSuggestEvents();

    res.send(comming_events);
});
module.exports = router;

