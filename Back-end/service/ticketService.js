var Ticket = require('../models/ticket');
var TypeTicket = require('../models/type_of_ticket');
var Event = require('../models/event');

const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');

exports.getTicketsByEventId = async (event_id)=>{

    try {
        let tickets = await Ticket.findAll({
            where: {
                event_id: event_id
            },
            attributes: ['price','amount','description','bought'],
            order: [['price','desc']],
            include: [
                {
                    model: TypeTicket
                },
                {
                    model: Event,
                    attributes: ['name','date','address']
                }
            ]
        });
        return tickets;
    } catch (e) {
        throw Error('Can not find all tickets');
    }
    return {};
};
