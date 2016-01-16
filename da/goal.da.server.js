var goalDA = function(Goal) {
	var getGoals = function() {
		return new Promise(function(resolve,reject) {
			Goal.find().exec(function(err,results) {
				if(err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	var addGoal = function(data) {
		console.log(data);
		return new Promise(function(resolve,reject) {
			var newGoal = new Goal({
				goalWeight: data.goalWeight,
				goalDate: data.goalDate
			});

			newGoal.save(function(err) {
				if(err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	return {
		getGoals: getGoals,
		addGoal: addGoal
	}
}

module.exports = goalDA;