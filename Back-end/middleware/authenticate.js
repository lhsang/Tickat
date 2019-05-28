var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var publicKey  =  fs.readFileSync(path.join(__dirname,'../configs/public.key'), 'utf8');
var roleDefined = require('../utils/object_define');
var ignoreAuthenticate= [
    "/login",
    "/logout",
    "/admin/login",
    "admin/logout"
];

exports.verifyToken = (req, res, next) =>{
    req.token = req.cookies.token;
    if(typeof req.token !== 'undefined'){
        jwt.verify(req.token, publicKey, { algorithms: ['RS256'] }, (error, authorData)=>{
            if(error){
                res.sendStatus(403);
            }else{
                return next();
            }
        });
    }else{
        res.sendStatus(403);
    }
};

exports.decodeToken = (req, res, next)=>{
    try {
        var token = req.cookies.token;
        var decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded;
    } catch(err) {
        return next();
    }
    return next();
};

exports.verifyTokenInRoleAdmin = (req, res, next) =>{
    
    req.token = req.cookies.token;
    if(typeof req.token !== 'undefined'){
        jwt.verify(req.token, publicKey, { algorithms: ['RS256'] }, (error, authorData)=>{
            var role = roleDefined.getRoleIdDefined();
            if(error||authorData.role_id!= role.admin){
                res.send("Access denied !!!");
            }else{
                if(ignoreAuthenticate.includes(req.path))
                    res.redirect('/admin');
                else return next();
            }
        });
    }else{
        if(ignoreAuthenticate.includes(req.path))
            return next();
        res.redirect('/admin/login');
    }
};