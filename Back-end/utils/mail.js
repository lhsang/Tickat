var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

module.exports = smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "tickat.vn@gmail.com",
        pass: "8c540ca8fec2d570a70982e29e83b5254f68e1fb321ba492944e6119555335f3"
    }
});