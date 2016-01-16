var utils = function() {

	var convertToJsObjects = function(data) {
		return new Promise(function(resolve,reject) {
			var newData = data.map(function(datum) {
				return {
					_id: datum._id,
					weight: datum.weight,
					observedDate: datum.observedDate
				}
			});
			resolve(newData);
		});
	}

	var parseJSON = function(data) {
		return new Promise(function(resolve,reject) {
			console.log(data);
			resolve(JSON.parse(data));
		});
	}

	var stringify = function(data) {
		return new Promise(function(resolve,reject) {
			resolve(JSON.stringify(data));
		});
	}

	return {
		parseJSON: parseJSON,
		stringify: stringify,
		convertToJsObjects: convertToJsObjects
	}
}

module.exports = utils;