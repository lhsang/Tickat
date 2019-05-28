const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars');

app.use('/', require('./routes/index'));
app.use('/admin',require('./routes/admin'));
app.use('/events', require('./routes/event'));
app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!');
});

app.get('*', function(req, res){
    res.send('Page not found !!!!!!!', 404);
});
module.exports = app;
