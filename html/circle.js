//TODO: 
// 参数:

// randomColor:  false
// speed: 2
// ineterval: 50 条纹间隔

function CircleWave(id, options) {
  this.elem = document.getElementById(id);
  if (!this.elem) throw new Error('element not found')

  this.options = {
    speed: 2,
    color: [166, 0 ,166],
    interval: 50,
    offsetHeight: 1600,
    beginOpacity: 0.4,
    fadingSpeed: 1,
    color: [200,100, 200],
    ...options
  }

  this.timer = null
  this.data = []
  this.offset = 0

  var _canvas = document.createElement('canvas')
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
  // this.waveWidth = _canvas.height - padding * 2;
  // this.centerY = _canvas.height / 2;
  // this.cacheOffset = 0;
}

CircleWave.prototype.start = function () {
  this.timer = setInterval(function () {
    this.ctx.clearRect(0, 0, this.w, this.h)
    // 如果第一个透明度很小之后, 去掉第一个元素, push一个新元素
    this.data.forEach(item => {
      // 透明度--
      let alpha = item.opacity
      let color = `rgba(${item.color.toString()},${alpha})`
      this.ctx.fillStyle = color
      this.draw(item)
      item.opacity -= 0.0015 * this.options.fadingSpeed
      item.size += 1
    })

    // 根据透明度 pop 元素
    if (this.data.length > 0 && this.data[this.data.length - 1].opacity <= 0.005) {
      this.data.pop()
    }

    // 根据 间隔 添加元素
    if (this.data.length < 1 || this.data[0].size > this.w) {
      this.data.unshift(
        {
          x: this.w / 2,
          y: this.h + this.options.offsetHeight,
          size: this.w - this.options.interval,
          opacity: this.options.beginOpacity,
          color: this.options.color,
          // color: getRandomColor()
        }
      )
    }
  }.bind(this), 33.33)
}
CircleWave.prototype.stop = function () {
  clearInterval(this.timer)
  this.timer = null
}
CircleWave.prototype.draw = function ({ x, y, size }) {
  this.ctx.beginPath()
  this.ctx.moveTo(0, 600)
  this.ctx.arc(x, y, size, Math.PI, 0)
  this.ctx.closePath()
  this.ctx.fill()
}

// var offset = 0
// ctx = document.getElementById('circle').getContext('2d')
// var timer = null
// const data = []

// function drawCircle({ x, y, size }) {
//   ctx.beginPath()
//   ctx.moveTo(0, 600)
//   ctx.arc(x, y, size, Math.PI, 0)
//   ctx.closePath()
//   ctx.fill()
// }

// timer = setInterval(function () {
//   ctx.clearRect(0, 0, 800, 600)
//   // 如果第一个透明度很小之后, 去掉第一个元素, push一个新元素
//   data.forEach(item => {
//     // 透明度--
//     let alpha = item.opacity
//     let color = `rgba(${item.color.toString()},${alpha})`
//     ctx.fillStyle = color
//     drawCircle(item)
//     item.opacity -= 0.0015
//     item.size += 1
//   })

//   // 根据透明度 pop 元素
//   if (data.length > 0 && data[data.length - 1].opacity <= 0.005) {
//     data.pop()
//   }

//   // 根据 间隔 添加元素
//   if (data.length < 1 || data[0].size > 400) {
//     data.unshift(
//       {
//         x: 400,
//         y: 1000,
//         size: 350,
//         opacity: 0.3,
//         color: [166, 0, 166],
//         // color: getRandomColor()
//       }
//     )
//   }
// }, 33.33)


// function getRandomColor() {
//   var r = ~~(Math.random() * 255)
//   var g = ~~(Math.random() * 255)
//   var b = ~~(Math.random() * 255)
//   return [r, g, b]
// }