var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');
var Order_detail = require('../models/order_detail');
var Order = require('../models/order');
var dateFormat = require('dateformat');

const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');
const { Op } = Sequelize = require('sequelize');

function getMonthStartDay(month,year){
    var date = new Date(year+'-'+month+'-01');
    var monthStartDay =  dateFormat(new Date(date.getFullYear(), date.getMonth(), 1),"yyyy-mm-dd");
    return monthStartDay;
}

function getMonthEndDay(month,year){
    var date = new Date(year+'-'+month+'-01');
    var monthEndDay =  dateFormat(new Date(date.getFullYear(), date.getMonth() + 1, 0),"yyyy-mm-dd");
    return monthEndDay;
}

exports.getOrdersByEventId = async (event_id,limit = 10, offset = 0)=>{
    try {
        var orders = await Order.findAll({
            where: {               
                event_id:event_id,
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
                        attributes: ['name']
                    }
                }
            },
            offset: offset,
            limit: limit,
            subQuery:false
        });
        return orders;
    } catch (error) {
        throw Error('Can not find order');   
    }
};

exports.countOrderDetailsByEventId = async (event_id)=>{
    try {
        var orders = await Order.findAll({
            where: {               
                event_id:event_id,
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
                        attributes: ['name']
                    }
                }
            }
        });
        var sum = 0;
        orders.map((obj)=>{
            sum+=obj.order_details.length;
        });
        
        return sum;
    } catch (error) {
        console.log(error+"");
        
    }
};

