var Event = require('../models/event');
var Ticket = require('../models/ticket');
const sequelize = require('../configs/db');
var handleData = require('../utils/handleData');

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

function handleSuggestEvents(events){
    var result = [];
    var i =0, length = (events.length%2==0)? events.length : (events.length-1);
    
    handleData.addDateArrToEvents(events);
    for(i=0;i<length-1;i+=2){
        result.push([events[i],events[i+1]]);
    }
    return result;
}

exports.getSuggestEvents = async (isHandle = false)=>{
    try {
        let events = await Event.findAll({
            attributes: ['id','name','date','address','img'],
            limit: 8,
            order: [['date','desc']],
            include:{
                model: Ticket,
                attributes: ['price'],
                order: [
                    [Ticket,'price', 'asc']
                ]
            }
        });
        events.map((obj)=>{
            handleData.sortByKey(obj.tickets,"price","desc");
        });
        
        return isHandle? handleSuggestEvents(events): events;
    } catch (error) {
        return Error('Error !');
    }
};