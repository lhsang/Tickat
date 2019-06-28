exports.setDefaultQueryStr = (query) => {
    if(query ==  undefined || query == null){
        query = {};
        return;
    }
    if(query.offset == undefined || query.offset == null) query.offset = 0;
    if(query.limit == undefined || query.limit == null) query.limit = 24;
    if(query.order == undefined || query.order == null) query.order = [['id','desc']];
}