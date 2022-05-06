(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const posenet = require('./helpers/pose-estimator');
const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

const directories = {
	squat_1: ["datasets\\squats\\squat1.jpg", "datasets\\squats\\squat2.jpg"],
	squat_2: ["datasets\\squats\\squat2.jpg", "datasets\\squats\\squat4.jpg"],
	jumpingjack_1: [],
	jumpingjack_2: [],
	lunge_1: [],
	lunge_2: []
}

const labels = Object.keys(directories);

const dataset = [];

/*****************
OUTPUT FILE FORMAT

[
	{
		inputs: [23.34, 34.23, ... 23.24] | AN ARRAY OF 34 FLOATING POINT NUMBERS
		output: {
			label: 'EXERCISELABEL_EXERCISESTAGE'
		}
	},
	...
]
****************/

let label_index = 0;
let image_index = 0;

async function handleImageLoaded(img) {
	const poses = await posenet.getKeypoints(img);	
	const inputs = getKeypointsAsArray(poses[0].pose);	
	const output = {
		label: labels[label_index]
	}
	dataset.push({
		inputs,
		output
	});
	// drawKeyPoints(poses[0], 'red');
	// drawSkeleton(poses[0], 'green');
	image_index = image_index + 1;
}

function cleanup(save) {
	console.log('cleaning up...');
	save({
		dataset
	}, `${Date.now()}.json`)
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

		console.log('Training on', label);

		if (image_index >= directories[label].length) {
			label_index = label_index + 1;
			image_index = 0;
			return;
		}		
		
		loadImage(directories[label][image_index], handleImageLoaded);
	}
}

/********************
 HELPERS
 *******************/
function drawPointWithColor(x, y, size, fillColor='red', strokeColor=255) {
	stroke(strokeColor);
	fill(fillColor);
	circle(x, y, size);
}

function drawLineWithColor(x1, y1, x2, y2, strokeColor=255) {
	stroke(strokeColor);
  line(x1, y1, x2, y2);
}

function drawKeyPoints(p, color) {
	const pose = p.pose;

	for (let i = 0; i < pose.keypoints.length; i ++) {
		const keypoint = pose.keypoints[i];
		if (keypoint.score > 0.5) {
			drawPointWithColor(keypoint.position.x, keypoint.position.y, 10, color);
		}
	}

}

function drawSkeleton(p, color) {
  let skeleton = p.skeleton;
  // For every skeleton, loop through all body connections
  for (let j = 0; j < skeleton.length; j++) {
    let partA = skeleton[j][0];
    let partB = skeleton[j][1];
 		// drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, color)   
  	drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, 'red')   
  }
}

function getKeypointsAsArray(pose) {
	const inputs = [];

	for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    inputs.push(x);
    inputs.push(y);
  }

  return inputs;
}
},{"./helpers/pose-estimator":1}]},{},[2]);
