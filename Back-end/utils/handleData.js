var format = require('./format');

var addDateArrToEvent = (event)=>{
    event.date_arr =format.getDateObjectFromString(event.date);
};

var addDateArrToEvents = (events)=>{
    for(var i=0;i<events.length;i++){
        addDateArrToEvent(events[i]);
    }
};

var sortByKey = (array, key, order = 'asc') => {
    if(order.toLowerCase().localeCompare('asc')==0){
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
        
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });

};

module.exports = {
    addDateArrToEvent,
    addDateArrToEvents,
    sortByKey
};