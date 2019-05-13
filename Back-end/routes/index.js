const express = require('express');
const router = express.Router();
var pool = require('../configs/db');
var hash_bcrypt = require('../utils/bcrypt');
var Role = require('../models/role');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("This is homepage");
});

module.exports = router;
