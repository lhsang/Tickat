var fs = require('fs');
var path = require('path');

exports.getRoleIdDefined = ()=>{
    var data = fs.readFileSync(path.join(__dirname,'./role_define.json'), 'utf8');
    return JSON.parse(data);
};