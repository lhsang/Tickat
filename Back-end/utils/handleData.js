var format = require('./format');

exports.addDateArrToEvents = (events)=>{
    for(var i=0;i<events.length;i++){
        events[i].date_arr =format.getDateObjectFromString(events[i].date);
    }
};


exports.sortByKey = (array, key, order = 'asc') => {
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

}