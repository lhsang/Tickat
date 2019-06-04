var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');
var ticketService = require('../../service/ticketService');
var orderService = require('../../service/orderService');
var dateFormat = require('dateformat');
var moment = require('moment');



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

var formatday = require('../../utils/format');

async function getMonthStartDay(month,year){
    var date = new Date(year+'-'+month+'-01');
    var monthStartDay =  dateFormat(new Date(date.getFullYear(), date.getMonth(), 1),"yyyy-mm-dd");
    return monthStartDay;
}

async function getMonthEndDay(month,year){
    var date = new Date(year+'-'+month+'-01');
    var monthEndDay =  dateFormat(new Date(date.getFullYear(), date.getMonth() + 1, 0),"yyyy-mm-dd");
    return monthEndDay;
}

async function CalculateTotalAndSaleInYear(tickets){
   
    for(i=0;i<tickets.length;i++)
     {
        saleInYear = saleInYear+tickets[i].price*tickets[i].bought;
        console.log(saleInYear,tickets[i].price,tickets[i].bought);
        totalTicketInYear = totalTicketInYear + tickets[i].amount;
        totalTicketInYearBought = totalTicketInYearBought + tickets[i].bought;
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


exports.dashboard = async (req, res)=>{
     var user_id = 6;
    // var organization_id = await organizationService.findOrganizationByUserId(user_id);

    var tickets = await ticketService.getTicketsByOrganizationId(3);
    var orders = await orderService.getOrdersByEventId(6);
    


    await CalculateTotalAndSaleInYear(tickets); 
    var saleInMonthArr = await getSaleInMonthOfYear(orders);
    console.log(saleInMonthArr);

    await getSaleAndSeatInMonth();
    daySale = await getSaleInDay(orders);



    console.log('a',daySale);

    
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
    var user_id = 6;
   // var organization_id = await organizationService.findOrganizationByUserId(user_id);

   var tickets = await ticketService.getTicketsByOrganizationId(3);
   var orders = await orderService.getOrdersByEventId(6);
   


   await CalculateTotalAndSaleInYear(tickets); 
   var saleInMonthArr = await getSaleInMonthOfYear(orders);
   console.log(saleInMonthArr);

   await getSaleAndSeatInMonth();
   daySale = await getSaleInDay(orders);



   console.log('a',daySale);

   
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