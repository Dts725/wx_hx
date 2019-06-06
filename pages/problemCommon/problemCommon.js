// pages/problemCommon/problemCommon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientHeight: "",
    windowWidth : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let that = this
    // setTimeout(res => {
    //   wx.getSystemInfo({
    //     success(res) {
    //       that.setData({
    //         windowHeight: res.windowHeight
    //       })
    //     }
    //   })
    //   wx.createSelectorQuery().select('#problemScroll').boundingClientRect(res => {
    //     console.log(res)
    //     that.setData({
    //       clientHeight: that.data.windowHeight - res.top
    //     })
    //   }).exec()
    // },10)
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