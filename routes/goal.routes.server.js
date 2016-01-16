var GoalRoutes = function(ctrl) {
	var express = require('express');
	var router = express.Router();

	/* API */
	router.route('/api/goals')
		.get(function(req,res) {
			return ctrl.getGoal(req,res);
		})
		.post(function(req,res) {
			return ctrl.addGoal(req,res);
		});

	return router;
}

module.exports = GoalRoutes;