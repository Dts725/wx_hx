// pages/myData/myData.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'张三',
    userIpone:'18321454210',
    userCard:'371452198204213345',
    userImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setTimeout(()=>{
    //   this.setData({
    //     username: app.globalData.userInfo.nickName
    //   })
    // },500)
    // this.setData({
    //   userImg: app.globalData.userInfo.avatarUrl
    // })
    
  },
  tx(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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