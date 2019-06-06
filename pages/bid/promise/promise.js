// pages/bid/promise/promise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ""
  },

  signatureFn() {
    wx.navigateTo({
      url: '../signature/signature',
    })
  },
  getDate () {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    console.log(y, m, d)

    if(m<9) {
      m = '0'+(m+1);
    }  else {
      m = m+1;
    }
    if(d<9) {
      d = '0' + d;
    }
    return y+'年'+ m +'月'+ d +'日'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: this.getDate()
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