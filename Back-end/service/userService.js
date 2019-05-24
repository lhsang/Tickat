var User = require('../models/account');

exports.getAll = async (query, offset = 0, limit = 10)=>{
    try {
        var users =  await User.findAll();
        return users;
    } catch (e) {
        throw Error('Can not find all Users');
    }
};