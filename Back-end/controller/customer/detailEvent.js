var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');

exports.detailPage = async (req, res)=>{
    var event = await eventService.getEventsById({
        where: {id:1},
    });

    
    var categories = await categoryService.getAllCategories();

    res.render("customer/detailEvent",{
        title: 'Detail Event',
        layout: 'main',
        events: event,
        categories:  categories
    });
};