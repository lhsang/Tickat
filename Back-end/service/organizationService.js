var Organization = require('../models/organization');

exports.findOrganizationById = async (id)=>{
    try {
        var organization =  await Organization.findByPk(id);
        return organization;
    } catch (error) {
        return {};
    }
};

exports.findOrganizationByUserId = async (user_id)=>{
    try {
        var organization = await Organization.findOne({
            where: {user_id: user_id}
        });

        return organization;
    } catch (error) {
        console.log(error);
    }
};