var dateFormat = require('dateformat');
var moment = require('moment');
var numeral = require('numeral');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');
var ticketService = require('../../service/ticketService');
var orderService = require('../../service/orderService');

var Event = require('../../models/event');
var Order_detail = require('../../models/order_detail');
var Ticket = require('../../models/ticket');
var TypeTicket = require('../../models/type_of_ticket');

var handleData = require('../../utils/handleData');

var percentTotalPrice;

function resetAllData(){
    sales = [0,0,0,0,0,0,0,0,0,0,0,0];
    totalTicketInYear=0;
    totalTicketInYearBought=0;
    saleInYear=0;

    totalTicketinMonth=[0,0,0,0,0,0,0,0,0,0,0,0];
    saleInMonth =0;
    percentSaleInMonth=0;

    seatInMonth=0;

    now = new Date();
    monthNow = now.getMonth();

    percentTotalPrice;

    daySale =[0,0,0,0,0,0,0,0,0,0,0,0];
}

function CalculateTotalAndSaleInYear(tickets){
    for(i=0;i<tickets.length;i++)
     {
        saleInYear = saleInYear + parseInt(tickets[i].price) *  parseInt(tickets[i].bought);
        console.log(saleInYear,tickets[i].price,tickets[i].bought);
        totalTicketInYear = totalTicketInYear +  parseInt(tickets[i].amount);
        totalTicketInYearBought = totalTicketInYearBought +  parseInt(tickets[i].bought);
     }  
    percentTotalPrice = ((totalTicketInYearBought/totalTicketInYear)*100).toFixed(2);
}

function handleQueryString(q='', organization_id, start, end){
    q = q || "";
    var queryStr={
        name:{
            [Op.like]: "%"+q+"%"
        }
    };
    if(typeof organization_id !=='undefined'  && organization_id != "")
        queryStr.organization_id =  organization_id;
    
    if(typeof start !=='undefined' && start != ""&& typeof end !=='undefined' && end != ""){
        queryStr.date = {
            [Op.gte]: dateFormat(start,"yyyy-mm-dd"),
            [Op.lte]: dateFormat(end,"yyyy-mm-dd")
        };
    }else{
        if(typeof start !=='undefined' && start != "")
            queryStr.date= {
                    [Op.gte]: dateFormat(start,"yyyy-mm-dd")
            };
        if(typeof end !=='undefined' && end != "")
            queryStr.date= {
                    [Op.lte]: dateFormat(end,"yyyy-mm-dd")
                };
    }
    return queryStr;
};

function handlequeryParams(q='' , start, end){
    var queryParams ={};
    if(typeof q !== 'undefined' && q!="")
        queryParams.q = q;
    if(typeof start !=='undefined' && start != "")
        queryParams.start =  start;
     if(typeof end !=='undefined' && end != "")
        queryParams.end =  end;
    return queryParams;
};
function handleSort(order){
    var sort = [];
    if(typeof order !== 'undefined' && order != {} && order!=null){
        if(order.order_by == "date"){
            sort.push(['date',order.order]);
        }else if(order.order_by == "price"){
            sort.push([Ticket, 'price', order.order]);
        }
    }

    return sort;
}

exports.dashboardevent = async (req, res)=>{
    var user_id = req.user.id;
    var q = req.query.q || "";
    var limit = req.query.limit || 9 ;
    var page = req.query.page || 1; page= parseInt(page);

    var organizations = await organizationService.getOrganizationIdByUserId(user_id);

    var organizationsIds = organizations.map((obj)=>{
        return obj.id;
    });

    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        include: {
            model: Ticket,
            attributes: ['price']
        },
        where : handleQueryString(q,organizationsIds),
        limit: limit,
        offset: (page-1)*limit
    });

    var eventIds =  events.map((obj)=>{
        return obj.id;
    });
    var tickets = await ticketService.getTicketsByEventId(eventIds);

    resetAllData();
    CalculateTotalAndSaleInYear(tickets); 
    
    handleData.addDateArrToEvents(events);

    var topticketevents = await ticketService.getTopTicketEventBought();

    var data = {
        title: 'Dashboard event',
        layout :'admin',
        user : req.user,
    
        totalTicketInYear: totalTicketInYear,
        percentTotalPrice: percentTotalPrice,

        events: events,
        organizations: organizations,

        topticketevents: topticketevents,

        pagination: {
            limit : limit,
            page: page,
            totalRows: await eventService.countEvent({
                where:{
                    name:{
                        [Op.like]: "%"+q+"%"
                    },
                    organization_id: organizationsIds
                }
            })
        }
    }; 

    res.render('admin/dashboard-event',data); 
};


exports.orderDetails = async (req, res)=>{
    var eventId = req.params.id;
    var limit = req.query.limit || 10 ;
    var page = req.query.page || 1; page= parseInt(page);
    var type_of_ticket = req.query.type_of_ticket || "";

    var event = await eventService.getEventById({
        where: {
            id: eventId
        },
        attributes:['name','date','address']
    });

    if(event){
        handleData.addDateArrToEvent(event);
        var queryStr = {};
        if(type_of_ticket !=""&& typeof type_of_ticket !=='undefined'&& type_of_ticket >0)
            queryStr.type_id = type_of_ticket;

        var orders = await orderService.getAllOrders({
            where: {               
                event_id: eventId,
            },
            attributes:['date_bought','name'],
            include: {
                model: Order_detail,
                attributes:['amount'],
                include:{
                    model: Ticket,
                    attributes:['price'],
                    include:{
                        model: TypeTicket,
                        attributes: ['name'],
                    },
                    where: queryStr
                }
            },
            limit: limit,
            offset: (page-1)*limit,
            subQuery:false
        });
        var order_details = await orderService.sumaryByEventId(eventId);

        var data = {
            title: 'Dashboard event',
            layout :'admin',
            user : req.user,
        
            event: event,
            orders: orders,
            order_details: JSON.stringify(order_details),

            pagination: {
                limit : limit,
                page: page,
                queryParams:{
                    page: page,
                    limit: limit
                },
                totalRows: await orderService.countOrderDetailsByEventId(eventId)
            }
        }; 
        if(type_of_ticket !=""&& typeof type_of_ticket !=='undefined'&& type_of_ticket >0)
            data.pagination.queryParams.type_of_ticket = type_of_ticket;

        res.status(200);
        res.render('admin/order-details',data); 
        
    }else res.sendStatus(404);
};

exports.filter = async (req, res)=>{
    var user_id = req.user.id;

    var q = req.query.q || "";
    var limit = req.query.limit || 9 ;
    var page = req.query.page || 1; page= parseInt(page);
    var start = req.query.start;
    var end = req.query.end;
    var order = req.query.order;

    var organizations = await organizationService.getOrganizationIdByUserId(user_id);

    var organizationsIds = organizations.map((obj)=>{
        return obj.id;
    });

    var queryString = handleQueryString(q,organizationsIds,start,end);
    var events = await eventService.getAllEvents({
        attributes: ['id','name','date','address','img'],
        include: {
            model: Ticket,
            attributes: ['price']
        },
        where : queryString,
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
            queryParams: handlequeryParams(q,start,end),
            totalRows: await eventService.countEvent({
                where:queryString
            })
        }
    };

    res.render("admin/filterEvents",data); 
};

exports.createEventPage  = async (req, res)=>{

    var data = {
        layout: 'admin',
    };
    res.render("admin/createEvent", data);
};