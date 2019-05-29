var format = require('./format');

exports.addDateArrToEvents = (events)=>{
    for(var i=0;i<events.length;i++){
        events[i].date_arr =format.getDateObjectFromString(events[i].date);
    }
};