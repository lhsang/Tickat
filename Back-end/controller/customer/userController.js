var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var dateFormat = require('dateformat');

var userService = require('../../service/userService');

var {hash_password,check_password} = require('../../utils/bcrypt');

var privateKey  = fs.readFileSync(path.join(__dirname,'../../configs/private.key'), 'utf8');
var publicKey  =  fs.readFileSync(path.join(__dirname,'../../configs/public.key'), 'utf8');

function genarateToken(user, expiresIn = '1h') {
    var payload = {
        username: user.username,
        full_name: user.full_name,
        avatar: user.avatar,
        role_id: user.role_id,
        id: user.id
    };

    var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: expiresIn});

    return token;
}

exports.login = async (req, res)=>{
    var username = req.body.username, password = req.body.password;
    var user = await userService.getUserByUsername(username);
    var response ={
        status: 403,
        message: "Invalid username or password !"
    };

    if(user!=null && check_password(password, user.password)){
        let token = genarateToken(user);
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

exports.changeProfile = async (req,res)=>{
    var address = req.body.address,
        date_of_birth = req.body.date_of_birth,
        tel = req.body.tel,
        mail = req.body.mail,
        description = req.body.description
        full_name =  req.body.full_name;

    var username = req.user.username;
    var user = await userService.getUserByUsername(username);
    
    if(user!=null){
        user.address=address;
        if(typeof date_of_birth !== 'undefined' && date_of_birth !=="")
            user.date_of_birth=dateFormat( date_of_birth,"yyyy/mmmm/dd");
        if(typeof req.avatar !== 'undefined'){
            try {
                fs.unlinkSync((user.avatar+"").substr(1));
            } catch (error) {}

            user.avatar = req.avatar;
        }

        user.full_name = full_name;
        user.tel=tel;
        user.mail=mail;
        user.description=description;
        user.save();

        var token = genarateToken(user);

        res.cookie('token', token, {expires: new Date(Date.now()+60*60*1000),httpOnly: true});

        res.sendStatus(200);

    }else res.sendStatus(500);

};

exports.forgotPassword = (req, res)=>{
    var error = "";
    if(req.query.error == 'email')
        error = "Email is not registered !";

    res.render('customer/forgotPassword',{
        title : 'Tickat - Forgot password',
        layout: 'empty',
        error: error
    });
};

exports.requestChangePassword = async (req, res)=>{
    var email = req.query.email;
    var href  = req.query.href || "http://localhost:3000/forgot-password";

    try {
        var user = await userService.getUser({
            where:{
                mail: email
            }
        });

        var token = genarateToken(user, 5*60);
        var url = href.replace("/forgot-password","")+"/change-password?token="+token;
        
        var mailOptions={
            to : user.mail,
            subject : "Quên mật khẩu tickat",
            html : `
            <b>Chào ${user.full_name},</b><br>
            Chúng tôi nhận được yêu cầu đổi mật khẩu từ tài khoản của bạn.
            <br> <br> <br>
            <b><a href="${url}"forgot-pass">Click vào đây để đổi mật khẩu</a> </b>
            <br><br>
            Email đổi mật khẩu chỉ có thời hạn trong 5 phút.
            <br>
            ------------------------------------------------------------------------------ <br>
            Mail was sent by Tickat.vn <br>
            ${new Date()}
            `
        };
        smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    res.redirect('/forgot-password?error=email');
                }
        });
    } catch (error) {
        res.redirect('/forgot-password?error=email');
    }

    res.send(`
    <div style="width:40%; margin: 20% auto; text-align:center">
        <h3>A confirmation email has been sent to your email</h3> <br>
        <i>Please check inbox or spam.</i>
    </div>
    `);
};

exports.changePasswordPage = async (req, res)=>{
    var token = req.query.token;
    
    res.render('customer/changePassword',{
        title : 'Tickat - Change password',
        layout: 'empty',
        token:token
    });
};

exports.changePassword =  async (req, res)=>{
    var token  = req.body.token;
    var password = req.body.password;
    if(password=="" || typeof password =='undefined'){
        res.send({
            status: 500,
            message: "Password is required !"
        });  
    }
    try {
        var decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

        if(decoded){
            var username = decoded.username;
            var user  = await userService.getUserByUsername(username);

            if(user){
                user.password = hash_password(password);
                user.save();
                res.send({
                    status: 200,
                    message: "Password was changed."
                });
            }
        }
    } catch (error) {
        res.send({
            status: 500,
            message: "Token incorrect or timeout. Please request again"
        });  
    }

    res.send({
        status: 500,
        message: "Token incorrect or timeout. Please request again. <a href='/'>Back home</a>"
    });    
};