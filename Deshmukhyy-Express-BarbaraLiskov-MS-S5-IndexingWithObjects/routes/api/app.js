const express = require('express');
const router = express.Router();
const {setupApiRoute} = require('../../helpers');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

setupApiRoute(router, 'post', '/', [middlewares.user.authenticateUser], controllers.api.app.create)
setupApiRoute(router, 'get', '/', [middlewares.user.authenticateUser], controllers.api.app.read)
setupApiRoute(router, 'put', '/:id', [middlewares.user.authenticateUser], controllers.api.app.update)

module.exports = router;