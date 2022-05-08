(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./helpers/fsm":2,"./helpers/pose-classifier":3,"./helpers/pose-estimator":4,"./helpers/queue":5}],2:[function(require,module,exports){
let instance = null;

const machine = {
	debug: false,
	exercise: null,
	stage: 0,
	state: 'IDLE',	
	transitions: {
		IDLE: {
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}				
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}
		},
		STARTED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (this.stage + 1 === exercise.stage) {
						if (this.debug) {
							console.log("PROGRSSED", exercise.label, "EXERCISE");
						}
						this.setState('PROGRESSED');
						this.stage = this.stage + 1;
					}
				} else {
					this.dispatch("startExercise", [exercise]);
				}
			},
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}		
		},
		PROGRESSED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (exercise.stage === 1) {
						if (this.debug) {
							console.log("COMPLETED", exercise.label, "EXERCISE");
						}
						this.setState('IDLE');
						this.stage = 0;
						this.exercise = null;
					}
				} else {
					this.dispatch("startExercise", [exercise]);
				}
			},
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}			
		}
	},
	dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    } else {
      //action is not valid for current state
    }
  },
  setState(newState) {    
    this.state = newState;
  }
}

if (!instance) {
	const system = Object.create(machine);
	instance = system;
}

module.exports = instance;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
const ThreeQueue = {
	queue: [],
	len: 0,
	append: function (item) {
		
		if (this.len >= 3) {
			this.pop();						
		}

		this.queue.push(item);
		this.len += 1;
	},
	pop: function () {
		const updatedQueue = this.queue.slice(1);
		this.queue = updatedQueue;
		this.len -= 1;
	}
}

module.exports = ThreeQueue;
},{}]},{},[1]);
