mousePressed = (evt) => {
	evt.preventDefault();

	if (game.started) {
		if (game.isGameOver()) {
			if (mouseIntersectsTryAgain()) {
				reset();
			}
		} else {
			if (evt.button === 2) {
				if (game.player.inventory.mines) {
					game.addMine(mouseX, mouseY);
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
		evt.preventDefault();
		if (game.player.inventory.bombs) {
			game.addBomb();
		}
	}
	if (key === 'i') {
		evt.preventDefault();
		game.player.inventoryFollowsMouse = !game.player.inventoryFollowsMouse;
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
