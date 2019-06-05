var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var userService = require('../../service/userService');

var {hash_password,check_password} = require('../../utils/bcrypt');
var privateKey  = fs.readFileSync(path.join(__dirname,'../../configs/private.key'), 'utf8');

exports.login = async (req, res)=>{
    var username = req.body.username, password = req.body.password;
    var user = await userService.getUserByUsername(username);
    var response ={
        status: 403,
        message: "Invalid username or password !"
    };

    if(user!=null && check_password(password, user.password)){
        var payload = {
            username: user.username,
            full_name: user.full_name,
            avatar: user.avatar,
            role_id: user.role_id,
            id: user.id
        };

        let token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h'});
        res.cookie('token', token, {expires: new Date(Date.now()+60*60*1000),httpOnly: true});
        response.status = 200;
        response.message="";
    }
    res.send(response);
};

exports.signUp = async (req, res)=>{
    var data = {
        username :req.body.username,
        password : req.body.password,
        tel: req.body.tel,
        address: req.body.address,
        mail: req.body.mail,
        date_of_birth: req.body.date_of_birth,
        full_name: req.body.full_name,
        admin: req.body.admin
    };
    data.password = hash_password(data.password);
    
    userService.createAccount(data);
    res.send({
        status: 200,
        msg: "Đăng ký thành công"
    });
};

exports.checkUsername = async (req, res)=>{
    var user = await userService.getUserByUsername(req.body.username);
    var response = {
        status: 404,
        msg: "Username not found"
    };
    if(user){
        response.status = 200;
        response.msg = "Username already existed"
    }
    res.send(response);
};

exports.logout = (req, res)=>{
    res.clearCookie("token");
    res.redirect('/');
};


exports.switchAcc = async (req, res)=>{
    if(typeof req.user !== 'undefined'){
        userService.switchRoleToAdmin(req.user.username);
    }
    res.clearCookie("token");
    res.redirect('/admin/login');
};

exports.uploadAvatar = (req, res)=>{
    res.send('upload thanh cong');
};
