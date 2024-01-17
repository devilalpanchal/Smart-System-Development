const helpers = require('../../helpers');
const apiHandlers = require('../../business-logic');

const userController = module.exports;

userController.getLoggedInUser = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.user.getLoggedInUser(req));
};
