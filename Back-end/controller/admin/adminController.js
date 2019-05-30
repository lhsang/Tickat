exports.login = (req, res)=>{
    res.render('admin/login',{
        title : 'Admin login',
        layout: 'empty'
    });
};
