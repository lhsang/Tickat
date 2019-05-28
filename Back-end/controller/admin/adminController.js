exports.login = (req, res)=>{
    var message = "";
    if(req.query.error !=null)
       message = "Invalid username or password";
    res.render('admin/login',{
        title : 'Admin login',
        layout: 'empty',
        message: message
    });
};