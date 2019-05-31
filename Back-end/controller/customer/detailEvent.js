var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');

exports.detailPage = async (req, res)=>{
  

    var event_id= req.param.id;

    var event = await eventService.getEventsById({
        where: {id:event_id},
    });

 

    var organization_name = await eventService.getAllEvents({
        attributes: ['organization.name'],
        include:[
                    {
                        model: Organization,
                        where:{ id:event_id }
                    }
                ]
    })
    
    var categories = await categoryService.getAllCategories();

    var data = {
        title: 'Detail Event',
        layout: 'main',
        events: event,
        categories:  categories,
        organization_name: organization_name
    };

    res.render("customer/detailEvent",data);
};

