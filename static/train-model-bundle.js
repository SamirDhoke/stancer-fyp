(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let instance;

class PoseClassifier {
	constructor(options={}) {
		if (instance) {
			throw new Error('cannot create more than one instance of this class.');
		}

		this.addAndTrainModel = this.addAndTrainModel.bind(this);
		this.trainModel = this.trainModel.bind(this);
		this.addData = this.addData.bind(this);
		this.loadData = this.loadData.bind(this);
		this.saveData = this.saveData.bind(this);
		this.save = this.save.bind(this);
		this.load = this.load.bind(this);
		this.classifyInput = this.classifyInput.bind(this);

		this.model = ml5.neuralNetwork(options);		
	}

	addAndTrainModel(data, options) {	
		this.addData(data);

		return this.trainModel(options);
	}

	loadAndTrainModel(data, options) {	
		this.addData(data);

		return this.trainModel(options);
	}

	trainModel(options) {
		const inst = this;

		inst.model.normalizeData();		

		return new Promise(function(resolve, reject) {
			try {
				inst.model.train(options, resolve);
			}	catch (e) {
				reject(e);
			}
		});
	}

	addData(data) {
		for (let i = 0; i < data.length; i++) {
			let inputs = data[i].inputs;
			let output = data[i].output;

			this.model.addData(inputs, output);
		}
	}

	classifyInput(input) {
		const inst = this;

		return new Promise(function (resolve, reject) {
			inst.model.classify(input, function (error, result) {
				if (error) {
					reject(error);
				}
				resolve(result);
			})
		});
	}

	saveData(filename) {
		return this.model.saveData(filename);	
	}

	loadData(fileInput, cb) {
		return this.model.loadData(fileInput)
	}

	save(filename) {
		const inst = this;

		return new Promise(function (resolve, reject) {
			try {
				inst.model.save(resolve);
			}	catch(e) {
				reject(e);
			}
		})
	}

	load(input) {
		const inst = this;

		return new Promise(function (resolve, reject) {
			try {
				inst.model.load(input, resolve);
			}	catch(e) {
				reject(e);
			}
		})
	}

}

const net = new PoseClassifier({
	task: 'classification',
	inputs: 34,
  outputs:['label'],
	debug: true
});

instance = net;

module.exports = instance;
},{}],2:[function(require,module,exports){
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
},{"./helpers/pose-classifier":1}]},{},[2]);
