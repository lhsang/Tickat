var Organization = require('../models/organization');

exports.findOrganizationById = async (id)=>{
    try {
        var organization =  await Organization.findByPk(id);
        return organization;
    } catch (error) {
        return {};
    }
}