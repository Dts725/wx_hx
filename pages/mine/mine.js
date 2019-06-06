// pages/mine/mine.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // icon: base64.icon20
    name:'Anny'
  },
  ziliao(){
    wx.navigateTo({
      url: '../myData/myData',
    })
  },
  shezhi(){
    wx.navigateTo({
      url: '../shezhi/shezhi',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   name: app.globalData.userInfo.nickName
    // })
    // setTimeout(()=>{
    //      this.setData({
    //   name: app.globalData.userInfo.nickName
    // })
    // },500)
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