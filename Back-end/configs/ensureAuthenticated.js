var ignoreAuthenticates= [
    "/login",
    "/logout"
];

module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            if(ignoreAuthenticates.includes(req.path))
               return next();  
            res.redirect('/admin/login');
        }
    },

    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/admin');  
    }
};