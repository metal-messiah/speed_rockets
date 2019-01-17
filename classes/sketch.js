let game;
let canvas;

let followRocket;

let gravity;
let earth;
let img;
let missedRed = false;

let lastExplosionSound;

let font = 'Staatliches';

let shownStage = false;

let galaxyShapes = [];

let bg = 'black';

fr = 0;

preload = () => {
	earth = new Image(windowWidth, 125);
	earth.src = './assets/earth.png';
};

setup = () => {
	generateCanvas();
	gravity = createVector(0, 0.1);

	game = new Game();
	game.generateStars();

	followRocket = new FollowRocket();
};

reset = () => {
	// console.log('RESET!');
	delete game;

	game = new Game();
	game.generateStars();

	followRocket = new FollowRocket();
	shownStage = false;
	loop();
};

draw = () => {
	if (game) {
		if (game.started) {
			if (!game.isGameOver()) {
				background(color(bg));

				galaxyRenderer();

				game.render();

				showEarthStats();
				showScore();
				showInventory();

				showSpecs();
			} else {
				showGameOver();
			}
		} else {
			showStartScreen();
		}
	} else {
		showStartScreen();
	}
};

const generateCanvas = () => {
	canvas = createCanvas(windowWidth, windowHeight * 0.75);
};

const getRandomColor = () => {
	return color(random(50, 255), random(50, 255), random(100, 255));
};

const rocketSeeksMouse = () => {
	let seek;
	if (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height) {
		const mouse = createVector(mouseX, mouseY);
		seek = followRocket.arrive(mouse);
	} else {
		const center = createVector(width / 2, height / 2 - 100);
		seek = followRocket.arrive(center);
	}
	followRocket.applyForce(seek);
	followRocket.update();
	followRocket.draw();
};
