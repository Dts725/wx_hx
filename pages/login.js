// login.js
import url from '../fetch.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    data : {
      mobile : "",
      pwd : ""
    }
  },
  register() {
    wx.navigateTo({
      
      url: './register/register',
    })
  },
  zhaohui(){
    wx.navigateTo({
      url: './password/forget',
    })
  },
  //获取授权
  warrant() {

    if (url.rules(this.data.data)) return
    wx.request({
      url: url.warrant,
      data: {
        client_id: 'yhxcx',//oa/
        client_secret: '880055513D7EF8FAF30E7DA7B03B9582' //小程序唯一访问密钥
      },
      success: res => {
        wx.setStorage('token', res.data.res_data.token)
        // url.getToken();

      }
    })
  },


//获取用户名
  getMobile(e){
   
    this.data.data.mobile = e.detail.value;
    this.data.data.token = wx.getStorageSync('token');
  },
  getPwd(e){
    this.data.data.pwd = e.detail.value;
  },

  //登录连接
  loginSubmit(){
    if (this.data.data.mobile=='') return
    if (this.data.data.pwd == '') return
    wx.request({
      url: url.loginUrl,
      data : this.data.data,
      success : res => {
        if (res.data.res_data.state == 1 && res.data.res_data.isok === 1){
          this.warrant();
          wx.setStorageSync('isLogin', 1)
          app.globalData.loginInfo = res.data.res_data;
          wx.setStorage({
            key: "userid",
            data: res.data.res_data
          })
         wx.showToast({
           title: '登录成功',
           icon: 'success',
           duration: 2000
         })
          wx.reLaunch({
           url: './index/index',
         })
       } else {
         wx.showToast({
           title: '登录失败',
           icon: 'none',
           duration: 2000
         })
       }
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