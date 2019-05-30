const express = require('express');
const router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var adminController = require('../controller/admin/adminController');
var adminDasboardController = require('../controller/admin/adminDashboardController');
var ensureAuthenticated = require('../middleware/authenticate').verifyTokenInRoleAdmin;
var decodeToken = require('../middleware/authenticate').decodeToken;

router.use(cookieParser());

router.all('*',ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login',adminController.login);

router.get('/(|dashboard)$',decodeToken, adminDasboardController.dashboard);

module.exports = router;