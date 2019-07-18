// pages/mine/mine.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // icon: base64.icon20
    name:'Anny',
    userImg:'',
    flag: true,
  },
  yuyue(){
    wx.navigateTo({
      url: '../myYuYue/list',
    })
    // this.tishi()
  },
  jilu(){
    wx.navigateTo({
      url: '../record/record',
    })
    // this.tishi()
  },
  ziliao(){

    wx.navigateTo({
      url: '../myData/myData',
    })
  //  this.tishi()
  },

  tishi(){
      let _this = this

    if (_this.data.flag) {
      wx.navigateTo({
        url: '../myData/myData',
      })
    } else {

      wx.showModal({
        title: '提示',
        content: '很抱歉，您暂未登录 !',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login',
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  shezhi(){
    wx.navigateTo({
      url: '../shezhi/shezhi',
    })
    // this.tishi()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.userInfo.nickName,
      userImg: app.globalData.userInfo.avatarUrl
    })
    setTimeout(()=>{
         this.setData({
      name: app.globalData.userInfo.nickName
    })
    },500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.isLogin()
  },
  
  //是否登录

  isLogin() {
    if (!wx.getStorageSync('isLogin')) {
      // wx.showToast({
      //   title: '请登录后操作!!',
      //   icon: 'none',
      // })
      // this.data.flag = false
      this.setData({
        flag: false
      })
    } else {
      // this.data.flag = true
      this.setData({
        flag: true
      })

    }

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