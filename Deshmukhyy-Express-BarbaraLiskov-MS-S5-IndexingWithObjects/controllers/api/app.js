const helpers = require('../../helpers');
const apiHandlers = require('../../business-logic');

const appController = module.exports;

appController.create = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.app.create.logic(req));
};

appController.read = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.app.read.logic(req));
};

appController.update = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.app.update.logic(req));
};