// const posenet = require('./helpers/pose-estimator');
const classifier = require('./helpers/pose-classifier');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');
const modelInfo = {
  model: 'datasets/model.json',
  metadata: 'datasets/model_meta.json',
  weights: 'datasets/model.weights.bin',
};

async function handleTraining(data) {
	const dataset = data.dataset;
	console.log('model training started...');
	classifier.addData(dataset)
	classifier.trainModel({ epochs: 100 })
	.then(function () {
		return classifier.saveData(`classifier_${Date.now().toString()}`);
	})
	.then(function () {
		return classifier.save();
	})
	.then(function () {
		console.log('files saved.');
	})
	.catch(e => console.error(e));
}

window.setup = function setup() {
	// load json file
	// loadJSON(`/datasets/training_data.json`, handleTraining);
	classifier.load(modelInfo).then(() => console.log('model loaded!'))
}