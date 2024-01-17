var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var controllers = require('../controllers');
var middlewares = require('../middlewares');

/* GET home page. */
helpers.setupPageRoute(router, '/', [], controllers.pages.getHomePage)
helpers.setupPageRoute(router, '/login', [], controllers.pages.login)

helpers.setupPageRoute(router, '/app/user', [middlewares.user.requireLogin], controllers.pages.user)
helpers.setupPageRoute(router, '/app/user/dashboard', [middlewares.user.requireLogin], controllers.pages.userdashboard)

helpers.setupPageRoute(router, '/app/organizer', [middlewares.user.requireLogin], controllers.pages.organizer)
helpers.setupPageRoute(router, '/app/organizer/create', [middlewares.user.requireLogin], controllers.pages.create)

module.exports = router;
