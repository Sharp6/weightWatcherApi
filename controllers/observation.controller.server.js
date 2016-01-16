var observationCtrl = function(da, analyzer, utils) {
	var getObservations = function(req,res) {
		da.getObservations()
			.then(utils.convertToJsObjects)
			.then(analyzer.addUpDown)
			.then(analyzer.addInGoalScope)
			//.then(utils.stringify)
			.then(function(observations) {
				console.log(observations);
				res.json(observations);
			})
			.catch(function(err) {
				console.log(err);
				res.status(500).send(err);
			});
	}

	var addObservation = function(req,res) {
		var data = req.body;
		da.addObservation(data)
			.then(function(result) {
				res.json("Observation added.");
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	var searchObservationClosestByDate = function(req,res) {
		analyzer.searchObservationClosestByDate(req.params.date)
			.then(function(observation) {
				res.json(observation);		
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	return {
		getObservations: getObservations,
		addObservation: addObservation,
		searchObservationClosestByDate: searchObservationClosestByDate
	}
}

module.exports = observationCtrl;