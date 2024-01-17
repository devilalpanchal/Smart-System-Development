var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connectMongo = require('connect-mongo');

var config = require('./config.json');
var indexRouter = require('./routes/index');
var database = require('./database');
var {user} = require('./middlewares');

var app = express();

async function initialize() {
    await database.initializeConnection();

    const sessionOptions = {
      store: connectMongo.create({client: database.mongoClient, dbName: config.database}),
      name: 'session.sid',
      path: '/',
      secret: config.cookieSecret,
      cookie: {},
      resave: false,
      saveUninitialized: true,
    }

    if (config.env === 'production') {
      sessionOptions.cookie.secure = true // serve secure cookies
    }
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('trust proxy', 1) // trust first proxy

    app.use(logger('dev'));
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser(config.cookieSecret));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(expressSession(sessionOptions));

    passport.serializeUser(user.serializeUser);
    passport.deserializeUser(user.deserializeUser);
    passport.use(new LocalStrategy({ passReqToCallback: true }, user.verifyUser));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = config.env === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
  });
}

initialize();


module.exports = app;
