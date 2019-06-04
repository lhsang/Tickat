const express = require('express');
const router = express.Router();

var adminController = require('../controller/admin/adminController');
var adminDasboardController = require('../controller/admin/adminDashboardController');
var ensureAuthenticated = require('../middleware/authenticate').verifyTokenInRoleAdmin;
var decodeToken = require('../middleware/authenticate').decodeToken;

router.all('*',ensureAuthenticated, (req, res, next)=>{
    next();
});

router.get('/login',adminController.login);

router.get('/sign-up',adminController.signUp);

router.get('/(|dashboard)$',decodeToken, adminDasboardController.dashboard);

module.exports = router;