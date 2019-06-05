var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');
var Order_detail = require('../models/order_detail');
var Order = require('../models/order');
var dateFormat = require('dateformat');


const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');
const { Op } = Sequelize = require('sequelize');

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


exports.getOrdersByEventId = async (event_id)=>{
    try {
        // var monthStartDay = await getMonthStartDay(month,year);
        // var monthEndDay = await getMonthEndDay(month,year);
        var orders = Order.findAll({
            where: {               
                event_id:event_id,
            },
             attributes:['date_bought'],

                include: {
                    model: Order_detail,
                    attributes:['amount'],
                    include:{
                        model: Ticket,
                          attributes:['price']
          
                    }
                },
        
        });
        if(orders.length==0)
            return 0;
        else
        return orders;
    } catch (error) {
        console.log(error);
        return {};
        throw Error('Can not find order');   
     
    }
    
};

