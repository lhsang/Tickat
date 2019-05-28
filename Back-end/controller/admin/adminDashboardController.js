exports.dashboard = (req, res)=>{
    var data = {
        title: 'Dashboard',
        layout :'admin',
        user : req.user
    }; 
    res.render('admin/dashboard',data);
};