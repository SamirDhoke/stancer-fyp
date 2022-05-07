(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const posenet = require('./helpers/pose-estimator');
const directories = require('./helpers/ideal_dataset_map');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

const labels = Object.keys(directories);

const dataset = [];

/*****************
OUTPUT FILE FORMAT

[
	{
		label: EXERCISE_LABEL,
		stage: EXERCISE_STAGE,
		pose: OUTPUT_OF_POSENET
	},
	...
]
****************/

let label_index = 0;
let image_index = 0;

async function handleImageLoaded(img) {
	img.resize(400, 400);

	const poses = await posenet.getKeypoints(img);	
	const pose = poses[0];
	const label = labels[label_index];

	const [name, stage] = label.split('_');

	dataset.push({
		label: name,
		stage: Number(stage),
		pose
	});
	
	image_index = image_index + 1;
}

function cleanup(save) {
	console.log('cleaning up...');
	save({
		dataset
	}, `IDEAL_POSES_${Date.now()}.json`)
}

window.setup = function setup() {
	const cnv = createCanvas(height, width);
	cnv.parent(wrapper);
	background(0);

	frameRate(1);
}

window.draw = function draw() {
	// noLoop()
	if (posenet.modelReady) {
		// creating a file with format mentioned above		

		if (label_index >= labels.length) {
			cleanup(save);
			noLoop();
			return;
		}

		const label = labels[label_index];

		console.log('COLLECTING', label);

		if (image_index >= directories[label].length) {
		// if (image_index >= 5) {
			label_index = label_index + 1;
			image_index = 0;
			return;
		}		
		// background(0);
		loadImage(directories[label][image_index], handleImageLoaded);
	}
}
},{"./helpers/ideal_dataset_map":2,"./helpers/pose-estimator":3}],2:[function(require,module,exports){
const map = {
	jacks_1: [
		"datasets\\ideal\\jacks-1\\vlcsnap-2022-05-05-20h20m30s336.png",
		"datasets\\ideal\\jacks-1\\vlcsnap-2022-05-05-20h31m06s160.png",
		"datasets\\ideal\\jacks-1\\vlcsnap-2022-05-05-20h42m11s419.png"
	],
	jacks_2: [		
		"datasets\\ideal\\jacks-2\\vlcsnap-2022-05-05-20h14m07s526.png",
		"datasets\\ideal\\jacks-2\\vlcsnap-2022-05-05-20h14m11s030.png",
		"datasets\\ideal\\jacks-2\\vlcsnap-2022-05-05-20h20m24s866.png",
		"datasets\\ideal\\jacks-2\\vlcsnap-2022-05-05-20h30m57s983.png",
		"datasets\\ideal\\jacks-2\\vlcsnap-2022-05-05-20h41m40s662.png"
	],
	lunges_1: [		
		"datasets\\ideal\\lunges-1\\vlcsnap-2022-05-05-21h05m59s979.png",
		"datasets\\ideal\\lunges-1\\vlcsnap-2022-05-05-21h06m30s931.png",
		"datasets\\ideal\\lunges-1\\vlcsnap-2022-05-05-21h19m53s836.png",
		"datasets\\ideal\\lunges-1\\vlcsnap-2022-05-05-21h30m11s602.png",
		"datasets\\ideal\\lunges-1\\vlcsnap-2022-05-05-21h31m07s726.png"
		
	],
	lunges_2: [		
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h05m37s230.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h06m34s468.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h08m09s852.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h15m55s694.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h21m37s767.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h23m53s908.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h25m49s018.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h27m47s885.png",
		"datasets\\ideal\\lunges-2\\vlcsnap-2022-05-05-21h30m00s711.png"
	],
	squats_1: [		
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-21h56m12s457.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h00m06s144.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h03m04s614.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h06m06s393.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h06m40s479.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h06m55s248.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h07m18s860.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h08m26s208.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h08m39s777.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h08m58s295.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h09m46s490.png",
		"datasets\\ideal\\squats-1\\vlcsnap-2022-05-05-22h09m56s792.png"
	],
	squats_2: [
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-21h55m43s044.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-21h58m58s851.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-21h59m51s720.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h00m24s540.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h01m10s710.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h02m57s200.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h06m00s263.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h06m45s622.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h07m35s751.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h08m12s282.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h08m51s375.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h10m04s708.png",
		"datasets\\ideal\\squats-2\\vlcsnap-2022-05-05-22h10m19s646.png"
	]
}

module.exports = map;
},{}],3:[function(require,module,exports){
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
			inst.net.singlePose(input, resolve)	
		})
	}

	getInstance() {
		return this;
	}
}

const posenet = new PoseEstimator({
	detectionType: 'single',
	architecture: 'ResNet50'
});

instance = posenet;

module.exports = instance;
},{}]},{},[1]);
