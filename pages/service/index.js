Page({
  data: {
    list: [100, 221, 223, 253, 99, 99, 99, 99],
    list2: [359, 421, 423, 453, 199, 199, 199, 199]
  },
  onLoad: function (options) {
    let that = this;
    const ctx = wx.createCanvasContext('firstCanvas')
    this.drawCharts(ctx, this.data.list);
   
  },

  drawCharts: function (ctx, list) {
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop(0, 'magenta');
    gradient.addColorStop(0.5, 'blue');
    gradient.addColorStop(1.0, 'red');

    ctx.beginPath()
    ctx.setStrokeStyle(gradient)
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    ctx.setLineWidth(10)

    var that = this;
    const leftTopX = this.getEleWidth(77)
    const leftBottomY = this.getEleWidth(590)
    const yHeight = this.getEleWidth(444)
    const xWidth = this.getEleWidth(588)

    for (var i = 0; i < list.length; i++) {
      var height = list[i];
      var x = leftTopX + (xWidth / list.length) * i
      var y = leftBottomY - (yHeight / 250) * height

      if (i == 0) {
        ctx.moveTo(x, y)

      } else {
        ctx.lineTo(x, y)

      }
    }

    ctx.stroke()
    ctx.draw(true)
  },
  //为了获取按钮的宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },



})