var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');
var ticketService = require('../../service/ticketService');
var orderService = require('../../service/orderService');
var dateFormat = require('dateformat');
var moment = require('moment');
var numeral = require('numeral');




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



async function CalculateTotalAndSaleInYear(tickets){
   
    for(i=0;i<tickets.length;i++)
     {
        saleInYear = saleInYear + parseInt(tickets[i].price) *  parseInt(tickets[i].bought);
        console.log(saleInYear,tickets[i].price,tickets[i].bought);
        totalTicketInYear = totalTicketInYear +  parseInt(tickets[i].amount);
        totalTicketInYearBought = totalTicketInYearBought +  parseInt(tickets[i].bought);
     }  

    percentTotalPrice = ((totalTicketInYearBought/totalTicketInYear)*100).toFixed(2);

}



async function getSaleInMonthOfYear(orders){
    
    orders.forEach(function getOrderByMonth(order){
        day=new Date(order.date_bought);
        m = day.getMonth();
 
        for(j=0;j<order.order_details.length;j++){ 
           sales[m] = sales[m] + parseInt(order.order_details[j].amount) * parseInt(order.order_details[j].ticket.price);
            totalTicketinMonth[m] = totalTicketinMonth[m] + parseInt(order.order_details[j].amount);

        }
    
    })
    return sales;
}

async function getSaleAndSeatInMonth(){
    
    saleInMonth = sales[monthNow];
    percentSaleInMonth = (totalTicketinMonth[monthNow]/totalTicketInYear*100).toFixed(2);

    seatInMonth = totalTicketinMonth[monthNow];
}


async function getSaleInDay(orders){
   // var day=[];
   
    for(i=9;i>=0;i--){
        var daybefore = dateFormat(moment().subtract(i, 'days'),"yyyy-mmmm-dd");
        dayArr.push(daybefore);
    }

    console.log('day',dayArr);
    orders.forEach(function getOrderByDay(order){
      
        for(j=0;j<order.order_details.length;j++){ 
            for(k=0;k<10;k++)
            {
                if(dateFormat(order.date_bought,"yyyy-mmmm-dd")==dayArr[k]){
                    daySale[k] = daySale[k]+ parseInt(order.order_details[j].amount) * parseInt(order.order_details[j].ticket.price);
                }
            }
        
        }
    
    })
    console.log(daySale);
    return daySale;
}

async function resetAllData(){
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
    var user_id = 9;
   

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
     console.log(saleInMonthArr);

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
    var user_id = 9;
   

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