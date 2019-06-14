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
var handleData = require('../../utils/handleData');

var sales = [0,0,0,0,0,0,0,0,0,0,0,0];
var totalTicketInYear=0;
var totalTicketInYearBought=0;
var saleInYear=0;

var totalTicketinMonth=[0,0,0,0,0,0,0,0,0,0,0,0];
var saleInMonth =0;
var percentSaleInMonth=0;

var seatInMonth=0;

var now = new Date();
var monthNow = now.getMonth();
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var percentTotalPrice;

var daySale =[0,0,0,0,0,0,0,0,0,0,0,0];
var dayArr=[];


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

function getSaleInMonthOfYear(orders){
    
    orders.forEach(function getOrderByMonth(order){
        day=new Date(order.date_bought);
        m = day.getMonth();
 
        for(j=0;j<order.order_details.length;j++){ 
           sales[m] = sales[m] + parseInt(order.order_details[j].amount) * parseInt(order.order_details[j].ticket.price);
            totalTicketinMonth[m] = totalTicketinMonth[m] + parseInt(order.order_details[j].amount);
        }
    });
    return sales;
}

function getSaleAndSeatInMonth(){
    saleInMonth = sales[monthNow];
    percentSaleInMonth = (totalTicketinMonth[monthNow]/totalTicketInYear*100).toFixed(2);

    seatInMonth = totalTicketinMonth[monthNow];
}


function getSaleInDay(orders){

    for(i=9;i>=0;i--){
        var daybefore = dateFormat(moment().subtract(i, 'days'),"yyyy-mmmm-dd");
        dayArr.push(daybefore);
    }

    orders.forEach(function getOrderByDay(order){
      
        for(j=0;j<order.order_details.length;j++){ 
            for(k=0;k<10;k++)
            {
                if(dateFormat(order.date_bought,"yyyy-mmmm-dd")==dayArr[k]){
                    daySale[k] = daySale[k]+ parseInt(order.order_details[j].amount) * parseInt(order.order_details[j].ticket.price);
                }
            }
        
        }
    
    });

    return daySale;
}

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
    dayArr=[];
}

exports.dashboard = async (req, res)=>{
    var user_id = req.user.id;
   
    var organizations = await organizationService.getOrganizationIdByUserId(user_id);

    var events =[];
    for(i=0;i<organizations.length;i++){
        tmp = await eventService.getEventByOrganizationId(organizations[i].id);
        if(tmp.length!=0)
            for(j=0;j<tmp.length;j++)
                events.push(tmp[j]);
    }
    
    var tickets = [];
    var orders= [];
    for(i=0;i<events.length;i++){
       var ticket = await ticketService.getTicketsByEventId(events[i].id);
       if(ticket.length!=0)
        for(j=0;j<ticket.length;j++)
            tickets.push(ticket[j]);

      
       var order = await orderService.getOrdersByEventId(events[i].id);
       if(order.length!=0)
            for(j=0;j<order.length;j++)           
                orders.push(order[j]);

    }

    resetAllData();
     await CalculateTotalAndSaleInYear(tickets); 
     var saleInMonthArr = await getSaleInMonthOfYear(orders);

     await getSaleAndSeatInMonth();
     daySale = await getSaleInDay(orders);

    saleInYear = numeral(saleInYear).format('$0,0');
    saleInMonth = numeral(saleInMonth).format('$0,0');
    
    try{
        var data = {
            title: 'Dashboard',
            layout :'admin',
            user : req.user,
           
            month: month[monthNow],
            saleInYear: saleInYear,
            percentTotalPrice: percentTotalPrice,

            saleInMonth: saleInMonth,
            percentSaleInMonth: percentSaleInMonth,

            seatInMonth: seatInMonth,
            saleInMonthArr: saleInMonthArr,

            dayArr: dayArr,
            daySale: daySale,
        
        }; 
    
        res.render('admin/dashboard',data);
    } catch (e) {
       console.log(e);
    }
};

exports.dashboardchart = async (req, res)=>{
    var user_id = req.user.id;
   
    var organizations = await organizationService.getOrganizationIdByUserId(user_id);

    var events =[];
    for(i=0;i<organizations.length;i++){
        tmp = await eventService.getEventByOrganizationId(organizations[i].id);
        if(tmp.length!=0)
            for(j=0;j<tmp.length;j++)
                events.push(tmp[j]);
    }

    
    var tickets = [];
    var orders= [];
    for(i=0;i<events.length;i++){
       var ticket = await ticketService.getTicketsByEventId(events[i].id);
       if(ticket.length!=0)
        for(j=0;j<ticket.length;j++)
            tickets.push(ticket[j]);

      
       var order = await orderService.getOrdersByEventId(events[i].id);
       if(order.length!=0)
            for(j=0;j<order.length;j++)           
                orders.push(order[j]);
    }


    await resetAllData();
     await CalculateTotalAndSaleInYear(tickets); 
     var saleInMonthArr = await getSaleInMonthOfYear(orders);

     await getSaleAndSeatInMonth();
     daySale = await getSaleInDay(orders);

    saleInYear = numeral(saleInYear).format('$0,0');
    saleInMonth = numeral(saleInMonth).format('$0,0');
    

    
    try{
        var data = {
            title: 'Dashboard chart',
            layout :'admin',
            user : req.user,
           
            month: month[monthNow],
            saleInYear: saleInYear,
            percentTotalPrice: percentTotalPrice,

            saleInMonth: saleInMonth,
            percentSaleInMonth: percentSaleInMonth,

            seatInMonth: seatInMonth,
            saleInMonthArr: saleInMonthArr,

            dayArr: dayArr,
            daySale: daySale,
        
        }; 
    
        res.render('admin/dashboard-chart',data);
    } catch (e) {
       console.log(e);
    }
};

exports.dashboardevent = async (req, res)=>{
    var user_id = req.user.id;
    var q = req.query.q || "";
    var limit = req.query.limit || 9 ;
    var page = req.query.page || 1; page= parseInt(page);

    var organizations = await organizationService.getOrganizationIdByUserId(user_id);

    var organizationsIds = organizations.map((obj)=>{
        return obj.id;
    });

    var events = await eventService.getEventByOrganizationId(organizationsIds,limit,(page-1)*limit);

    var tickets = [];
    for(i=0;i<events.length;i++){
       var ticket = await ticketService.getTicketsByEventId(events[i].id);
       if(ticket.length!=0)
        for(j=0;j<ticket.length;j++)
            tickets.push(ticket[j]);
    }


    await resetAllData();
    await CalculateTotalAndSaleInYear(tickets); 
    
    handleData.addDateArrToEvents(events);

    var data = {
        title: 'Dashboard event',
        layout :'admin',
        user : req.user,
    
        totalTicketInYear: totalTicketInYear,
        percentTotalPrice: percentTotalPrice,

        events: events,
        organizations: organizations,

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

    var orders = await orderService.getOrdersByEventId(eventId, limit, (page-1)*limit);
    var order_details = await orderService.sumaryByEventId(eventId);

    var data = {
        title: 'Dashboard event',
        layout :'admin',
        user : req.user,
    
        orders: orders,
        order_details:order_details,

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
    res.render('admin/order-details',data); 
};

exports.test = async (req, res)=>{
    var od = await orderService.sumaryByEventId(6);

    res.send(od);
};
