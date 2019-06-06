// pages/problemOnline /problemOnline .js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  cansle() {
    wx.previewImage({
      urls: ['http://file.shyunhua.com/partyfile/5c25a873c00bf__!1545967023.png'],
      current: 'http://file.shyunhua.com/partyfile/5c25a873c00bf__!1545967023.png',
      success : res => {
          console.log(res)
      }
    })
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