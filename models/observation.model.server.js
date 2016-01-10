var Observation = function(mongoose) {
	var observationSchema = new mongoose.Schema({
		weight: Number, 
		observedDate: { type: Date, default: Date.now },
		note: String,
		nonStandard: boolean
	});

	var model = mongoose.model('Observation', observationSchema);
	return model;
}

module.exports = Observation;