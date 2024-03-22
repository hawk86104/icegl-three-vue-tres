/* eslint-disable import/no-mutable-exports */
/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-22 09:39:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 11:02:51
 */
function rand (min, max) {
	return Math.random() * (max - min) + min
}

function randInt (min, max) {
	return Math.floor(min + Math.random() * (max - min + 1))
}

let width = 0
let height = 0
let ctx = null
const size = 30
let tick = 0
const lines = []
let lineSpeed = 10

class Line {
	constructor() {
		this.path = [];
		this.rspeed = rand(1, 2)
		this.count = randInt(10, 30);
		this.x = width / 2 + 1;
		this.y = height / 2 + 1;
		this.target = {
			x: width / 2,
			y: height / 2
		};
		this.dist = 0;
		this.angle = 0;
		this.hue = tick / 5;
		this.life = 1;
		this.updateAngle();
		this.updateDist();
	}

	step (i) {
		this.speed = this.rspeed * lineSpeed
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;

		this.updateDist();

		if (this.dist < this.speed) {
			this.x = this.target.x;
			this.y = this.target.y;
			this.changeTarget();
		}

		this.path.push({
			x: this.x,
			y: this.y
		});
		if (this.path.length > this.count) {
			this.path.shift();
		}

		this.life -= 0.001;

		if (this.life <= 0) {
			this.path = null;
			lines.splice(i, 1);
		}
	}

	updateDist () {
		const dx = this.target.x - this.x;
		const dy = this.target.y - this.y;
		this.dist = Math.sqrt(dx * dx + dy * dy);
	}

	updateAngle () {
		const dx = this.target.x - this.x;
		const dy = this.target.y - this.y;
		this.angle = Math.atan2(dy, dx);
	}

	changeTarget () {
		const randStart = randInt(0, 3);
		switch (randStart) {
			case 0: // up
				this.target.y = this.y - size;
				break;
			case 1: // right
				this.target.x = this.x + size;
				break;
			case 2: // down
				this.target.y = this.y + size;
				break;
			case 3: // left
				this.target.x = this.x - size;
				break;
			default:
				break;
		}
		this.updateAngle();
	}

	draw () {
		ctx.beginPath();
		const rando = rand(0, 10);
		for (let j = 0, length = this.path.length; j < length; j++) {
			ctx[(j === 0) ? 'moveTo' : 'lineTo'](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
		}
		let hueTmp = this.hue;
		// hueTmp = 240;
		// ctx.strokeStyle = `hsla(${rand(hueTmp - 30, hueTmp)}, 80%, 55%, ${this.life / 3})`;
		hueTmp = 30
		ctx.strokeStyle = `hsla(${rand(hueTmp - 30, hueTmp)}, 0%, 80%, ${this.life / 3})`
		ctx.lineWidth = rand(0.1, 2);
		ctx.stroke();
	}
}

const intLightningPattern = (w, h, c, s) => {
	width = w
	height = h
	ctx = c
	tick = 0
	lineSpeed = s

	for (let index = 0; index < 10; index++) {
		lines.push(new Line())
	}
}
const setSpeed = (s) => {
	lineSpeed = s
}

function create () {
	if (tick % 10 === 0) {
		lines.push(new Line())
	}
}
function step () {
	let i = lines.length
	while (i--) {
		lines[i].step(i)
	}
}
function clear () {
	ctx.globalCompositeOperation = 'destination-out'
	ctx.fillStyle = 'hsla(0, 0%, 10%, 0.1)'
	ctx.fillRect(0, 0, width, height)
	ctx.globalCompositeOperation = 'lighter'
}
function draw () {
	ctx.save()
	ctx.translate(width / 2, height / 2)
	// ctx.rotate(tick * 0.001)
	// const scale = 1.2 + Math.cos(tick * 0.02) * 0.2
	// ctx.scale(scale, scale)
	ctx.translate(-width / 2, -height / 2)
	let i = lines.length
	while (i--) {
		lines[i].draw(i)
	}
	ctx.restore()
}
const loopLightningPattern = () => {
	create()
	step()
	clear()
	draw()
	tick++
}

export {
	Line, width, height, size, tick, lines, ctx, intLightningPattern, loopLightningPattern, setSpeed
}