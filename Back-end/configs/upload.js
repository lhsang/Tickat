const express = require('express');
const multer  = require('multer');
const maxSizeAvatar = 1*1024*1024;
const accepted_extensions = ['jpg', 'png', 'gif'];

var storageAvatar = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'uploads/avatar/');
    },
    filename: (req, file, cb)=>{
        let date = new Date();
        let fileName = date.getTime().toString()+'.'+file.originalname.split('.')[1] || file.originalname;
        cb(null, fileName);
    }
});
var uploadAvatar = multer({
        storage: storageAvatar,
        limits:{
            fieldSize: maxSizeAvatar
        },
    });

module.exports = {uploadAvatar};