var Event = require('../models/event');
var Ticket = require('../models/ticket');
const sequelize = require('../configs/db');
const Sequelize = require('sequelize');
var handleData = require('../utils/handleData');

const Op = Sequelize.Op;
const {setDefaultQueryStr} =  require('../utils/default_query_string');
var dateFormat = require('dateformat');


exports.getAllEvents = async (query)=>{

    try {
        setDefaultQueryStr(query);
        let events =  await Event.findAll(query);
        return events;
    } catch (e) {
        //console.log(e);
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

exports.getEventById = async (query)=>{
    try {
        let event = await Event.findOne(query);
        try {
            handleData.sortByKey(event.tickets, 'price');
        } catch (error) {}
        return event;
    } catch (error) {
        return new Error('Some thing is wrong when getEventById');
    }
};

exports.test = async ()=>{
    var events = await Event.findAll({
        where:
            sequelize.where(sequelize.fn('YEAR',sequelize.col('date')),2018)
        });
    return events;
};

exports.getEventByOrganizationId = async (organization_id,limit = 9, offset = 0)=>{
    try {
        let event = await Event.findAll({
            attributes: ['id','name','address','img','date'],
            include:{
                model: Ticket,
                attributes: ['id','amount','bought','event_id']
            },
            where: {
                organization_id:organization_id
            },
        });
        return event;
    } catch (error) {
        console.log(error);
        return new Error('Some thing is wrong');
    }
};

exports.countEvent = async (query) =>{
    try {
        let count = await Event.count(query);
        return count;
    } catch (error) {
        console.log(error);
        return new Error('Some thing is wrong');
    }
};

exports.getEventByOrganizationIdAndYear = async (organization_id,yearnow,limit = 9, offset = 0)=>{
    try {

        var daystartofyear=dateFormat(new Date(yearnow+"-01-01"),"yyyy/mm/dd");
        var dayendofyear=dateFormat(new Date(yearnow+"-12-31"),"yyyy/mm/dd");

        let event = await Event.findAll({
                attributes: ['id','name','address','img','date'],
                include:{
                    model: Ticket,
                },
                where: {
                    organization_id:organization_id,
                    date:{
                        [Op.gte]: daystartofyear,
                        [Op.lte]: dayendofyear,
                    } 

                },
            });
        return event;
    } catch (error) {
        console.log(error);
        return new Error('Some thing is wrong');
    }
};
