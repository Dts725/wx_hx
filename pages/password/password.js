// pages/password/password.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shuju:{
        yuanshi:'',
        new:'',
        new1:''
      }
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
  getmima1(e){
   
    if (e.detail.value != app.globalData.loginInfo.mima){
      wx.showToast({
        title: '原始密码错误',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      this.data.shuju.yuanshi = e.detail.value
    }
  },
  getmima2(e) {
      this.data.shuju.new = e.detail.value
  },
  getmima3(e) {
    this.data.shuju.new1 = e.detail.value
  },
  loginSubmit() {
    // if (this.data.shuju.yuanshi == '') return
    if (this.data.shuju.new == '') return
    if(this.data.shuju.new1 == '') return
    
    if (this.data.shuju.new1 != this.data.shuju.new) {
      wx.showToast({
        title: '两次密码输入不一样，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // wx.showLoading({
    //   title: '注册中',
    // })

    wx.request({
      url: url.registerUrl,
      data: this.data.shuju,
      success: res => {
        wx.navigateTo({
          url: '../login',
        })
      }
      
    })
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