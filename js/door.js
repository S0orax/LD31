var Door = function(x, y, laser) {
	this.x = x;
	this.y = y;
	this.laser = laser;
	this.height = -128;
	this.isTouch = false;
}

Door.prototype.render = function() {
	if(!this.isTouch) {
		if(this.laser) {
			ctx.fillStyle = "#330000";
		} else {
			ctx.fillStyle = "#222222";	
		}
		ctx.fillRect(this.x, this.y, 5, this.height);
	}
};