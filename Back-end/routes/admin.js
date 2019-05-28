const express = require('express');
const router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var adminController = require('../controller/admin/adminController');
var adminDasboardController = require('../controller/admin/adminDashboardController');
var ensureAuthenticated = require('../middleware/authenticate').verifyTokenInRoleAdmin;


router.use(cookieParser());

router.all('*',ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login',adminController.login);


// router.get('/logout', adminController.logout);

router.get('/(|dashboard)$', adminDasboardController.dashboard);


module.exports = router;