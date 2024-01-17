const helpers = require('../helpers');

const middlewares = module.exports;

middlewares.user = require('./user');

middlewares.checkRequired = function (fields, req, res, next) {
    const {body} = req;
	// Used in API calls to ensure that necessary parameters/data values are present
	const missing = fields.filter(field => !body.hasOwnProperty(field));

	if (!missing.length) {
		return next();
	}

    helpers.formatApiResponse(400, res, new Error('Required parameters were missing from this API call: ' + missing.join(', ')));
};