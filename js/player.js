var Player = function(level, x, y) {
	this.level = level;
	this.x = x;
	this.y = y;
	this.sprite = new Image();
	this.sprite.src = "../img/spik_sprite.png";
	this.frame = 0;
	this.frameDuration = 10;
	this.width = 32;
	this.height = 32;
	this.jump = false;
	this.velocity = {x: 0, y: 0};
	this.run = [];
	this.score = 0;
}

Player.prototype.dead = function() {
	music[2].play();
	this.x = 0;
	this.y = 0;
	this.run = [];
	this.velocity.x = 0;
	this.velocity.y = 0;
	this.score = 0;

	this.level.blocks = [(new Block(10, height, 2000, 100))];
	this.level.door = [new Door(2050, height - 200, false)];
};

Player.prototype.renderParticle = function() {
	for(i = 0; i < this.run.length; i++) {
		this.run[i].render();
	}
};

Player.prototype.renderScore = function() {
	ctx.fillText(this.score, 30, 30);
};

Player.prototype.render = function() {
	this.renderParticle();
	this.renderScore();
	ctx.drawImage(this.sprite, this.frame, 0, 32, 44, this.x, this.y - this.sprite.height / 4, 32, 44);
}

Player.prototype.removeParticle = function() {
	for(i = 0; i < this.run.length; i++) {
		if(this.run[i].duration <= 0) {
			this.run.splice(i, 1);
		}
	}
};

Player.prototype.collisionBlock = function() {
	var gravity = 0.1;
	for(var i = 0; i < this.level.blocks.length; i++) {
		var collisionY = this.level.blocks[i].height + height - this.height;
		var xDeb = this.level.blocks[i].x;
		var xFin =  this.level.blocks[i].width + this.level.blocks[i].x;
		if (this.y >= collisionY && this.y - this.height / 2 < collisionY && this.x <= xFin && this.x + this.width >= xDeb) {
			this.velocity.y = 0;
			this.y = collisionY;
			this.jump = false;
			this.score += 1;
			if(this.run.length < 100) {
				this.run.push(new Particle("run.png", this.x, this.y + 32 - Math.floor(Math.random() * 3), 5 + Math.floor(Math.random() * 2)));
			}
		} else {
			if(this.velocity.y < 30) {
				this.velocity.y = (this.velocity.y + gravity);
			}
		}
	}
};

Player.prototype.collisionDoor = function() {
	for(var i = 0; i < this.level.door.length; i++) {
		var collisionY = this.level.door[i].y;
		var collisionX = this.level.door[i].x;
		if(this.x <= collisionX && this.x + this.width >= collisionX && this.y <= collisionY) {
			this.level.door[i].isTouch = true;
			if(this.level.door[i].laser) {
				this.dead();
			} else {
				music[3].play()
				this.score += 100;
			}
		}
	}
};

Player.prototype.update = function(dt) {
	this.removeParticle();

	for(var i = 0; i < this.run.length; i++) {
		this.run[i].x = this.x;
		this.run[i].xd = this.run[i].xd - 10 - (Math.random() * 2);
		this.run[i].yd = this.run[i].yd - (Math.random() * 2);

		this.run[i].update(dt);
	}


	this.collisionBlock();
	this.collisionDoor();

	if(input.isDown("SPACE") && !this.jump) {
		this.jump = true;
		this.velocity.y = this.velocity.y - 15;
		music[1].play();
	}

	if(this.velocity.x < 16) {
		this.velocity.x += 0.1;
	}

	if(this.x + this.width / 2 >= width / 2) {
		this.velocity.x = 0
		for(var i = 0; i < this.level.blocks.length; i++) {
			this.level.blocks[i].x = this.level.blocks[i].x - this.x / 64;
		}
		for(var i = 0; i < this.level.door.length; i++) {
			this.level.door[i].x = this.level.door[i].x - this.x / 64;
		}
	}

	if(this.frameDuration == 0) {
		this.frame = (this.frame + 32) % (32 * 3);
		this.frameDuration = 10;
	}

	this.frameDuration -= 1;

	this.x = this.x + this.velocity.x;
	this.y = this.y + this.velocity.y;
}