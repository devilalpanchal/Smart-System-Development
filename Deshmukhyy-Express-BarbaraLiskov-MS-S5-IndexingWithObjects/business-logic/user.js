const utilities = require('../utilities');
const database = require("../database");
const {collections} = require("../database");
const {user} = require('../middlewares');

const users = module.exports;

users.getLoggedInUser = async (req) => {
    const {userId} = req.user;
    const userData = await database.client.collection(collections.USERS).findOne({userId});
    const filteredUserData = user.filterAndHideProtectedUserFields(userData);

    return filteredUserData;
}