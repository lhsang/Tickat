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

exports.sumaryByEventId = async (event_id)=>{
    try {
        var orders = await Order.findAll({
            attributes:['id'],
            where:{
                event_id:event_id
            }
        });

        var ids = orders.map((obj)=>{
            return obj.id;
        });

        var order_details = await Order_detail.findAll({
            raw:true,
            where:{
                order_id: ids
            },
            attributes: ['ticket_id', [sequelize.fn('sum', sequelize.col('order_detail.amount')), 'amount']],
            include:{
                model: Ticket,
                attributes:['price'],
                include:{
                    model: TypeTicket,
                    attributes: ['name']
                }
            },
            group: ["ticket->type_of_ticket.id","ticket.id",'ticket_id']
        });
        
        return order_details;
    } catch (error) {
        console.log(error+"");
    }
};

exports.getAllOrders = async (query)=>{
    try {
        var orders = await Order.findAll(query);
        return orders;
    } catch (error) {
        throw Error('Can not find order');   
    }
};

exports.getOrdersByUserId = async (user_id,limit,page)=>{
  
    try {
        var orders = await   Order.findAll({
            attributes:['name','date_bought'],
            where:{
                user_id:user_id,
            },
            include:{
                model: Order_detail,
                attributes:['amount'],
                include: {
                    model: Ticket,
                    attributes:['price','type_id'],
                    include: {
                        model:Event,
                        attributes:['name']
                    }
                },
                
                
            },
            order: sequelize.literal('date_bought DESC')

           
        });
        return orders;
    } catch (error) {
        throw Error('Can not find order');   
    }
}