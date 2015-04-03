var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');


require('./config/passport')(passport);

// configuration ====================================================================================================================================================================================================




app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'yaaaypassportjs'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes/index');
var quiz = require('./routes/quiz');
var login = require('./routes/login');
var logout = require('./routes/logout');
var profile = require('./routes/profile');
var signup = require('./routes/signup');


app.use('/', routes);
app.use('/quiz', quiz);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/profile', profile);


//require('./app/routes.js')(app, passport); WHAT SHOulD THIS LINE BE IN my app?!!?!?!?

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function isLoggedIn(req, res, next) { // move to its own module?
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = app;
