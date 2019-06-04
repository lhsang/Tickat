var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');


const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');

exports.getTicketsByEventId = async (event_id)=>{

    try {
        let tickets = Ticket.findAll({
            //attributes: ['id',[sequelize.fn('count', sequelize.col('price')), 'count']],
           // group:['Ticket.id'],
            // attributes: ['price','amount','description','bought'],
            // order: [['price','desc']],
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
      //  console.log(tickets.id);
        return tickets;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
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



