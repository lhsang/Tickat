var Event = require('../models/event');

exports.getAllEvents = async (query, offset = 0, limit = 10)=>{
    try {
        var events =  await Event.findAll(query);
        return events;
    } catch (e) {
        throw Error('Can not find all events');
    }
};
