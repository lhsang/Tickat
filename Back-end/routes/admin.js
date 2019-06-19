const express = require('express');
const router = express.Router();

var adminController = require('../controller/admin/adminController');
var adminDasboardController = require('../controller/admin/adminDashboardController');
var adminEventController = require('../controller/admin/adminEventController');

var ensureAuthenticated = require('../middleware/authenticate').verifyTokenInRoleAdmin;
var decodeToken = require('../middleware/authenticate').decodeToken;

var organizationService = require('../service/organizationService');
var ticketService = require('../service/ticketService');

var upload= require('../configs/upload');
var userController = require('../controller/customer/userController');

router.all('*',ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login', adminController.login);

router.get('/sign-up', adminController.signUp);

router.get('/(|dashboard)$', decodeToken, adminDasboardController.dashboard);

router.get('/statistics', decodeToken, adminDasboardController.dashboardchart);

router.get('/events', decodeToken, adminEventController.dashboardevent);

router.post('/events', decodeToken, upload.uploadImgEvent.single('img'), adminEventController.createEvent);

router.get('/new-event', decodeToken, adminEventController.createEventPage);

router.get('/events/:id([0-9]+)', decodeToken, adminEventController.orderDetails);

router.get('/events/filter', decodeToken, adminEventController.filter);

router.get('/setting', decodeToken, adminController.profile);

router.put('/setting', upload.uploadAvatar.single('avatar'), decodeToken, userController.changeProfile);

router.get('/costchart',decodeToken,adminDasboardController.costChart);

router.get('/salechart',decodeToken,adminDasboardController.saleChart);

router.post('/categories', adminController.createCategory);

router.post('/organizations', decodeToken, adminController.createOrganization);

router.post('/type-of-tickets', adminController.createTypeTicket);

module.exports = router;