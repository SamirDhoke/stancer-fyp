const posenet = require('./helpers/pose-estimator');
const FileSaver = require('file-saver');

const cnvWrapper = document.getElementById('cnv-wrapper');

let video = null, poses = [], i = 0;

window.setup = function setup() {
	const cnv = createCanvas(400, 400);
	cnv.parent(cnvWrapper);

	const vid = createVideo("./datasets/jumpingjack.mp4");
	vid.size(400, 400);
	vid.volume(0);
	vid.play();
	// vid.loop();
	vid.hide();

	video = vid;
	// console.log(vid)

	frameRate(10)

	// const data = loadJSON('./datasets/poses.json', function () {
	// 	poses = data.poses;
	// });
	// console.log(data, data.poses)
}

window.draw = function draw() {
	// if (i < poses.length) {
	// 	background(220);
	// 	const pose = poses[i][0];

	// 	drawKeyPoints(pose, 'red')
	// 	drawSkeleton(pose, 'green')

	// 	i = i + 1

	// 	if (i === poses.length) {
	// 		i = 0;
	// 	}
	// }
	if (!video || !video.loadedmetadata || !posenet.modelReady) {
		return;
	}

	const img = video.get(0, 0, 400, 400);
	image(img, 0, 0)
	posenet.getKeypoints(img).then(res => {
		poses.push(res[0]);
		if (video.time() === video.duration()) {
			console.log(poses);
			video = null;
			noLoop();
		}
	})
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
  	drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, 'red')   
  }
}
