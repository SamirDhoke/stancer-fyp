(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// const posenet = require('./helpers/pose-estimator');

// const height = 400, width = 400;
// const wrapper = document.getElementById('cnv-wrapper');

// const videoFileName = '/datasets/jumpingjack.g.21.mp4';

// let exercise = null, state = null, reps = 0;
// let poses = [], tempPoses = [];

// let video = null, isPlaying = false;

// const EXERCISE_STATE_MAP = {
// 	A: 3,
// 	B: 3,
// 	C: 3
// }

const machine = {
	exercise: null,
	stage: 0,
	state: 'IDLE',
	transitions: {
		IDLE: {
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				console.log("STARTED NEW EXERCISE", exercise.label);
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}
		},
		STARTED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (this.stage + 1 === exercise.stage) {
						console.log("PROGRSSED", exercise.label, "EXERCISE");
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
				console.log("STARTED NEW EXERCISE", exercise.label);
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}		
		},
		PROGRESSED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (exercise.stage === 1) {
						console.log("COMPLETED", exercise.label, "EXERCISE");
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
				console.log("STARTED NEW EXERCISE", exercise.label);
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

// function handleKeyEvent(e) {
// 	const key = e.code.toLowerCase();
// 	if (key === 'keys') {
// 		if (isPlaying) {			
// 			video.pause();
// 		} else {
// 			video.play();
// 		}
// 		isPlaying = !isPlaying;
// 	}
// }

// function handleSameExerciseDetection(detectedLabel, detectedState) {
// 	if ( state + 1 === detectedState ) {
// 		state = state + 1;		
// 	} else if ( EXERCISE_STATE_MAP[detectedLabel] - detectedState === 1 ) {
// 		exercise = null;
// 		state = 0;
// 		reps = reps + 1;
// 	} else {
// 		// do nothing
// 		return;
// 	}
// }

// function handleExerciseDetection(pose, result) {
// 	// get the exercise label
// 	// const result = 'A_1';
// 	const resultSplit = result.split('_');
// 	const detectedLabel = resultSplit[0];
// 	const detectedState = Number(resultSplit[1]);

// 	if ( !exercise ) {
// 		exercise = detectedLabel;
// 		state = detectedState;		
// 	} else if ( exercise === detectedLabel ) {
// 		handleSameExerciseDetection(detectedLabel, detectedState);
// 	} else {
// 		// some other exercise is being performed without completing previous
// 		reps = 0;
// 	}
// }

// function drawKeypoints(res) {
// 	const pose = res[0];

// 	drawKeyPoints(pose, 'green');
// 	drawSkeleton(pose, 'red');	
	
// 	// handleExerciseDetection(pose)
// }

// window.setup = function setup() {
// 	const cnv = createCanvas(height, width);
// 	cnv.parent(wrapper);
// 	background(0);

// 	frameRate(6)

// 	// load video file then
// 	const vid = createVideo(videoFileName);
// 	vid.size(height, width);
// 	vid.volume(0);
// 	// vid.defaultPlaybackRate = 0.05;
// 	// vid.playbackRate = 0.05;
// 	// vid.play();
// 	vid.speed(0.25);
// 	vid.hide();
// 	video = vid;	

// 	window.addEventListener('keyup', handleKeyEvent);	
// }

// window.draw = function draw() {
// 	noLoop()
// 	if (video && video.loadedmetadata && posenet.modelReady && isPlaying) {
// 		if (video.time() - video.duration() === 0) {
// 			isPlaying = false;
// 			noLoop();
// 		}
// 		const img = video.get();
// 		image(img, 0, 0);
// 		posenet.getKeypoints(img).then(drawKeypoints)
// 	}
// }

// /********************
//  HELPERS
//  *******************/
// function drawPointWithColor(x, y, size, fillColor='red', strokeColor=255) {
// 	stroke(strokeColor);
// 	fill(fillColor);
// 	circle(x, y, size);
// }

// function drawLineWithColor(x1, y1, x2, y2, strokeColor=255) {
// 	stroke(strokeColor);
//   line(x1, y1, x2, y2);
// }

// function drawKeyPoints(p, color) {
// 	const pose = p.pose;

// 	for (let i = 0; i < pose.keypoints.length; i ++) {
// 		const keypoint = pose.keypoints[i];
// 		if (keypoint.score > 0.5) {
// 			drawPointWithColor(keypoint.position.x, keypoint.position.y, 10, color);
// 		}
// 	}

// }

// function drawSkeleton(p, color) {
//   let skeleton = p.skeleton;
//   // For every skeleton, loop through all body connections
//   for (let j = 0; j < skeleton.length; j++) {
//     let partA = skeleton[j][0];
//     let partB = skeleton[j][1];
//  		// drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, color)   
//   	drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, 'red')   
//   }
// }

let system = Object.create(machine);
},{}]},{},[1]);
