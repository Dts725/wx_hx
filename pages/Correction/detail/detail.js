// pages/bid/indx/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{
      name: "司法公正",
      id:'',
      view: true,
      child: [{
        item: '娱乐场所设施许可',
      },
      {
        item: '酒店设施',


      }
      ]
    }
    ]
  },


  viewInfoFn(e) {
    let index = e.target.dataset.index;
    let flag = true;
    if (this.data.data[index].view) {
      flag = false;
    }
    let item = 'data[' + index + '].view';
    this.setData({
      [item]: flag
    })
  },

  // 页面跳转

  routerFn() {
    if(this.data.id=='2'){
      wx.navigateTo({
        url: '../../index/guide',
      })
    }else{
      wx.navigateTo({
        url: '../../bid/bid',
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})