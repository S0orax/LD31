var Text = function(id) {
	this.txt = [
		"Spik : by Sorax", "Space to jump", "Ludum Dare",
		"It's probably an alien", "SPAAAAAACE !!!", "Up, up, up, up",
		"1 + 1 + 1 = ... 1 ?", "The void... dangerous... I think",
		"Or maybe a pinguin...", "Just look at me !", "Run for your life",
		"Intersttelar is a very good film", "Don't blink", "Don't even blink",
		"Blink and you're dead", "Hello world", "Merry Christmas", "Merry Xmas",
		"Yeah, it's a game by a frog", "Paradox", "If it's your birthday, Happy Birthday",
		"Remember, remember, the 5th of November", "I have a dream... Eat chocolate",
		"I love chocolate", "Chuck Norris love this game", "Still alive", "The cake is a lie",
		"Hello, I'm the developper and I see you", "Falling skies", "Geronimo", "What ?!!!",
	];
	this.id = id;
	this.texte = this.txt[id];
	this.maxDuration = 50;
	this.duration = 0;
	this.alpha = 0;
	this.fadeout = false;
	this.d = 50;
}

Text.prototype.render = function() {
	if(this.fadeout) {
		ctx.globalAlpha = this.duration / (this.alpha * this.d);
	} else if (this.duration > 0) {
		ctx.globalAlpha = this.duration / this.maxDuration;
	}
	this.alpha = ctx.globalAlpha;
	if(this.duration > 0) {
		ctx.fillText(this.texte, width / 2, height / 2);
	}
	ctx.globalAlpha = 1;
}

Text.prototype.update = function(dt) {
	if(this.fadeout) {
		this.duration -= 1;
	} else if (this.duration < this.maxDuration) {
		this.duration += 1;
	} 

	if(this.duration >= this.maxDuration) {
		this.fadeout = true;
	}

	if(this.duration < 0) {
		this.duration = 0;
	}
};