var Event = require('../models/event');
var Ticket = require('../models/ticket');
const sequelize = require('../configs/db');

const {setDefaultQueryStr} =  require('../utils/default_query_string');

exports.getAllEvents = async (query)=>{

    try {
        setDefaultQueryStr(query);
        let events =  await Event.findAll(query);
        return events;
    } catch (e) {
        throw Error('Can not find all events');
    }
};

exports.getEventsById = async (query)=>{

    try {
        setDefaultQueryStr(query);
        let events =  await Event.findAll(query);
        return events;
    } catch (e) {
        throw Error('Can not find all events');
    }
};



exports.getCommingEvents = async ()=>{
    try {
        let events = await Event.findAll({
            attributes: ['id','name','date','address','img'],
            limit: 4,
            order: [['date','desc']],
            include:{
                model: Ticket,
                attributes: ['price'],
                order: [[Ticket, 'price', 'asc']]
            }
        });
        return events;
    } catch (error) {
        return Error('Error !');
    }

    
};
