mousePressed = (evt) => {
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
};

keyPressed = (evt) => {
	const { key } = evt;
	if (key === ' ') {
		game.bombs.push(new Bomb());
	}
};

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
