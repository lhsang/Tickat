var User = require('../models/account');
const {setDefaultQueryStr} =  require('../utils/default_query_string');
var objectDefined = require('../utils/object_define');

exports.getAll = async (query)=>{
   
    try {
        setDefaultQueryStr(query);
        var users =  await User.findAll();
        return users;
    } catch (e) {
        throw Error('Can not find all Users');
    }
};

exports.getUserByUsername = async (username)=>{
    try {
        var user = await User.findOne({
            where: {username: username}
        });
        return user;
    } catch (error) {
        console.log(error);
        
        throw Error('Can not find this User');
    }
};

exports.switchRoleToAdmin = async (username)=>{
    console.log("ROle"+objectDefined.getRoleIdDefined().admin);
    
    try {
        var user = await User.findOne({where: {username: username}});
        user.role_id = objectDefined.getRoleIdDefined().admin;
        user.save();
    } catch (error) {
        
    }
};

exports.createAccount = async (data)=>{
    try {
        var user = new User();
        user.username = data.username, user.password = data.password, user.tel = data.tel, user.address = data.address;
        user.date_of_birth = data.date_of_birth, user.mail = data.mail, user.full_name = data.full_name;

        if(data.admin == true || data.admin == 'true')
            user.role_id =  objectDefined.getRoleIdDefined().admin;

        await user.save();
    } catch (error) {
        console.log(error);
        throw new Error('Error!');
    }
   
};