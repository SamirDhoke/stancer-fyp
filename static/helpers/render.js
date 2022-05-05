const cnvWrapper = document.getElementById('cnv-wrapper');

let poseSkeleton, poseImage, color = 'green';

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

window.setup = function setup() {
	const cnv = createCanvas(400, 400);
	cnv.parent(cnvWrapper);
	cnv.background(0);
}

window.draw = function draw() {	
	if (!poseSkeleton && !poseImage) {
		return;
	}

	// if (poseImage) {		
	// 	loadImage(poseImage, function (img) {
	// 		image(img, 0, 0);
	// 		setTimeout(function () {
	// 			poseImage = null;
	// 		}, 400)	
	// 	});		
	// }

	if (poseSkeleton) {

		background(0)

		drawKeyPoints(poseSkeleton, color)
		drawSkeleton(poseSkeleton, 255)
		setTimeout(function () {
			// poseSkeleton = null;	
		}, 500)		
	}
}

function drawImage(path) {
	poseImage = path;
}

function drawPose(skeleton, givenColor='green') {
	poseSkeleton = skeleton;
	color = givenColor;
}

module.exports = {
	drawImage,
	drawPose
}