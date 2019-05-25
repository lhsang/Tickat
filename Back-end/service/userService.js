var User = require('../models/account');
const {setDefaultQueryStr} =  require('../utils/default_query_string');

exports.getAll = async (query)=>{
   
    try {
        setDefaultQueryStr(query);
        var users =  await User.findAll();
        return users;
    } catch (e) {
        throw Error('Can not find all Users');
    }
};