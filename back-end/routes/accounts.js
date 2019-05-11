var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var hash_bcrypt = require('../utils/hash-bcrypt');
var accountService = require('../services/account');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/',urlencodedParser, function(req, res, next) {
//   res.sendStatus(200);
//   res.setHeader('Content-Type: application/json');
//   res.send()
    res.send(req.body.username);
});

module.exports = router;
