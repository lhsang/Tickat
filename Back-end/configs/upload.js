const express = require('express');
const multer  = require('multer');
const maxSizeAvatar = 3*1024*1024;
const accepted_extensions = ['jpg', 'png', 'gif'];
var avatarDir = "uploads/avatar/";
var eventDir = "uploads/event/";

var storageAvatar = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, avatarDir);
    },
    filename: (req, file, cb)=>{
        let date = new Date();
        let fileName = "ava" + date.getTime().toString()+'.'+file.originalname.split('.')[1] || file.originalname;
        req.avatar = '/' + avatarDir+fileName;

        cb(null, fileName);
    }
});
var uploadAvatar = multer({
        storage: storageAvatar,
        limits:{
            fieldSize: maxSizeAvatar
        },
});

var storageImgEvent = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, eventDir);
    },
    filename: (req, file, cb)=>{
        let date = new Date();
        let fileName = "event" + date.getTime().toString()+'.'+file.originalname.split('.')[1] || file.originalname;
        req.img = '/' + eventDir+fileName;

        cb(null, fileName);
    }
});
var uploadImgEvent = multer({
        storage: storageImgEvent,
        limits:{
            fieldSize: maxSizeAvatar
        },
});
module.exports = {uploadAvatar, uploadImgEvent};