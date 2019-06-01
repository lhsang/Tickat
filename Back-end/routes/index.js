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
var Ticket = require('../models/ticket');
var Event = require('../models/event');

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

router.get('/events/:id',decodeToken, homeController.eventDetail);

router.get('/test', async (req, res)=>{
    Ticket.findAll({
        include:{
            model: Event,
            where:{
                organization_id :2
            }
        }
    }).then((results)=>{
        res.send(results);
    });
});

router.post('/upload-avatar', uploadAvatar.single('avatar'), (req, res)=>{
    res.send("upload thanh cong !");
});

module.exports = router;

