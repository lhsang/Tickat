const express = require('express');
const router = express.Router();

var adminController = require('../controller/admin/adminController');
var adminDasboardController = require('../controller/admin/adminDashboardController');
var ensureAuthenticated = require('../middleware/authenticate').verifyTokenInRoleAdmin;
var decodeToken = require('../middleware/authenticate').decodeToken;

var organizationService = require('../service/organizationService');
var ticketService = require('../service/ticketService');

router.all('*',ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login', adminController.login);

router.get('/sign-up', adminController.signUp);

router.get('/(|dashboard)$', decodeToken, adminDasboardController.dashboard);

router.get('/statistics', decodeToken, adminDasboardController.dashboardchart);

router.get('/events', decodeToken, adminDasboardController.dashboardevent);

router.get('/events/:id([0-9]+)', decodeToken, adminDasboardController.orderDetails);

router.get('/setting', decodeToken, adminController.profile);


router.get('/events/test/:id([0-9]+)', decodeToken, adminDasboardController.test);

router.get('/costchart',decodeToken,adminDasboardController.costChart);

module.exports = router;