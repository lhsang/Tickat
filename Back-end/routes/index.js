const express = require('express');
const router = express.Router();
var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');
var homeController = require('../controller/customer/homeController');


router.get('/(|home)$', homeController.homePage);

module.exports = router;
