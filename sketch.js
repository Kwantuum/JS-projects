var puck;
var ps = []; //particle system

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	puck = new Puck();
}

function draw() {
	background(0);
	puck.tick();
	for(let i = 0; i < ps.length; i++){
		ps[i].draw();
		ps[i].tick();
		if(ps[i].life <= 0)
			ps.splice(i, 1);
	}
	puck.draw();
}

function Puck() {
	this.x = width/2;
	this.y = height/2;
	this.r = height*0.015;
	this.xv = this.r; //pixels per frame
	this.yv = this.r;

	this.draw = function() {
		ellipseMode(CENTER);
		fill(255);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}

	this.tick = function() {
		this.x += this.xv;
		this.y += this.yv;
		if(this.x < this.r || this.x > width - this.r){
			let counter = random(3,15);
			for(let i = 0; i < counter; i++){
				let xv = 0.5*random(0, -this.xv);
				let yv = 0.5*random(-this.yv, this.yv);
				ps.push(new Particle(this.x, this.y, xv, yv));
			}
			this.xv *= -1;
		}
		if(this.y < this.r || this.y > height - this.r){
			let counter = random(7,15);
			for(let i = 0; i < counter; i++){
				let xv = 0.5*random(-this.xv, this.xv);
				let yv = 0.5*random(0, -this.yv);
				ps.push(new Particle(this.x, this.y, xv, yv));
			}
			this.yv *= -1;
		}
	}
}

function Particle(x,y,xv,yv) {
	this.x = x;
	this.xv = xv;
	this.y = y;
	this.yv = yv;
	this.gravity = 0.5;
	this.r = 3;
	this.life = 50;


	this.tick = function() {
		this.life--;
		this.x += this.xv;
		this.y += this.yv;
		this.yv += this.gravity;
	}

	this.draw = function(){
		ellipseMode(CENTER);
		fill(255,255,255, this.life*2);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}