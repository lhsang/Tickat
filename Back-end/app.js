const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars');

app.use('/', require('./routes/index'));
app.use('/admin',require('./routes/admin'));
app.use('/events', require('./routes/event'));
app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error/500",{
        title: "Lỗi rồi! - Tickat",
        layout: "none"
    });
});

app.get('*', function(req, res){
    res.status(404);
    res.render("error/404",{
        title: "Không tìm thấy trang- Tickat",
        layout: "none"
    });
});
module.exports = app;
