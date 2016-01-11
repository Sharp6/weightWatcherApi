var observationDA = function(Observation) {
	var getObservations = function() {
		return new Promise(function(resolve,reject) {
			Observation.find().exec(function(err,results) {
				if(err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	var addObservation = function(data) {
		return new Promise(function(resolve,reject) {
			var newObservation = new Observation({
				weight: data.weight,
				note: data.note,
				nonStandard: data.nonStandard
			});

			newObservation.save(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve();	
				}
			});
		});
	}

	return {
		getObservations: getObservations,
		addObservation: addObservation
	}
}

module.exports = observationDA;