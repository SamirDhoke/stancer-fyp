const posenet = require('./helpers/pose-estimator');
const classifier = require('./helpers/pose-classifier');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

const videoFileName = '/datasets/jumpingjack.g.21.mp4';

let video = null, isPlaying = false;

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

function handleKeyEvent(e) {
	const key = e.code.toLowerCase();
	if (key === 'keys') {
		if (isPlaying) {			
			video.pause();
		} else {
			video.play();
		}
		isPlaying = !isPlaying;
	}
}

async function drawKeypoints(res) {
	const pose = res[0];

	drawKeyPoints(pose, 'green');
	drawSkeleton(pose, 'red');	
	
	// classify the pose
	let label, stage;
	const inputs = getKeypointsAsArray(pose.pose);
	const res = classifier.classifyInput(inputs)

	// separate label and stage from res;

	if (fsm.state === 'IDLE') {
		fsm.dispatch('startExercise', [{ label, stage }])
	} else {
		fsm.dispatch('profressExercise', [{ label, stage }])
	}
}

window.setup = function setup() {
	const cnv = createCanvas(height, width);
	cnv.parent(wrapper);
	background(0);

	frameRate(6)

	// load video file
	const vid = createVideo(videoFileName);
	vid.size(height, width);
	vid.volume(0);	
	vid.speed(0.25);
	vid.hide();
	video = vid;	

	window.addEventListener('keyup', handleKeyEvent);	
}

window.draw = function draw() {
	noLoop()
	if (video && video.loadedmetadata && posenet.modelReady && isPlaying) {
		if (video.time() - video.duration() === 0) {
			isPlaying = false;
			noLoop();
		}
		const img = video.get();
		image(img, 0, 0);
		posenet.getKeypoints(img).then(drawKeypoints)
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