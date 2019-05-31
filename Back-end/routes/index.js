const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var homeController = require('../controller/customer/homeController');
var bookingController = require('../controller/customer/bookingController');
var decodeToken = require('../middleware/authenticate').decodeToken;
var eventService = require('../service/eventService');
var handle = require('../utils/handleData');

var Organization = require('../models/organization');

var uploadAvatar = require('../configs/upload').uploadAvatar;

router.get('/(|home)$',decodeToken, homeController.homePage);

router.post('/login', homeController.login);

router.get('/logout', homeController.logout);

router.post('/sign-up', homeController.signUp);

router.get('/switch-acc',decodeToken, homeController.switchAcc);

router.get('/events/:event_id/booking',decodeToken, bookingController.bookingPage);

router.get('/about/:id',decodeToken, homeController.about);

router.post('/about/:id/send-email', homeController.send_email);

router.get('/users/:username',decodeToken, homeController.profile);

router.get('/events/:id', homeController.eventDetail);

router.get('/test', async (req, res)=>{
    var comming_events = await eventService.getSuggestEvents(true);

    res.send(comming_events);
});

router.post('/upload-avatar', uploadAvatar.single('avatar'), (req, res)=>{
    res.send("upload thanh cong !");
});

//router.get('/detailEvent/:id',(req,res)=>res.render('customer/detailEvent'));

//router.get('/detailEvent/:id',detailEvent.detailPage);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/test', urlencodedParser,(req, res)=>{
    var username = req.body.username;
    res.send("server nhan:"+username);
})

module.exports = router;

