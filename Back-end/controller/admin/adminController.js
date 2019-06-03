exports.login = (req, res)=>{
    res.render('admin/login',{
        title : 'Tickat - Admin login',
        layout: 'empty'
    });
};

exports.signUp = (req, res)=>{
    res.render('admin/sign_up',{
        title : 'Tickat - Create a account',
        layout: 'empty'
    });
};
