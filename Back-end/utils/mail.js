var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

module.exports = smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "tickat.vn@gmail.com",
        pass: "thisispassword"
    }
});