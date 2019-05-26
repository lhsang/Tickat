var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var nodemailer = require("nodemailer");
var smtpTransport = require('../../utils/mail');

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

    res.render("customer/home",{
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main',
        comming_events: comming_events,
        recommend_events: events,
        slides: slides,
        categories:  categories
    });
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