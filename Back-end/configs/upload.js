const express = require('express');
const multer  = require('multer');
const maxSizeAvatar = 3*1024*1024;
const accepted_extensions = ['jpg', 'png', 'gif'];
var avatarDir = "uploads/avatar/";

var storageAvatar = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, avatarDir);
    },
    filename: (req, file, cb)=>{
        let date = new Date();
        let fileName = "ava" + date.getTime().toString()+'.'+file.originalname.split('.')[1] || file.originalname;
        req.avatar = avatarDir+fileName;

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