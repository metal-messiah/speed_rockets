class Game {
	constructor() {
		this.rockets = [];
		this.mines = [];
		this.stars = [];
		this.scoreTips = [];
		this.missTips = [];
		this.bombs = [];

		this.started = false;
		this.increased = false;

		this.limit = 1;

		this.population = 7530000000;

		this.missLimit = 5;
		this.hits = 0;
		this.total = 0;

		this.mineLimit = 5000;
		this.bombLimit = this.mineLimit * 2;

		this.player = new Player();

		this.messages = [];
	}

	generateStars() {
		for (let i = 0; i < 100; i++) {
			this.stars.push(new Star(random(0, width), random(0, height), random(1, 2), random(3, 5), 5));
		}
	}

	getMisses() {
		return this.total - this.hits;
	}

	isGameOver() {
		// return this.getMisses() >= this.missLimit;
		return this.population <= 0;
	}

	decreasePopulation() {
		// kill 1billion people for each rocket
		this.population -= 1000000000;
		bg = 'red';
		setTimeout(() => {
			bg = 'black';
		}, 250);
	}

	increasePopulation() {
		// earth's daily net population increase
		this.population += 225000;
	}

	increaseLimit() {
		this.limit++;
		this.increased = true;
	}

	mouseExplode() {
		this.rockets.forEach((rocket) => {
			if (rocket.intersectsMouse()) {
				this.explode(rocket);
			}
		});
	}

	explode(rocket) {
		if (!rocket.exploded) {
			rocket.explode();
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
		this.player.inventory.mines--;
	}

	addBomb() {
		this.bombs.push(new Bomb());
		this.player.inventory.bombs--;
	}

	addMessage(message) {
		this.messages.push(new Message(width / 2, height / 2, message, 24));
	}

	generaterocket(mouseClicked) {
		// console.log(this.rockets);
		if (this.rockets.length < this.limit || mouseClicked) {
			const x = mouseClicked ? mouseX : random(width * 0.2, width - width * 0.2);
			const y = height;

			const rocket = new Rocket(x, y, 15 / this.limit + 15);

			this.rockets.push(rocket);
		}
		return;
	}

	render() {
		this.increasePopulation();

		if (followRocket) {
			followRocket = null;
		}

		this.messages.forEach((message, i) => {
			if (i === 0) {
				message.draw();
				if (!message.shouldDestroy() && !message.destroyed) {
					message.grow();
				}
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
			// if (!this.rockets.length) setTimeout(() => this.generaterocket(), random(0, 5000));

			this.generaterocket();

			this.rockets.forEach((rocket) => {
				this.mines.forEach((mine) => {
					const fwDistToMine = dist(rocket.pos.x, rocket.pos.y, mine.pos.x, mine.pos.y);
					if (fwDistToMine < mine.waveRadius) {
						const target = createVector(mine.pos.x, mine.pos.y);
						const seek = rocket.seek(target);
						rocket.applyForce(seek);
						rocket.update();

						if (rocket.intersectsTarget(mine)) {
							if (!rocket.exploded) {
								mine.decreaseHealth();
								// console.log('decrease');
							}
							this.explode(rocket);
						}
					}
					mine.draw();
				});

				this.bombs.forEach((bomb) => {
					bomb.draw();

					if (rocket.intersectsTarget(bomb)) {
						this.explode(rocket);
					}
				});

				const force = createVector(0, random(0, -0.05));
				rocket.applyForce(force);
				rocket.update();

				if (!rocket.exploded) {
					rocket.draw();
				} else {
					rocket.particles.forEach((particle) => {
						particle.applyForce(gravity);
						particle.update();
						particle.draw();
					});
				}
			});
		}
	}
}
