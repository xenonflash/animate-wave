var offset = 0
const COUNT = 10
ctx = document.getElementById('circle').getContext('2d')
var timer = null
const data = []
function drawCircle({
  x, y, size
}) {
  ctx.beginPath()
  ctx.moveTo(0, 600)
  ctx.arc(x, y, size, Math.PI, 0)
  ctx.closePath()
  ctx.fill()
}

timer = setInterval(function () {
  // if (offset > 200) offset = 0
  // offset++
  ctx.clearRect(0, 0, 800, 600)
  // 如果第一个透明度很小之后, 去掉第一个元素, push一个新元素
  data.forEach(item => {
    // 透明度--
    let alpha = item.opacity
    let color = `rgba(${item.color.toString()},${alpha})`
    ctx.fillStyle = color
    drawCircle(item)
    item.opacity -= 0.0015
    item.size += 2
  })
  
  if (data.length > 0 && data[data.length - 1].opacity <= 0.005) {
    data.pop()
  }
  if (data.length < 1 || data[0].size > 400){
    data.unshift(
      {
        x: 400,
        y: 1000,
        size: 350,
        opacity: 0.3,
        color: [166, 0, 166]
      }
    )
  }
}, 33.33)


function getRandomColor() {
  var r = ~~(Math.random() * 255)
  var g = ~~(Math.random() * 255)
  var b = ~~(Math.random() * 255)
  return [r, g, b]
}