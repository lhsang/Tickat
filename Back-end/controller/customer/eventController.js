const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var dateFormat = require('dateformat');
const sequelize = require('../../configs/db');

var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var ticketService = require('../../service/ticketService');
var organizationService = require('../../service/organizationService');

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

function handleQueryString(q='', category_id, organization_id, start, end){
    q = q || "";
    var queryStr={
        name:{
            [Op.like]: "%"+q+"%"
        }
    };
    if(typeof category_id !=='undefined' && category_id != "")
        queryStr.category_id = category_id;
    if(typeof organization_id !=='undefined'  && organization_id != "")
        queryStr.organization_id =  organization_id;
    if(typeof start !=='undefined' && start != "")
        queryStr.date= {
                [Op.gte]: dateFormat(start,"yyyy-mm-dd")
          };
    if(typeof end !=='undefined' && end != "")
        queryStr.date= {
                  [Op.lte]: dateFormat(end,"yyyy-mm-dd")
            };

    return queryStr;
};

function handleSort(order){
    var sort = [];
    if(typeof order !== 'undefined' && order != {} && order!=null){
        if(order.order_by == "created_at"){
            sort.push(['created_at',order.order]);
        }else if(order.order_by == "price"){
            sort.push([Ticket, 'price', order.order]);
        }
    }

    return sort;
}

function handlequeryParams(q='', category_id , organization_id , start, end){
    var queryParams ={};
    if(typeof q !== 'undefined' && q!="")
        queryParams.q = q;
    if(typeof category_id !=='undefined' && category_id != "")
        queryParams.category_id = category_id;
    if(typeof organization_id !=='undefined' && organization_id != "")
        queryParams.organization_id =  organization_id;
    if(typeof start !=='undefined' && start != "")
        queryParams.star =  start;
     if(typeof end !=='undefined' && end != "")
        queryParams.end =  start;
    return queryParams;
};

exports.bookingPage = async (req, res, next)=>{
    var categories = await categoryService.getAllCategories();
    var id = req.params.event_id;
    var tickets = await ticketService.getTicketsByEventId(id);

    // if(typeof tickets === 'undefined' || tickets==null ||tickets =={})
    //     next();

    handleTickets(tickets);
    
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
    var category_id = req.query.category_id;
    var organization_id = req.query.organization_id;


    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        include: {
            model: Ticket,
            attributes: ['price']
        },
        where : handleQueryString(q, category_id, organization_id),
        limit: limit,
        offset: (page-1)*limit
    });
    handleData.addDateArrToEvents(events);

    var organizations = await organizationService.getAllOrganizations();
    var data = {
        title: 'Tìm vé - Tickat: Mua bán vé sự kiện',
        layout: 'main',
        categories:  categories,
        events : events,
        organizations: organizations,
        logged: false,
        pagination: {
            limit : limit,
            page: page,
            queryParams: handlequeryParams(q, category_id, organization_id),
            totalRows: await eventService.countEvent({
                where:handleQueryString(q, category_id, organization_id)
            })
        }
    };

    if(typeof req.user !== 'undefined'){
        data.logged = true;
        data.user = req.user;
    }    
    
    res.render("customer/all_events",data);
};

exports.filter = async (req, res)=>{
    var q = req.query.q || "";
    var limit = req.query.limit || 6 ;
    var page = req.query.page || 1; page= parseInt(page);
    var category_id = req.query.category_id;
    var organization_id = req.query.organization_id;
    var start = req.query.start;
    var end = req.query.end;
    var order = req.query.order;
    
    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        include: {
            model: Ticket,
            attributes: ['price']
        },
        where: handleQueryString(q, category_id, organization_id, start, end),
        limit: limit,
        offset: (page-1)*limit,
        order: handleSort(order)
    });

    handleData.addDateArrToEvents(events);

    var data = {
        layout: 'blank',
        events : events,
        pagination: {
            limit : limit,
            page: page,
            queryParams: handlequeryParams(q, category_id, organization_id,start,end),
            totalRows: await eventService.countEvent({
                where:handleQueryString(q, category_id, organization_id, start,end)
            })
        }
    };
    res.render("customer/filterEvents",data);
};


