var Goal = function(mongoose) {
	var goalSchema = new mongoose.Schema({
		goalWeight: Number,
		goalDate: Date,
		resolutionDate: { type: Date, default: Date.now },
	});

	var model = mongoose.model('Goal', goalSchema);
	return model;
}

module.exports = Goal;