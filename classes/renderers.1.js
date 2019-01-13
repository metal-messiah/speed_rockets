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
	// const { x, y } = this.pos;
	// smoke

	// for (let i = 1; i <= 50; i++) {
	// 	push();
	// 	const c = color(random([ 'white', 'yellow' ]));
	// 	fill(c);
	// 	noStroke();
	// 	ellipse(x + random(0, this.radius / 2), y + i * 6, 1);
	// 	pop();
	// }

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
