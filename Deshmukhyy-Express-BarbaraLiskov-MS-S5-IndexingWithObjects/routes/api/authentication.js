const express = require('express');
const router = express.Router();
const {setupApiRoute} = require('../../helpers');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

setupApiRoute(router, 'post', '/register', [middlewares.checkRequired.bind(null, ['username', 'password'])], controllers.api.authentication.registerUser)
setupApiRoute(router, 'post', '/signin', [middlewares.checkRequired.bind(null, ['username', 'password'])], controllers.api.authentication.signInUser)
setupApiRoute(router, 'post', '/signout', [], controllers.api.authentication.signOutUser)

module.exports = router;