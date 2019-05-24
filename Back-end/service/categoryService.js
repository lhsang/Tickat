var Category = require('../models/category');

exports.getAllCategories = async (query, offset = 0, limit = 10)=>{
    try {
        var categories =  await Category.findAll();
        return categories;
    } catch (e) {
        throw Error('Can not find all categories');
    }
};