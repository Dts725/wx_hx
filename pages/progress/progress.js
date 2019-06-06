// pages/progress/progress.js
import url from '../../fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
    title:'事件一',
    person:'张',
    yijian:'无'
  },

  //获取页面数据
  getData() {
    let data = {
      token: wx.getStorageSync('token'),
      userid: wx.getStorageSync('userid').userid
    }
    wx.request({
      method: 'post',
      url: url.getBjProcessing,
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
 
      }
    })
  },

  init(n) {
    let data = 0
    switch (n) {
      case n >= 14:
        data = 0
        break;
      case n >= 23:
        data = 1
        break;
      case n >= 31:
        data = 2
        break;
      case n >= 35:
        data = 3
        break;
      case 45:
        data = 4
        break;
      default:

    }

    return data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.detail = JSON.parse(options.detail)
    let num = this.init(this.detail.ywsx_state)
      console.log(num)
    this.setData({
      process: num
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})