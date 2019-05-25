var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');

exports.homePage = async (req, res)=>{
    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        limit: 4
    });

    //get slide img - tạm thời, sau bỏ vô service
    var slides = events.map(obj=>{
        return {'img':obj.img,'name':obj.name};
    });
    var comming_events = await eventService.getCommingEvents();
    var categories = await categoryService.getAllCategories();

    res.render("customer/home",{
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main',
        comming_events: comming_events,
        recommend_events: events,
        slides: slides,
        categories:  categories
    });
};