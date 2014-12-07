var Level = function() {
	this.maxFlocon = 25;
	this.maxBlock = 10;
	this.flocon = [];
	this.blocks = [(new Block(10, height, 2000, 100, 0))];
	this.player = new Player(this, 0, 0);
	this.txt = new Text(0);
	this.door = [new Door(2050, height - 200, false)];
}

Level.prototype.renderText = function() {
	var currentText = this.txt;
	var finish = (currentText.fadeout && currentText.duration == 0);
	if(this.txt.id == 0 && finish) {
		this.txt = new Text(1);
	} else {
		var random = Math.floor((Math.random() * 200) + 1);
		if(random < 5 && finish) {
			var textLength = this.txt.txt.length;
			var r = 1 + Math.floor((Math.random() * (textLength - 1)));
			this.txt = new Text(r);
		}
	}
	this.txt.render();
}

Level.prototype.render = function() {
	var gradient = ctx.createLinearGradient(0, 0, 0, height / 4);
	gradient.addColorStop(0, "#222222");
	gradient.addColorStop(1, "#333333");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);

	for(var i = 0; i < this.door.length; i++) {
		this.door[i].render();
	}

	for(var i = 0; i < this.blocks.length; i++) {
		this.blocks[i].render();
	}

	ctx.font = "20px Georgia";
	this.renderText();

	this.player.render();

	for (var i = 0; i < this.flocon.length; i++) {
		this.flocon[i].render();
	};
}

Level.prototype.addFlocon = function() {
	for (var i = this.flocon.length; i < this.maxFlocon; i++) {
		var randomX = 30 + Math.floor((Math.random() * (width - 30)) + 1);
		var randomY = 30 + Math.floor((Math.random() * 100) + 1);
		var duration = Math.floor((Math.random() * 30) + 1);
		this.flocon.push(new Particle("flocon.png", randomX, randomY, duration));
	}
}

Level.prototype.removeFlocon = function() {
	for(var i = 0; i < this.flocon.length; i++) {
		var posX = this.flocon[i].x + this.flocon[i].image.width;
		if(this.flocon[i].duration <= 0 || posX < 0) {
			this.flocon.splice(i, 1);
		}
	}
}

Level.prototype.addBlocks = function() {
	for(var i = this.blocks.length; i < this.maxBlock; i++) {
		var lastBlock = this.blocks[i - 1];
		var space = 100 + Math.floor((Math.random() * 100) + 1);
		var h = 64 + Math.floor((Math.random() * 32) + 1);
		var w = 500 + Math.floor((Math.random() * 128) + 1);
		this.blocks.push(new Block(lastBlock.x + space + lastBlock.width, height, w, h));
	}
}

Level.prototype.addDoor = function() {
	for(var i = this.door.length; i < 5; i++) {
		var lastDoor = this.door[i - 1];
		var space = 1000 + Math.floor((Math.random() * 1000) + 1);
		var y = 128 + Math.floor((Math.random() * 32) + 1);

		var laser = false;
		if(Math.random() <= 0.5) {
			laser = true;
		}

		this.door.push(new Door(lastDoor.x + space, height - y, laser));
	}
}

Level.prototype.removeBlocks = function() {
	for(var i = 0; i < this.blocks.length; i++) {
		if(this.blocks[i].x + this.blocks[i].width < 0) {
			this.blocks.splice(i, 1);
		}
	}
}

Level.prototype.removeDoor = function() {
	for(var i = 0; i < this.door.length; i++) {
		if(this.door[i].x + 5 < 0) {
			this.door.splice(i, 1);
		}
	}
}

Level.prototype.update = function(dt) {
	this.player.update(dt);
	this.txt.update(dt);

	this.removeFlocon();
	this.removeBlocks();
	this.removeDoor();

	if(this.door.length < 5) {
		this.addDoor();
	}

	if(this.flocon.length < this.maxFlocon) {
		this.addFlocon();
	}

	if(this.blocks.length < this.maxBlock) {
		this.addBlocks();
	}

	for (var i = 0; i < this.flocon.length; i++) {
		this.flocon[i].xd = this.flocon[i].xd - Math.sin(this.flocon[i].xd * dt - 5);
		this.flocon[i].yd = this.flocon[i].yd + 0.5;
		this.flocon[i].update(dt);
	};

	if(this.player.y > height + 50) {
		this.player.dead();
	}
}