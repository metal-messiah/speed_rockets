const rocketRenderer = (x, y, rocketWidth, rocketHeight, accentColor) => {
	let triOriginY = y;
	// nose
	push();
	noStroke();
	triOriginY = y + 3;
	fill(color(accentColor));
	triangle(x, triOriginY, x + rocketWidth / 2, triOriginY - rocketHeight / 2, x + rocketWidth, triOriginY);
	pop();

	// body
	push();
	noStroke();
	fill(color(255));
	rect(x, y, rocketWidth, rocketHeight);
	pop();

	// fins
	push();
	noStroke();
	triOriginY = y + rocketHeight;
	fill(color(accentColor));
	triangle(x, triOriginY, x - rocketWidth / 2, triOriginY, x, triOriginY - rocketHeight / 2);
	triangle(
		x + rocketWidth,
		triOriginY,
		x + rocketWidth + rocketWidth / 2,
		triOriginY,
		x + rocketWidth,
		triOriginY - rocketHeight / 2
	);
	pop();
};

const tailRenderer = (x, y, rocketWidth, rocketHeight) => {
	push();
	const originY = y + rocketHeight;
	fill(color(random([ 'red', 'orange', 'yellow' ])));
	beginShape();
	vertex(x, originY);
	vertex(x - rocketWidth * 1.1, originY + rocketHeight / 4 + random(-1, 5));
	vertex(x + rocketWidth / 4, originY + rocketHeight / 8 + random(-1, 5));
	vertex(x + rocketWidth / 2, originY + rocketHeight / 2 + random(-1, 5));
	vertex(x + 3 * (rocketWidth / 4), originY + rocketHeight / 8 + random(-1, 5));
	vertex(x + rocketWidth + rocketWidth * 1.1, originY + rocketHeight / 4 + random(-1, 5));
	vertex(x + rocketWidth, originY);
	endShape(CLOSE);
	pop();
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
	text(`🌌 ${inventory.mines.toLocaleString()}`, 10, 50);

	text(`💣 ${inventory.bombs.toLocaleString()}`, 10, 75);

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
	${newHighScore ? `New High Score!` : ''}`,
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
