var ObservationRoutes = function(ctrl) {
	var express = require('express');
	var router = express.Router();

	/* API */
	router.route('/api/observations')
		.get(function(req,res) {
			return ctrl.getObservations(req,res);
		})
		.post(function(req,res) {
			return ctrl.addObservation(req,res);
		});

	return router;
}

module.exports = ObservationRoutes;