const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

var hbs = exphbs.create({
    extname: "handlebars",
    defaultLayout: "main",
    helpers:{
        paginate: paginateHelper.createPagination
    }
});

app.engine("handlebars", hbs.engine);
app.set('view engine', "handlebars");

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/admin',require('./routes/admin'));
app.use('/events', require('./routes/event'));
app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error/500",{
        layout: "none"
    });
});

app.get('*', function(req, res){
    res.status(404);
    res.render("error/404",{
        layout: "none"
    });
});
module.exports = app;
