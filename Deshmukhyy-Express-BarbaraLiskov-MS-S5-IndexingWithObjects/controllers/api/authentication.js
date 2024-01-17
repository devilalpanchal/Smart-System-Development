const passport = require('passport');
const helpers = require('../../helpers');
const apiHandlers = require('../../business-logic');

const authenticationController = module.exports;

authenticationController.registerUser = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.authentication.registerUser(req));
};

authenticationController.signInUser = async (req, res, next) => {
	passport.authenticate('local', async function (err, user, info) {
        if (err) {
            return helpers.formatApiResponse(401, res, new Error(err.message));
        }
        
		let {message} = info;
        req.logIn(user, async function(err) {
            if (err) { return next(err); }

            return helpers.formatApiResponse(200, res, {user, message});
        });
    })(req, res, next);
};

authenticationController.signOutUser = async function (req, res, next) {
	req.logOut((err) => {
		res.clearCookie('connect.sid');
		res.redirect('/');
	});
}