var userService = require('../../service/userService');

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