var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');

exports.homePage = async (req, res)=>{
    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img']
    });

    //get slide img - tạm thời, sau bỏ vô service
    var slide = events.map(obj=>{
        return obj.img;
    });

    var categories = await categoryService.getAllCategories();

    console.log(slide);

    res.render("customer/home",{
        title: 'Tickat - Mua bán vé sự kiện',
        layout: 'main',
        events: events,
        slide: slide,
        categories:  categories
    });
};