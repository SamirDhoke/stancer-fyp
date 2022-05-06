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
},{}],2:[function(require,module,exports){
const posenet = require('./helpers/pose-estimator');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');
const group = 3, subgroup = 2;
const videoFilePrefix = 'jumpingjack.g';
const trainingDataFilePrefix = 'poses.g';
const isCollectingPose = true;

let video = null;
let poses = [], i = 0;

function generateFileName(prefix, group, subgroup) {
	return `${prefix}.${group}${subgroup}`;
}

window.setup = function setup() {
	const cnv = createCanvas(height, width);
	cnv.parent(wrapper);
	background(0);

	frameRate(20)

	if (isCollectingPose) {
		// load video file then
		const vid = createVideo(`/datasets/${generateFileName(videoFilePrefix, group, subgroup)}.mp4`);
		vid.size(height, width);
		vid.volume(0);
		vid.play();
		vid.hide();
		video = vid;
	} else {
		// load json file
		loadJSON(`/datasets/${generateFileName(trainingDataFilePrefix, group, subgroup)}.json`, function (data) {
			poses = data.poses;
		})
	}

}

window.draw = function draw() {
	if (isCollectingPose) {
		// perform video rendering and pose estimation
		if (!video || !video.loadedmetadata || !posenet.modelReady) {
			return;
		}		
		const img = video.get();
		image(img, 0, 0);
		posenet
			.getKeypoints(img)
			.then(function(result) {
				poses.push(result[0]);

				if (video.time() == video.duration()) {
					save({ poses }, `${generateFileName(trainingDataFilePrefix, group, subgroup)}.json`)
					noLoop();
				}				
			})
	} else {
		background(0);
		// perform rendering of pose only
		if (i < poses.length) {			
			const pose = poses[i];
			drawKeyPoints(pose, 'red');
			drawSkeleton(pose, 'green');

			i = i + 1;

			if (i >= poses.length) {
				i = 0;
			}

		}
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
},{"./helpers/pose-estimator":1}]},{},[2]);
