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


exports.getOrganizationIdByUserId = async(user_id)=>{
    try {
        // var monthStartDay = await getMonthStartDay(month,year);
        // var monthEndDay = await getMonthEndDay(month,year);
        var organization = Organization.findAll({
            attributes:['id'],
            where:{
                user_id:user_id
            },
            
        });

        if(organization.length==0)
            return 0;
        else
        return organization;
    } catch (error) {
        console.log(error);
        return {};
     
    }
}