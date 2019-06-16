var nodemailer = require("nodemailer");
var dateFormat = require('dateformat');
var  fs = require('fs');

var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');

var smtpTransport = require('../../utils/mail');
var objectDefined = require('../../utils/object_define');
var handleData = require('../../utils/handleData');

var Event = require('../../models/event');
var Organization = require('../../models/organization');
var Ticket = require('../../models/ticket');

exports.homePage = async (req, res)=>{ 
    var comming_events = await eventService.getCommingEvents();
    var categories = await categoryService.getAllCategories();
    var suggest_events = await eventService.getSuggestEvents(true);

    comming_events.map((obj)=>{
        handleData.sortByKey(obj.tickets,"price","desc");
    });

    //get slide img - tạm thời, sau bỏ vô service
    var slides = comming_events.map(obj=>{
        return {'img':obj.img,'name':obj.name,'id':obj.id};
    });

    handleData.addDateArrToEvents(comming_events);
    handleData.addDateArrToEvents(suggest_events);
    var data = {
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main',
        comming_events: comming_events,
        suggest_events: suggest_events,
        slides: slides,
        categories:  categories,
        logged: false
    };
    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    

    res.render("customer/home",data);
};

exports.about = async (req, res)=>{
    var categories = await categoryService.getAllCategories();
    var id =  req.params.id;
    var organization = await organizationService.getOrganizationById(id);

    var data = {
        title: 'Tickat - '+organization.name,
        layout: 'main',
        organization: organization,
        categories:  categories,
        logged: false
    };
    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    
    res.render("customer/about",data);
};

exports.send_email = async (req, res)=>{
    var fullName = req.body.fullName,
        phone = req.body.phone,
        email = req.body.email,
        content = req.body.content,
        id = req.params.id;
    var organization = await organizationService.findOrganizationById(id);
    
    var mailOptions={
        to : organization.mail,
        subject : "Ý kiến từ khách hàng",
        text : `
        From: ${fullName}
        Phone: ${phone}
        Email: ${email}

        ${content}
        ------------------------------------------------------------------------------
        Mail was sent by Tickat.vn
        ${new Date()}
        `
    };
    smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                res.end("Đã xảy ra lỗi. Xin thử lại sau :(");
            }else{
                res.end("Phản hồi của bạn đã được gởi đến nhà tổ chức !");
            }
    });
};

exports.profile = async (req, res)=>{
    var categories = await categoryService.getAllCategories();
    var username =  req.params.username;
    var user_profile = await userService.getUserByUsername(username);

    var data = {
        title: 'Tickat - '+user_profile.full_name,
        layout: 'main',
        user_profile: user_profile,
        categories:  categories,
        logged: false,
        areYourself: false
    };
    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
        if(req.user.username === username)
            data.areYourself = true;
    }    
    res.render("customer/profile",data);
};

exports.getResource =  (req, res)=>{
    var dir = "uploads/avatar/"+req.params.avatar; 
    fs.readFile(dir, (error, imgData)=>{
        if(error){
            res.sendStatus(404);
        }else{
            res.writeHead(200, {'Content-Type':'image/jpeg'});
            res.end(imgData);
        }
    });
};