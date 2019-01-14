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

preload = () => {
	earth = new Image(600, 125);
	earth.src = './assets/earth.png';
};

setup = () => {
	canvas = createCanvas(600, 400);
	gravity = createVector(0, 0.1);

	game = new Game();
	game.generateStars();

	followRocket = new FollowRocket();
};

reset = () => {
	// console.log('RESET!');
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
				background('#000');

				game.render();
			} else {
				showGameOver();
			}

			showScore();
			showInventory();
		} else {
			showStartScreen();
		}
	} else {
		showStartScreen();
	}
};

const getRandomColor = () => {
	return color(random(50, 255), random(50, 255), random(100, 255));
};

const rocketSeeksMouse = () => {
	const mouse = createVector(mouseX, mouseY);
	const seek = followRocket.arrive(mouse);
	followRocket.applyForce(seek);
	followRocket.update();
	followRocket.draw();
};
