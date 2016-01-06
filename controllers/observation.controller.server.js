var observationCtrl = function(da) {
	var getObservations = function(req,res) {
		da.getObservations()
			.then(function(observations) {
				res.json(observations);
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	var addObservation = function(req,res) {
		console.log(req.body);
		var data = req.body;
		da.addObservation(data)
			.then(function(result) {
				res.json("Observation added.");
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	return {
		getObservations: getObservations,
		addObservation: addObservation
	}
}

module.exports = observationCtrl;