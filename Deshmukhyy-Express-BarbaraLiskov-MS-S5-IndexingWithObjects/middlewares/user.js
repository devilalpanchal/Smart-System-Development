const bcrypt = require('bcrypt');
const database = require('../database');
const helpers = require('../helpers');

const {
    collections
} = require('../database');

const authentication = module.exports
const protectedUserFields = ['password'];

authentication.filterAndHideProtectedUserFields = function (userData = {}) {
    const filteredUserData = {};

    Object.keys(userData).forEach(key => {
        if (!protectedUserFields.includes(key)) {
            filteredUserData[key] = userData[key];
        }
    });

    return filteredUserData;
}

authentication.serializeUser = async function (user, done) {
    done(null, user.userId);
}

authentication.deserializeUser = async function (id, done) {
    try {
        const user = await database.client.collection(collections.USERS).findOne({ userId: id });
        const filteredUserData = authentication.filterAndHideProtectedUserFields(user)
        if (user) {
            done(null, filteredUserData)
        } else done(new Error('No such user was found.'), {})
    } catch (err) {
        done(err, {});
    }
}

authentication.verifyUser = async function (req, res, next, done) {
    const { username, password } = req.body;
    const userSearchKeys = {
        $or: [{
            username: username.trim()
        }, {
            email: username.trim()
        }]
    };

    const userData = await database.client.collection(collections.USERS).findOne(userSearchKeys);
    if (!userData) {
        return done(new Error('Invalid credentials. Please check your username/email and login again'));
    }

    // Compare the provided password with the hashed password using bcrypt
    const didPasswordMatch = await bcrypt.compare(password.trim(), userData.password);

    if (!didPasswordMatch) {
        return done(new Error('Invalid password. Please retry after validating it once again.'));
    }

    const filteredUserData = authentication.filterAndHideProtectedUserFields(userData);

    return done(null, filteredUserData, {
        message: 'Logged in successfully!'
    });
}

authentication.authenticateUser = async function (req, res, next) {
    if (!req.isAuthenticated() || !req.user) {
        return helpers.formatApiResponse(401, res, new Error("You need to be authenticated to access this API endpoint."));
    }
    next();
}

authentication.requireLogin = async function (req, res, next) {
    if (!req.isAuthenticated() || !req.user) {
        const path =req.url;
        const params = new URLSearchParams({
            redirect:true,
            url:path
        }).toString();
        return res.redirect('/login?' + decodeURIComponent(params));
    }

    next();
}