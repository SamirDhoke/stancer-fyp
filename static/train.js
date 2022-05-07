const posenet = require('./helpers/pose-estimator');
const directories = require('./helpers/dataset_map');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

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
	img.resize(400, 400);

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
		// if (image_index >= 5) {
			label_index = label_index + 1;
			image_index = 0;
			return;
		}		
		// background(0);
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