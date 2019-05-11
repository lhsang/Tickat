const express = require('express');
const router = express.Router();
var pool = require('../configs/db');
var hash_bcrypt = require('../utils/hash-bcrypt');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard',{
    layout : 'admin',
    content:'this is content'
  });
});

router.get('/api', function(req, res, next) {
  var hash= hash_bcrypt.hash_password("123");
  res.send(hash);
});

router.get('/api/:pass', function(req,res){
  var pass = req.params.pass;
  var hash = "$2b$10$eNpFHZHvhcsWPSIfW6N0sud9bQJwi3QsBI3PdMnvqB3N5RuNmPIky";
  res.send(hash_bcrypt.check_password(pass,hash));
});

module.exports = router;
