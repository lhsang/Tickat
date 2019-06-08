const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../configs/db');

var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var ticketService = require('../../service/ticketService');

var Organization = require('../../models/organization');
var Ticket = require('../../models/ticket');
var Event = require('../../models/event');

var objectDefined = require('../../utils/object_define');
var handleData = require('../../utils/handleData');

function handleTickets(tickets){
    var className = ['vip','normal','free'];

    tickets.forEach((element,index) => {
        element.remaining = element.amount - element.bought;
        element.className = className[index];
    });
}

exports.bookingPage = async (req, res)=>{
    var categories = await categoryService.getAllCategories();
    var id = req.params.event_id;
    var tickets = await ticketService.getTicketsByEventId(id);

    handleTickets(tickets);
    console.log(tickets);
    
    var data = {
        title: 'Thông tin vé - Tickat: Mua bán vé sự kiện',
        layout: 'main',
        categories:  categories,
        tickets: tickets,
        logged: false
    };
    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    
    res.render("customer/booking",data);
};

exports.eventDetail = async (req, res)=>{
    var event = await eventService.getEventById({
        where: {
            id: req.params.id
        },
        include:[
            {
                model: Ticket,
                attributes: ['price']
            },
            {
                model: Organization,
                attributes: ['id','name','website']
            }
        ]
    });
    var categories = await categoryService.getAllCategories();
    handleData.addDateArrToEvent(event);

    var data = {
        title: 'Tickat - '+event.name,
        layout: 'main',
        event: event,
        categories:  categories,
        logged: false
    };
    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    
   res.render('customer/eventDetail', data);
};

exports.allEvents = async (req, res) =>{
    var categories = await categoryService.getAllCategories();
    var q = req.query.q || "";
    var limit = req.query.limit || 6 ;
    var page = req.query.page || 1; page= parseInt(page);

    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        include: {
            model: Ticket,
            attributes: ['price']
        },
        where:{ 
            name:{
                [Op.like]: "%"+q+"%"
            }
        },
        limit: limit,
        offset: (page-1)*limit
    });
    handleData.addDateArrToEvents(events);

    var data = {
        title: 'Tìm vé - Tickat: Mua bán vé sự kiện',
        layout: 'main',
        categories:  categories,
        events : events,
        logged: false,
        pagination: {
            limit : limit,
            page: page,
            totalRows: await eventService.countEvent({
                where:{
                    name:{
                        [Op.like]: "%"+q+"%"
                    }
                }
            })
        }
    };

    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    

    console.log(data);
    
    res.render("customer/all_events",data);
};

