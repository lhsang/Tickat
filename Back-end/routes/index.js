const express = require('express');
const router = express.Router();
var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var homeController = require('../controller/customer/homeController');
var detailEvent = require("../controller/customer/detailEvent");


router.get('/(|home)$', homeController.homePage);

//router.get('/detailEvent',(req,res)=>res.render('customer/detailEvent'));

router.get('/detailevent',detailEvent.detailPage);

module.exports = router;
