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