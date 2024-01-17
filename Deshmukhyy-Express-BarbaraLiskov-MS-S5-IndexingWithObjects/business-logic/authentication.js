const utilities = require('../utilities');
const bcrypt = require('bcrypt');
const database = require("../database");
const {collections} = require("../database");

const authentication = module.exports;

authentication.registerUser = async (req) => {
    const {username, password, fullname, email} = req.body;

    const userExists = await database.client.collection(collections.USERS).findOne({username: username.trim()});
    if (userExists) {
        throw new Error('An user with this username already exists.');
    }
    if (username.length < 3) {
        throw new Error('username is too short.')
    }
    if (password.length < 3) {
        throw new Error('password is too short.')
    }
    if (email && !utilities.validateEmail(email)) {
        throw new Error('Invalid email id was supplied.');
    }

    const userData = {username};

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const timestamp = utilities.getISOTimestamp();
    const userId = utilities.generateUUID();

    if (fullname) {
        userData.fullname = fullname.trim();
    }
    if (email) {
        userData.email = email.trim();
    }

    userData.userId = userId;
    userData.password = hashedPassword;
    userData.createdAt = timestamp;
    userData.updatedAt = timestamp;

    await database.client.collection(collections.USERS).insertOne(userData);
    return {
        message: 'Registeration successfull!'
    }
}