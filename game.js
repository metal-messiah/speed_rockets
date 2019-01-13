class Game {
	constructor() {
		this.fireworks = [];
		this.mines = [];
		this.stars = [];
		this.scoreTips = [];
		this.missTips = [];

		this.started = false;
		this.increased = false;

		this.limit = 1;

		this.missLimit = 5;
		this.hits = 0;
		this.total = 0;

		this.player = new Player();

		this.messages = [];
	}

	generateStars() {
		for (let i = 0; i < 100; i++) {
			this.stars.push(new Star(random(0, width), random(0, height), random(1, 2), random(3, 5), 5));
		}
	}

	isGameOver() {
		return this.total - this.hits >= this.missLimit;
	}

	increaseLimit() {
		this.limit++;
		this.increased = true;
	}

	mouseExplode() {
		this.fireworks.forEach((firework) => {
			if (firework.intersectsMouse()) {
				this.explode(firework);
			}
		});
	}

	explode(firework) {
		if (!firework.exploded) {
			firework.explode();
			this.hits += 1;
		}
	}

	setTotal(val) {
		this.total = val;
	}

	removeById(property, id) {
		this[property] = this[property].filter((item) => item.id != id);
	}

	addScoreTip(scoreTip) {
		game.scoreTips.push(scoreTip);
	}

	addMine(x, y) {
		this.mines.push(new GravityMine(x, y));
	}

	addMessage(message) {
		this.messages.push(new Message(width / 2, height / 2, message, 24));
	}

	generateFirework(mouseClicked) {
		// console.log(this.fireworks);
		if (this.fireworks.length < this.limit || mouseClicked) {
			const x = mouseClicked ? mouseX : random(width * 0.2, width - width * 0.2);
			const y = height;

			const firework = new Firework(x, y, 15 / this.limit + 15);

			this.fireworks.push(firework);
		}
		return;
	}

	render() {
		if (followRocket) {
			followRocket = null;
		}

		this.messages.forEach((message) => {
			message.draw();
			if (!message.shouldDestroy() && !message.destroyed) {
				message.grow();
			}
		});

		this.scoreTips.forEach((tip) => {
			tip.applyForce(gravity);
			tip.update();
			tip.draw();
		});

		this.missTips.forEach((tip) => {
			tip.applyForce(gravity);
			tip.update();
			tip.draw();
		});

		this.stars.forEach((star) => {
			star.draw();
		});

		canvas.canvas.getContext('2d').drawImage(earth, 0, -50, earth.width, earth.height);

		if (this.total % 10 === 0 && this.total && !this.increased) {
			this.increaseLimit();
		} else {
			// if (!this.fireworks.length) setTimeout(() => this.generateFirework(), random(0, 5000));

			this.generateFirework();

			this.fireworks.forEach((firework) => {
				this.mines.forEach((mine) => {
					const fwDistToMine = dist(firework.pos.x, firework.pos.y, mine.pos.x, mine.pos.y);
					if (fwDistToMine < mine.waveRadius) {
						const target = createVector(mine.pos.x, mine.pos.y);
						const seek = firework.seek(target);
						firework.applyForce(seek);
						firework.update();

						if (firework.intersectsTarget(mine)) {
							if (!firework.exploded) {
								mine.decreaseHealth();
								// console.log('decrease');
							}
							this.explode(firework);
						}
					}

					mine.draw();

					// mine.waves.forEach((wave) => {
					// 	if (wave.shouldReset(mine)) {
					// 		mine.waves = [];
					// 	} else {
					// 		// const target = createVector(mine.pos.x, mine.pos.y);
					// 		// const seek = wave.seek(target);
					// 		// wave.applyForce(seek);
					// 		// wave.update();
					// 		wave.draw();
					// 	}
					// });
				});

				const force = createVector(0, random(0, -0.05));
				firework.applyForce(force);
				firework.update();

				if (!firework.exploded) {
					firework.draw();
				} else {
					firework.particles.forEach((particle) => {
						particle.applyForce(gravity);
						particle.update();
						particle.draw();
					});
				}
			});
		}
	}
}
