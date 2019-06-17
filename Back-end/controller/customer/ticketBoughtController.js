var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var eventService = require('../../service/eventService');
var categoryService = require('../../service/categoryService');
var organizationService = require('../../service/organizationService');
var userService = require('../../service/userService');
var orderService = require('../../service/orderService');
var dateFormat = require('dateformat');
var numeral = require('numeral');


var lengthOfTicketBoughts=0;

function handleOrderObject(orders,limit,page,type_of_ticket){
    var ticketBought=[];
    var offset=(page-1)*limit;
    var count=0,total=0;
    lengthOfTicketBoughts=0

    for(i=0;i<orders.length;i++)
    {
        for(j=0;j<orders[i].order_details.length;j++)
        {
            if(lengthOfTicketBoughts>=offset && lengthOfTicketBoughts<(page*limit) && (type_of_ticket==orders[i].order_details[j].ticket.type_id ||type_of_ticket==0 )){
                    var obj={};
                    obj.date_bought=dateFormat(new Date(orders[i].date_bought),"dd mmmm yyyy");
                    obj.amount=orders[i].order_details[j].amount;
                    obj.price=orders[i].order_details[j].ticket.price;
                    obj.total=obj.amount*obj.price;
                    obj.eventname=orders[i].order_details[j].ticket.event.name;
        
                    if(orders[i].order_details[j].ticket.type_id==1)
                        obj.type_ticket='VIP';
                    else if(orders[i].order_details[j].ticket.type_id==2)
                        obj.type_ticket='Normal';
                    else  obj.type_ticket='Free';

                    obj.total= numeral(obj.total).format('0,0');
                    obj.price=numeral(obj.price).format('0,0');
        
                    ticketBought.push(obj);
                    count++;
                    
            }
            total++;
            if(type_of_ticket==0)
                lengthOfTicketBoughts=total;
            else
                lengthOfTicketBoughts=count;
        }
    }

    return ticketBought;
}

exports.ticketBought = async (req, res)=>{
    var user_id = req.user.id;
   
    var limit = req.query.limit || 5 ;
    var page =  req.query.page || 1; page= parseInt(page);
    var type_of_ticket = req.query.type_of_ticket || 0;


    var orders = await orderService.getOrdersByUserId(user_id);
    var ticketBoughts=handleOrderObject(orders,limit,page,type_of_ticket);
    
    var data={
        title: 'Vé đã mua',
        layout :'main',
        user : req.user,
        ticketBoughts: ticketBoughts,
        pagination: {
            limit : limit,
            page: page,
            totalRows: lengthOfTicketBoughts,
        }
    };
    res.render("customer/ticketBought",data);

};

