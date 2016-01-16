var goalCtrl = function(da) {
	var getGoal = function(req,res) {
		da.getGoals()
			.then(function(goals) {
				res.json(goals[goals.length - 1]);
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	var addGoal = function(req,res) {
		var data = req.body;
		da.addGoal(data)
			.then(function(result) {
				res.json("Goal added.");
			})
			.catch(function(err) {
				res.status(500).send(err);
			});
	}

	return {
		getGoal: getGoal,
		addGoal: addGoal
	}
}

module.exports = goalCtrl;