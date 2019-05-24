var userService = require('../../service/userService');

exports.homePage = async (req, res)=>{
    var users = await userService.getAll();
    
    console.log(users);

    res.render("customer/home",{
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main'
    });
};