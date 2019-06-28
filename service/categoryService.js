var Category = require('../models/category');
const {setDefaultQueryStr} =  require('../utils/default_query_string');

exports.getAllCategories = async (query)=>{
    try {
        setDefaultQueryStr(query);
        var categories =  await Category.findAll(query);
        return categories;
    } catch (e) {
        throw Error('Can not find all categories');
    }
};