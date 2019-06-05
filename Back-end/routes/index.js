const express = require('express');
const router = express.Router();
var pool = require('../configs/db');

var homeController = require('../controller/customer/homeController');
var decodeToken = require('../middleware/authenticate').decodeToken;
var eventService = require('../service/eventService');
var userController = require('../controller/customer/userController');

var handle = require('../utils/handleData');

var Organization = require('../models/organization');
var Ticket = require('../models/ticket');
var Event = require('../models/event');

var uploadAvatar = require('../configs/upload').uploadAvatar;

router.get('/(|home)$',decodeToken, homeController.homePage);

router.get('/about/:id',decodeToken, homeController.about);

router.post('/about/:id/send-email', homeController.send_email);

router.get('/users/:username',decodeToken, homeController.profile);

router.post('/check-username', userController.checkUsername);

/* ---------------------------start user router------------------------ */

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.post('/users', userController.signUp);

router.get('/switch-acc',decodeToken, userController.switchAcc);

router.post('/upload-avatar', uploadAvatar.single('avatar'), userController.uploadAvatar);

/* ---------------------------end user router------------------------ */

router.get('/test',homeController.test);

//router.get('/detailEvent/:id',(req,res)=>res.render('customer/detailEvent'));

//router.get('/detailEvent/:id',detailEvent.detailPage);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/test', urlencodedParser,(req, res)=>{
    var username = req.body.username;
    res.send("server nhan:"+username);
})

module.exports = router;

