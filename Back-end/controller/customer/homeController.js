var nodemailer = require("nodemailer");
var fs = require('fs');
var jwt = require('jsonwebtoken');
var path = require('path');

var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');
var {hash_bcrypt,check_password} = require('../../utils/bcrypt');
var smtpTransport = require('../../utils/mail');

var privateKey  = fs.readFileSync(path.join(__dirname,'../../configs/private.key'), 'utf8');

exports.homePage = async (req, res)=>{
    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        limit: 4
    });
    
    //get slide img - tạm thời, sau bỏ vô service
    var slides = events.map(obj=>{
        return {'img':obj.img,'name':obj.name};
    });
    var comming_events = await eventService.getCommingEvents();
    var categories = await categoryService.getAllCategories();

    var data = {
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main',
        comming_events: comming_events,
        recommend_events: events,
        slides: slides,
        categories:  categories
    };
    
    res.render("customer/home",data);
};

exports.about = async (req, res)=>{
    var categories = await categoryService.getAllCategories();
    var id =  req.params.id;
    var organization = await organizationService.findOrganizationById(id);

    res.render("customer/about",{
        title: 'Tickat - '+organization.name,
        layout: 'main',
        organization: organization,
        categories:  categories
    });
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


exports.login = async (req, res)=>{
    var username = req.body.username, password = req.body.password;
    var user = await userService.getUserByUsername(username);
    var payload = {
        username: user.username,
        full_name: user.full_name,
        avatar: user.avatar,
        role_id: user.role_id
    };

    if(user!=null && check_password(password, user.password)){
        let token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
        res.cookie('token', token);
        res.status(200);
        if(user.role_id == 1)
            res.redirect('/admin');
        res.redirect('/');
    }else{
        res.status(300);
        res.end();
    }

};

exports.logout = (req, res)=>{
    res.clearCookie("token");
    res.redirect('/');
};