var Organization = require('../models/organization');

exports.getOrganizationById = async (id)=>{
    try {
        var organization =  await Organization.findByPk(id);
        return organization;
    } catch (error) {
        return {};
    }
};

exports.getOrganizationIdByUserId = async(user_id)=>{
    try {
        var organizations = await Organization.findAll({
            where:{
                user_id:user_id
            },
            
        });
        return organizations;
    } catch (error) {
        console.log(error);
        return {};
    }
};

exports.getAllOrganizations = async (query={})=>{
    try {
        var organizations = await Organization.findAll(query);
        return organizations;
    } catch (error) {
        throw new Error(error+"");
    }
};