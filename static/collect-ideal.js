const posenet = require('./helpers/pose-estimator');
const directories = require('./helpers/ideal_dataset_map');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

const labels = Object.keys(directories);

const dataset = [];

/*****************
OUTPUT FILE FORMAT

[
	{
		label: EXERCISE_LABEL,
		stage: EXERCISE_STAGE,
		pose: OUTPUT_OF_POSENET
	},
	...
]
****************/

let label_index = 0;
let image_index = 0;

async function handleImageLoaded(img) {
	img.resize(400, 400);

	const poses = await posenet.getKeypoints(img);	
	const pose = poses[0];
	const label = labels[label_index];

	const [name, stage] = label.split('_');

	dataset.push({
		label: name,
		stage: Number(stage),
		pose
	});
	
	image_index = image_index + 1;
}

function cleanup(save) {
	console.log('cleaning up...');
	save({
		dataset
	}, `IDEAL_POSES_${Date.now()}.json`)
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

		console.log('COLLECTING', label);

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