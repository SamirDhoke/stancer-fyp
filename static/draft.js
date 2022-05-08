const posenet = require('./helpers/pose-estimator');
const classifier = require('./helpers/pose-classifier');
const fsm = require('./helpers/fsm');
const queue = require('./helpers/queue');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');
const feedbackWrapper = document.getElementById('feedback-wrapper');

const videoFileName = '/datasets/test/lunges_squats.mp4';

let video = null, isPlaying = false, isClassifierReady = false;;

const modelInfo = {
  model: 'datasets/trained_model/model.json',
  metadata: 'datasets/trained_model/model_meta.json',
  weights: 'datasets/trained_model/model.weights.bin',
};

let prevState = '';
let feedback = {};
let feedbackPoses = [];

function getIdealPoseOf(exercise, stage) {
	// search the DB of ideal poses and return the best match.
	return {};
}

function getFeedback(test, ideal) {
	return {}
}

function getFeedbackData(feedbackPoses) {
	const feedbackData = {};

	for (let i = 0; i < feedbackPoses.length; i ++) {
		// each exercise
		const exercise = feedbackPoses[i];
		
		for (let j = 0; j < exercise.poses.length; i ++) {
			// each pose of that exercise
			const testPose = exercise.poses[j];
			const idealPose = getIdealPoseOf(testPose.label, testPose.stage);

			if (feedbackData[testPose.label]) {
				feedbackData[testPose.label].push( getFeedback(testPose, idealPose) )
			} else {
				feedbackData[testPose.label] = [ getFeedback(testPose, idealPose) ]
			}

		}
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

	drawKeyPoints(pose, 'blue');
	drawSkeleton(pose, 'green');	
	
	// classify the pose

	let label, stage;
	const inputs = getKeypointsAsArray(pose.pose);
	const results = await classifier.classifyInput(inputs)

	// console.log(results);
	// separate label and stage from res;
	const classifiedPose = results[0];
	const poseName = classifiedPose.label.split('_');
	const poseScore = classifiedPose.confidence;
	
	label = poseName[0];
	stage = Number(poseName[1]);

	// console.log(label, stage, poseScore)

	if (poseScore <= 0.6) {
		return;
	}

	queue.append({
		label,
		stage,
		pose
	})

	if (fsm.state === 'IDLE') {
		fsm.dispatch('startExercise', [{ label, stage }])
	} else {
		fsm.dispatch('progressExercise', [{ label, stage }])
	}

	if (prevState === 'PROGRESSED' && fsm.state === 'IDLE') {
		// one rep is completed		
		if (feedback[label]) {
			feedback[label] += 1;
		} else {
			feedback[label] = 1;
		}

		feedbackPoses.push({
			exercise: label,
			poses: queue.queue
		});
	}

	prevState = fsm.state;
}

window.setup = function setup() {
	const cnv = createCanvas(height, width);
	cnv.parent(wrapper);
	background(0);

	frameRate(10)

	// load video file
	const vid = createVideo(videoFileName);
	vid.size(height, width);
	vid.volume(0);	
	vid.speed(0.5);
	vid.hide();
	video = vid;	

	window.addEventListener('keyup', handleKeyEvent);	

	classifier.load(modelInfo).then(function () {
		isClassifierReady = true;
	})
}

window.draw = function draw() {
	// noLoop()
	if (video && video.loadedmetadata && posenet.modelReady && isPlaying && isClassifierReady) {
		if (video.time() - video.duration() === 0) {
			isPlaying = false;
			provideFeedback();
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
function provideFeedback() {
	const exercises = Object.keys(feedback);

	for (let i = 0; i < exercises.length; i ++) {
		const exercise = exercises[i];
		// console.log('Performed', feedback[exercise], 'reps of', exercise);
		const p = createP(`Performed ${feedback[exercise]} reps of ${exercise}`);
		p.style('font-size', '16px');		
		p.parent('feedback-wrapper');
	}

	// const feedbackData = getFeedbackData(feedbackPoses);
	// console.log(feedbackPoses);
}

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
  	drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, color)   
  }
}