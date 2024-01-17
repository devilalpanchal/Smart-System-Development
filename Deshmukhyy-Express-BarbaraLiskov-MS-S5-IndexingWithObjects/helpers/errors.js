const errors = module.exports;

errors.generateHttpError = (statusCode, message) => {
	var payload = {
		status: {
			code: 'internal-server-error',
			message: 'A request processing error occurred unexpectedly.',
		},
		response: {},
	};

	switch (statusCode) {
		case 400:
			payload.status.code = 'bad-request';
			payload.status.message = message || 'There was an issue with the request payload you provided.';
			break;

		case 401:
			payload.status.code = 'not-authorised';
			payload.status.message = message || 'No valid login session was detected. Kindly log in and attempt again.';
			break;

		case 403:
			payload.status.code = 'forbidden';
			payload.status.message = message || 'You are not authorised to make this request call';
			break;

		case 404:
			payload.status.code = 'not-found';
			payload.status.message = message || 'API endpoint was not found on the server';
			break;

		case 500:
			payload.status.code = 'internal-server-error';
			payload.status.message = message || payload.status.message;
			break;
	}

	return payload;
};
