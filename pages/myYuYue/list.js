// pages/myYuYue/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{ id: '1', title: '办理事项', time: '2019-04-03 13:00-19:00', 'type': '预约成功', person: '张三', phone: '111111111111', mingcheng: '上海云话科技有限公司' }, { id: '2',title: '办理事项', time: '2019-04-03 13:00-19:00', 'type': '已过期',person: '张三', phone: '111111111111', mingcheng: '上海云话科技有限公司' }]
  },
  eiweima(e){
    wx.navigateTo({
      url: 'myYuYue?id=' + e.currentTarget.dataset.id
    })
  },
  submit(e){
    console.log(e)
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