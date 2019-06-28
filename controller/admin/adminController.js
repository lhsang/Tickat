var userService = require('../../service/userService');
var Category = require('../../models/category');
var Organization = require("../../models/organization");
var TypeTicket = require("../../models/type_of_ticket");

exports.login = (req, res)=>{
    res.render('admin/login',{
        title : 'Tickat - Admin login',
        layout: 'empty'
    });
};

exports.signUp = (req, res)=>{
    res.render('admin/sign_up',{
        title : 'Tickat - Create a account',
        layout: 'empty'
    });
};

exports.profile = async (req, res)=>{
    var username = req.user.username;
    var user = await userService.getUserByUsername(username);
    res.render('admin/setting',{
        title : `Tickat - ${user.full_name}`,
        layout: 'admin',
        user_profile: user,
        user : req.user
    });
};

exports.createCategory = async (req, res)=>{
    var category  = {
        name: req.body.name,
        img: req.body.img
    };

    var newCategory = await Category.create(category).then((obj)=>{
        return obj;
    }).catch((err)=>{return err;});

    console.log(newCategory);
    var html="";
    try {
        html+= `<option value="${newCategory.id}">${newCategory.name}</option>`;
    } catch (error) {
        res.status(500);
        res.send({
            status: 500,
            message: "Something wrong :(",
            html: html
        });
    }

    res.status(200);
    res.send({
        status: 200,
        html: html,
        message: "Created category !"
    });
};

exports.createOrganization = async (req, res)=>{
    var organization = {
        name: req.body.name,
        tel: req.body.tel,
        mail: req.body.mail,
        website: req.body.website,
        img: req.body.img,
        description: req.body.description,
        user_id: req.user.id
    };

    var newOrganization = await Organization.create(organization).then((obj)=>{
        return obj;
    }).catch((err)=>{return err;});

    console.log(newOrganization);
    var html="";
    try {
        html+= `<option value="${newOrganization.id}">${newOrganization.name}</option>`;
    } catch (error) {
        res.status(500);
        res.send({
            status: 500,
            message: "Something wrong :(",
            html: html
        });
    }

    res.status(200);
    res.send({
        status: 200,
        html: html,
        message: "Created organization !"
    });
};

exports.createTypeTicket = async(req, res)=>{
    var type = {
        name:req.body.name
    };

    var newTypeTicket = await TypeTicket.create(type).then((obj)=>{
        return obj;
    }).catch((err)=>{return err;});

    console.log(newTypeTicket);
    var html="";
    try {
        html+= `<option value="${newTypeTicket.id}">${newTypeTicket.name}</option>`;
    } catch (error) {
        res.status(500);
        res.send({
            status: 500,
            message: "Something wrong :(",
            html: html
        });
    }

    res.status(200);
    res.send({
        status: 200,
        html: html,
        message: "Created type of ticket !"
    });
};