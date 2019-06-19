var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');
var Order_detail = require('../models/order_detail');
var Order = require('../models/order');

exports.createOrderDetail = async(order_detail)=>{
    var result = await Order_detail.create(order_detail).then((obj)=>{
        return obj;
    }).catch((err)=>{
        console.log(err);
        return err;
    });
    return result;
}