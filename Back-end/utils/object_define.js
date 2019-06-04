var fs = require('fs');
var path = require('path');

exports.getRoleIdDefined = ()=>{
    var data =fs.readFileSync(path.join(__dirname,'./role_define.json'), 'utf8');
    return JSON.parse(data);
};

exports.getMonthInEnglish = (month)=>{
    var data =fs.readFileSync(path.join(__dirname,'./month_in_english.json'), 'utf8');
    var obj = JSON.parse(data);

    return obj[month];
};