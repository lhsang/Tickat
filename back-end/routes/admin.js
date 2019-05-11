const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/',(req,res)=>{
    res.send("Hello world!");
});

router.get('/login',(req,res)=>{
    res.render('admin/login',{
        title : 'Admin login',
        layout: 'empty'
    });
});

router.post('/login',urlencodedParser, (req,res)=>{
    res.send(req.body);
});
module.exports = router;