var Block = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = -height;
}

Block.prototype.render = function() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(this.x, this.y, this.width, this.height);
}