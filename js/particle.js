var Particle = function(image, x, y, duration) {
	this.image = new Image();
	this.image.src = "./img/" + image;
	this.x = x;
	this.y = y;
	this.xd = 0;
	this.yd = 0;
	this.duration = duration;
	this.d = duration;
	this.alpha = 1;
}

Particle.prototype.render = function() {
	ctx.fillStyle = "#111111";
	if (this.duration > 0) {
		ctx.globalAlpha = this.duration / (this.alpha * this.d);
		this.alpha = ctx.globalAlpha;
		var cx = this.x + this.image.width / 2;
		var cy = this.y + this.image.height / 2;
		ctx.drawImage(this.image, this.x - this.image.width / 2 + this.xd, this.y - this.image.height / 2 + this.yd);
		ctx.globalAlpha = 1;
	}
}

Particle.prototype.update = function(dt) {
	this.duration = this.duration - 0.1;
}