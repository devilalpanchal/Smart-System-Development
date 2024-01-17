
var express = require('express');
var router = express.Router();

const authenticationRoutes = require('./authentication');
const userRoutes = require('./user');
const appRoutes = require('./app');

router.use('/auth', authenticationRoutes);
router.use('/user', userRoutes);
router.use('/app', appRoutes);

module.exports = router;
