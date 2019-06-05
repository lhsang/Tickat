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

//router.get('/login',adminController.login);

router.get('/sign-up',adminController.signUp);

//router.get('/(|dashboard)$',decodeToken, adminDasboardController.dashboard);

router.get('/dashboard/',adminDasboardController.dashboard);

router.get('/dashboard-chart/',adminDasboardController.dashboardchart);
//router.get('/test', adminDasboardController.dashboard);
//router.get('/testk',(req,res)=>console.log(req));
module.exports = router;