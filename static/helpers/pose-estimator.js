let instance = null;

class PoseEstimator {
	constructor(options={}) {
		if (instance) {
			throw new Error('only one object can be created.');
		}
		
		this.onModelReady = this.onModelReady.bind(this);
		this.getKeypoints = this.getKeypoints.bind(this);

		this.modelReady = false;
		this.net = ml5.poseNet(options, this.onModelReady);				
	}

	onModelReady(err, model) {
		this.modelReady = true;
	}

	getKeypoints(input) {
		const inst = this;

		return new Promise(function(resolve, reject) {
			
			if (!inst.modelReady) {
				reject(new Error('Model is not ready yet !'))
			}
			console.log('starting process on input...')
			inst.net.singlePose(input, resolve)	
		})
	}

	getInstance() {
		return this;
	}
}

const posenet = new PoseEstimator({
	detectionType: 'single'
});

instance = posenet;

module.exports = instance;