
function AnimateWave(id, padding, waveData) {
	this.elem = document.getElementById(id);
	if (!this.elem) throw new Error('element not found')
	this.waveData = waveData;
	this.timer = null;
	var _canvas = document.createElement('canvas');
	this.w = parseFloat(getComputedStyle(this.elem).width);
	this.h = parseFloat(getComputedStyle(this.elem).height);
	_canvas.width = this.w;
	_canvas.height = this.h;
	_canvas.style.position = 'absolute';
	_canvas.style.left = 0;
	_canvas.style.top = 0;
	_canvas.style.zIndex = -1;
	this.elem.style.position = 'relative';
	this.elem.appendChild(_canvas);
	this.ctx = _canvas.getContext('2d')
	this.waveWidth = _canvas.height - padding * 2;
	this.centerY = _canvas.height / 2;
	this.cacheOffset = 0;
	this.offset = 0
}



AnimateWave.prototype.start = function() {
	this.offset = this.cacheOffset;
	let self = this
	this.timer = setInterval(() => {
		// offset 为每帧绘制x轴偏移, 每帧绘制同一点的sin(x)值不同 来产生波纹动起来的效果
		this.offset++;
		if (this.offset > this.w) {
			this.offset = 0;
		}
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.waveData.forEach(wave => {
			wave = Object.assign({}, wave, {offset: this.offset + wave.offset})
			self.drawWave(wave)
		});

	}, 30)
}
AnimateWave.prototype.stop = function() {
	window.clearInterval(this.timer)
	this.timer = null;
	this.cacheOffset = this.offset
}

// offset: x值起偏移量, 每个波纹不同, 就有差异了
// fillStyle: 填充样式
// waveSize: 波纹起伏程度
// cycle: 多少个波纹周期(2π)
// speed: 每个波纹的速度

AnimateWave.prototype.drawWave = function(wave) {
	let {
		offset = this.random(1,300),
		fillStyle = `rgba(${this.random(0, 255)}, ${this.random(0,255)}, ${this.random(0, 255)}, ${Math.random()})`,
		waveSize = this.random(5, 30),
		cycle = this.random(1, 3),
		speed = this.random(1, 3)
	} = wave;
	offset *= speed
	this.ctx.beginPath();
	// 画上面部分
	this.ctx.moveTo(0, Math.sin(cycle * 2 * Math.PI / this.w * offset) * waveSize + 100);
	for (let x = 0; x <= this.w + 20; x += 20) {
		let yPosition = Math.sin(cycle * 2 * Math.PI / this.w * (x + offset)) * waveSize + ( this.centerY + this.waveWidth / 2)
		this.ctx.lineTo(x, yPosition)
	}
	// 画另一部分
	for (let x = this.w; x >= -20; x -= 20) {
		let yPosition = Math.cos(cycle * 2 * Math.PI / this.w * (x + offset)) * waveSize + ( this.centerY - this.waveWidth / 2)
		this.ctx.lineTo(x, yPosition)
	}

	this.ctx.closePath();
	this.ctx.fillStyle = fillStyle
	this.ctx.fill();
}

AnimateWave.prototype.random = function(min, max) {
	return ~~(Math.random() * (max - min) + min);
}