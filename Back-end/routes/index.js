const express = require('express');
const router = express.Router();
var pool = require('../configs/db');

var homeController = require('../controller/customer/homeController');
var decodeToken = require('../middleware/authenticate').decodeToken;
var eventService = require('../service/eventService');
var userController = require('../controller/customer/userController');
var ticketboughtController = require('../controller/customer/ticketBoughtController');

var handle = require('../utils/handleData');

var Organization = require('../models/organization');
var Ticket = require('../models/ticket');
var Event = require('../models/event');

var uploadAvatar = require('../configs/upload').uploadAvatar;

router.get('/(|home)$', decodeToken, homeController.homePage);

router.get('/about/:id', decodeToken, homeController.about);

router.post('/about/:id/send-email', homeController.send_email);

router.get('/users/:username', decodeToken, homeController.profile);

router.put('/users', uploadAvatar.single('avatar'), decodeToken, userController.changeProfile);

router.get('/uploads/:name/:file', homeController.getResource);

router.post('/check-username', userController.checkUsername);

router.get('/ticket-bought', decodeToken, ticketboughtController.ticketBought);

/* ---------------------------start user router------------------------ */

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.post('/users', userController.signUp);

router.get('/switch-acc', decodeToken, userController.switchAcc);

router.post('/upload-avatar', uploadAvatar.single('avatar'), userController.uploadAvatar);

router.get('/forgot-password', userController.forgotPassword);

router.get('/request-change-password', userController.requestChangePassword);

router.get('/change-password', userController.changePasswordPage);

router.put('/change-password', userController.changePassword);

/* ---------------------------end user router------------------------ */
module.exports = router;

