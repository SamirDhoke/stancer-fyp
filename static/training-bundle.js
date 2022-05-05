(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

},{"./helpers/pose-estimator":2,"file-saver":1}]},{},[3]);
