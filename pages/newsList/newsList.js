// pages/newsList/newsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setData: [{ title: '标题一由各种物质组成的巨型球状天体，叫做星球标题一由', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }, { title: '标题一由各种物质组成的巨型球状天体，叫做星球', time: '2019-04-20  14:24' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  detailEvent(){
    wx.navigateTo({
      url: 'newsListInfo',
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