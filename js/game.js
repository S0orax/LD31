var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
var width = window.innerWidth, height = window.innerHeight;
var music = document.getElementsByTagName("audio");

var level, player;

var init = function() {
	canvas.width = width;
	canvas.height = height;
	
	level = new Level();
	level.addBlocks();

	music[0].play();

	main();
}

var update = function(dt) {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	if(music[0].currentTime == music[0].duration) {
		music[0].currentTime = 0;
		music[0].play();
	}

	level.update(dt);
} 

var render = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);

	level.render();
}

var lastTime;
var main = function() {
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	update(dt);
	render();

	lastTime = now;
	requestAnimationFrame(main)
}

init();