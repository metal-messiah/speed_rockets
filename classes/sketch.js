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

const showStartScreen = () => {
	push();
	background(0);

	textFont(font);
	textAlign(CENTER);

	fill(color('orange'));
	textSize(40);
	text('Speed Rockets', width / 2, height / 2);

	fill(color('orange'));
	rect(width / 2 - 100, height - 100, 200, 85);

	fill(0);
	textSize(24);
	text('New Game', width / 2, height - 50);

	rocketSeeksMouse();
	pop();
};

const rocketSeeksMouse = () => {
	const mouse = createVector(mouseX, mouseY);
	const seek = followRocket.arrive(mouse);
	followRocket.applyForce(seek);
	followRocket.update();
	followRocket.draw();
};

const showInventory = () => {
	let { inventory } = game.player;

	push();
	stroke(0);
	strokeWeight(2);

	fill(255);
	textFont(font);

	textAlign(LEFT);

	textSize(20);
	text(`Inventory`, 10, 25);

	textSize(16);
	text(`💣 ${inventory.mines.toLocaleString()}`, 10, 50);

	pop();
};

const showScore = () => {
	let { score, highscore } = game.player;
	let { total, hits, limit } = game;
	const misses = total - hits;

	push();
	stroke(0);
	strokeWeight(2);

	fill(255);

	textFont(font);
	textSize(20);

	textAlign(RIGHT);

	text(`Stage ${limit}`, width - 10, 25);

	textSize(16);
	text(`${hits} 💥`, width - 10, 50);

	fill(color('orange'));
	text(`${misses} ❌`, width - 10, 75);

	fill(255);
	text(`${score.toLocaleString()} ✴️`, width - 10, 100);

	text(`${highscore.toLocaleString()} 🏆`, width - 10, 125);

	pop();
};

const showStageScreen = () => {
	let { limit } = game;
	push();
	background('orange');

	fill(0);

	textFont(font);
	textSize(40);
	textAlign(CENTER, CENTER);
	text(`Stage ${limit}`, width / 2, height / 2);
	pop();

	noLoop();

	setTimeout(() => {
		shownStage = true;
		loop();
	}, 5000);
};

const showGameOver = () => {
	let newHighScore = false;
	if (game.player.highscore < game.player.score) {
		game.player.highscore = game.player.score;
		localStorage.setItem(game.player.highscoreKey, game.player.highscore);
		newHighScore = true;
	}

	push();
	background('red');

	fill(0);

	textFont(font);
	textSize(40);
	textAlign(CENTER, CENTER);
	text(
		`Game Over!
	Score: ${game.player.score.toLocaleString()}
	Highscore: ${game.player.highscore.toLocaleString()}
	${newHighScore ? text(`New High Score!`, width / 2, height / 2 + 100) : ''}`,
		width / 2,
		height / 2
	);

	fill(0);
	rect(width / 2 - 100, height - 100, 200, 100);

	fill(color('orange'));
	textSize(24);
	text('Click To Try Again', width / 2, height - 50);
	pop();
	noLoop();
};

function mousePressed(evt) {
	evt.preventDefault();

	if (game.started) {
		if (game.isGameOver()) {
			if (mouseIntersectsTryAgain()) {
				reset();
				// let c = confirm('Do you really want to restart?');
				// if (c) window.location.reload();
			}
		} else {
			if (evt.button === 2) {
				if (game.player.inventory.mines) {
					// console.log(game.player.inventory.mines);
					game.addMine(mouseX, mouseY);
					game.player.inventory.mines--;
				}
			} else {
				game.mouseExplode();
			}
		}
	} else {
		if (mouseIntersectsStart()) {
			game.started = true;
		}
	}
}

const mouseIntersectsTryAgain = () => {
	if (mouseX > width / 2 - 100) {
		if (mouseX < width / 2 + 100) {
			if (mouseY > height - 100) {
				if (mouseY < height) {
					return true;
				}
			}
		}
	}
	return false;
};

const mouseIntersectsStart = () => {
	if (mouseX > width / 2 - 100) {
		if (mouseX < width / 2 + 100) {
			if (mouseY > height - 100) {
				if (mouseY < height - 15) {
					return true;
				}
			}
		}
	}
	return false;
};
