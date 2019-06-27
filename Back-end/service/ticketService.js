var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');


const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');




exports.getTicketsByEventId = async (event_id)=>{

    try {
        let tickets = Ticket.findAll({
            include: [
                {
                    model: TypeTicket
                },
                {
                    model: Event,
                    attributes: ['name','date','address']
                }
            ],
            where: {
                event_id: event_id
            },
        });
        return tickets;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};

exports.getTicketById = async (id)=>{
    try {
        let ticket = await Ticket.findOne({
            where: {
                id: id
            },
        });
        return ticket;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
};

exports.getTotalPriceTicketsByOrganizationId = async (organization_id)=>{

    try {
        let ticket = Ticket.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('price')), 'price']],
            include: [{
                model:Event,
                where:{organization_id:organization_id},
            }
            ],          
             group:['event.id'],
        });
        return ticket;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};

exports.getTicketsByOrganizationId = async (organization_id)=>{

    try {
        var sum=0;
        let tickets = await Ticket.findAll({
            attributes: ['price','amount','bought'],
            include: [{
                model:Event,
                where:{organization_id:organization_id},
            }
            ],           
             group:['ticket.id','event.id'],
        });
           //console.log(sum);
               
        return tickets;
        
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};

exports.getTicketsByMonth = async (organization_id)=>{

    try {
        var sum=0;
        let tickets = await Ticket.findAll({
            attributes:['price','bought'],
            include:{
                model: Order_detail,
                include: {
                    model: Order,
                    attributes:['name','date_bought'],
                   // where:{event_id:6}
                    include:{
                        model: Event,
                        where:{organization_id:3}
                    }
                }
            }
        });
           //console.log(sum);
               
        return tickets;
        
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};


exports.getTopTicketEventBought = async()=>{
    try {
        var sum=0;
        let tickets = await  Ticket.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'amount'],[sequelize.fn('sum', sequelize.col('bought')), 'bought']],
            include: [{
                model:Event,
                attributes:['name'],
            }
            ],          
             group:['event.id'],
             order: sequelize.literal('bought desc'),
             limit:6,
        });
               
        return tickets;
        
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
}

exports.getTicketsByEventIdAndTypeId = async (event_id,type_of_ticket)=>{

    try {
        var typeid=0;
        var temp = await Ticket.findAll({
            attributes: ["type_id"],
            where:{
                event_id:event_id,
            },
            include:{
                model: TypeTicket,
                where:{
                    name: type_of_ticket
                }
            }
        });

        if(typeof temp !='undefined')
            typeid = temp[0].type_id;

        let tickets = Ticket.findOne({
          
            where: {
                event_id: event_id,
                type_id: typeid
            },
        });
        return tickets;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};

exports.createTicket = async (ticket)=>{
    var result = await Ticket.create(ticket).then((obj)=>{
        return obj;
    }).catch((error)=>{
        return error;
    });
    return result;
};
