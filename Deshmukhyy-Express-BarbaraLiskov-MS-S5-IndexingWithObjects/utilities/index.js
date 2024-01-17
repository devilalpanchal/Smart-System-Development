const uuid = require('uuid');

const utiities = module.exports;

utiities.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

utiities.generateUUID = function () {
  const options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  };

  return uuid.v1(options);
}

utiities.getISOTimestamp = function () {
  return new Date().toISOString();
}

utiities.paginate = (url, data, count, limit, page) => {
	url = utiities.updateQueryStringParameter(url, 'limit', limit);
	page = parseInt(page);

	var last_page = count ? Math.floor(count / limit) : 0;
	var first_page_url = utiities.updateQueryStringParameter(url, 'page', 0);
	var next_page_url = page === last_page ? null : utiities.updateQueryStringParameter(url, 'page', (page + 1));
	var prev_page_url = page === 0 ? null : utiities.updateQueryStringParameter(url, 'page', (page - 1));
	var last_page_url = utiities.updateQueryStringParameter(url, 'page', (Math.floor(count / limit)));

	return {
		data: data,
		// total: count,
		per_page: limit,
		current_page: page,
		first_page_url: first_page_url ? first_page_url.toString() : null,
		last_page_url: last_page_url ? last_page_url.toString() : null,
		next_page_url: next_page_url ? next_page_url.toString() : null,
		prev_page_url: prev_page_url ? prev_page_url.toString() : null,
		last_page: last_page,
		from: page * limit,
		to: page + 1,
	};
};


/**
 *
 * @date 14-02-2022
 * @function updateQueryStringParameter
 * @param {String} uri URL
 * @param {*} key
 * @param {*} value
 * @returns String
 */
utiities.updateQueryStringParameter = (uri, key, value) => {
	var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
	var separator = uri.indexOf('?') !== -1 ? '&' : '?';
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + '=' + value + '$2');
	}
	return uri + separator + key + '=' + value;
};

utiities.htmltoText = (html = "") => {
	if (!html) return "";
	let text = String(html);
	text = text.replace(/\n/gi, "");
	text = text.replace(/<style([\s\S]*?)<\/style>/gi, "");
	text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
	text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
	text = text.replace(/<\/div>/gi, "\n\n");
	text = text.replace(/<\/li>/gi, "\n");
	text = text.replace(/<li.*?>/gi, "  *  ");
	text = text.replace(/<\/ul>/gi, "\n\n");
	text = text.replace(/<\/p>/gi, "\n\n");
	text = text.replace(/<br\s*[\/]?>/gi, "\n");
	text = text.replace(/<[^>]+>/gi, "");
	text = text.replace(/^\s*/gim, "");
	text = text.replace(/ ,/gi, ",");
	text = text.replace(/ +/gi, " ");
	text = text.replace(/\n+/gi, "\n\n");
	text = text.replace(/&(nbsp|amp|quot|lt|gt);/g, "")
	return text;
}

/**
 * 
 * @author imshawan
 * @date 01-08-2022
 * @function popElement
 * @description Removes an element from the supplied array and returns the new array
 * @param {Array} array 
 * @param {String} element 
 * @returns Array, after removing the particular element
 */
utiities.popElement = (array, element) => {
	if (!array || !element) return;
	if (!Array.isArray(array)) {
		throw new Error(`Expected first parameter as an Array, got ${typeof array} instead`);
	}

	let index = array.indexOf(element);
    if (index > -1) { 
    	array.splice(index, 1); 
    }
	return array;
}

utiities.isValidAssetType = (type) => {
	let { validAssetTypes } = constants;
	return validAssetTypes.includes(type);
}

utiities.capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

utiities.sidebar = (menu=[], id, params, excluded=[]) => {
	menu = menu.filter((elem) => !excluded.includes(elem.id));
	
    menu = menu.map(function (item) {
        if (item.id == id) item = Object.assign(item, params);
		else delete item.classes;
        return item;
    })
    return menu;
}

utiities.getISOTimestamp = () => {
	return new Date(Date.now()).toISOString();
}

utiities.isValidEmail = (string) => {
	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return Boolean(string.match(validRegex));
}

/**
 * 
 * @date 10-05-2023
 * @author imshawan <hello@imshawan.dev>
 * @function isAValidUrl
 * @description Validates if a supplied string is a valid URL or not based on protocols supplied. Defaults are http and https
 * @param {string} url 
 * @param {Array<string>} protocols 
 * @returns {boolean}
 */

utiities.isAValidUrl = function isAValidUrl (url, protocols=['http', 'https']) {
    try {
        new URL(url);
        const parsed = parse(url);
        return protocols
            ? parsed.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};

utiities.filterObjectByKeys = function (object={}, keys=[]) {
	if (!keys) {
		keys = [];
	}
	if (!Array.isArray(keys)) {
		throw new Error('Keys must be an array');
	}
	var filtered = {};
	if (keys.length) {
		Object.keys(object).forEach(key => {
			if (keys.includes(key)) {
				filtered[key] = object[key]
			}
		});
	} else {
		filtered = object;
	}
	return filtered;
}