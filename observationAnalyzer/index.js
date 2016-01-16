var analyzer = function(goalCtrl, observationDA, moment, utils) {
	var addUpDown = function(observations) {
		return new Promise(function(resolve, reject) {
			var augmentedObservations = observations.map(function(observation,i,arr) {
				if(i > 0) {
					if(observation.weight > arr[i-1].weight) {
						observation.upDown = "up";
					} else if(observation.weight < arr[i-1].weight) {
						observation.upDown = "down";
					} else {
						observation.upDown = "same";
					}
				} else {
					observation.upDown = "N/A";
				}

				return observation;
			});
			resolve(augmentedObservations);
		});
	}

	var addInGoalScope = function(observations) {
		return goalCtrl.getGoals()
			.then(function(goals) {
				return {
					goalWeight: goals[goals.length - 1].goalWeight,
					goalDate: goals[goals.length - 1].goalDate,
					resolutionDate: goals[goals.length - 1].resolutionDate
				}
			})
			.then(function(goal) {
				return new Promise(function(resolve,reject) {
					searchObservationClosestByDate(goal.resolutionDate)
						.then(function(observation) {
							goal.resolutionWeight = observation.weight;
							resolve(goal);
						})
						.catch(function(err) {
							reject(err);
						});	
				});
			})
			.then(function(goal) {
				var totalTime = moment(goal.goalDate).unix() - moment(goal.resolutionDate).unix();
				var totalWeight = goal.goalWeight - goal.resolutionWeight;
				var augmentedObservations = observations.map(function(observation) {
					var alongFactor = (moment(observation.observedDate).unix() - moment(goal.resolutionDate).unix()) / totalTime;
					var intermediateGoalWeightRelative = alongFactor * totalWeight;
					var intermediateGoalWeight = goal.resolutionWeight + intermediateGoalWeightRelative;
					observation.intermediateGoalWeight = intermediateGoalWeight;
					observation.inGoalScope = observation.weight <  intermediateGoalWeight;
					return observation;
				});
				return augmentedObservations;
			});
	}

	var searchObservationClosestByDate = function(date) {
		return observationDA.getObservations()
			.then(utils.convertToJsObjects)
			.then(function(observations) {
				var targetDate = moment(date);
				return observations.map(function(observation) {
					observation.timeFromDate = Math.abs(targetDate.unix() - moment(observation.observedDate).unix());
					return observation;
				});
			})
			.then(function(observations) {
				return observations.sort(function(a,b) {
					if(a.timeFromDate < b.timeFromDate) {
						return -1;
					} else if(a.timeFromDate > b.timeFromDate) {
						return 1;
					} else {
						return 0;
					}
				});
			})
			.then(function(observations) {
				return observations[0];
			});
	}

	return {
		addUpDown: addUpDown,
		addInGoalScope: addInGoalScope,
		searchObservationClosestByDate: searchObservationClosestByDate
	}
}

module.exports = analyzer;