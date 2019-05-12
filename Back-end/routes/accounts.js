var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/',urlencodedParser, function(req, res, next) {
    res.send(req.body.username);
});

module.exports = router;
