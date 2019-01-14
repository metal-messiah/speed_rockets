class Player {
	constructor() {
		this.inventory = { mines: 0 };
		this.hits = 0;
		this.score = 0;

		this.mineScore = 0;

		this.highscoreKey = 'rockets_highscore';
		this.highscore = Number(localStorage.getItem(this.highscoreKey));
		if (!this.highscore) {
			localStorage.setItem(this.highscoreKey, 0);
		}
	}

	updateScore(value) {
		this.score += value;
		this.mineScore += value;
		this.updateInventory();
	}

	getScore() {
		return this.score;
	}

	updateInventory() {
		if (this.mineScore / game.mineLimit > 1) {
			this.inventory.mines++;
			this.mineScore -= game.mineLimit;
			game.addMessage('Gravity Mine');
		}
	}
}
