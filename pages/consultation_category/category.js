// pages/consultation_category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // /** 下拉列表的数据 */
    // selectorList: [
    //   { id: 1, name: '<100平', select: '' },
    //   { id: 2, name: '100-200平', select: '' },
    //   { id: 3, name: '>200平', select: '' },
    // ],
    // /** 当前的类别 */
    // dat: {
    //   type: 1,
    //   selected: 1,
    // },
    /** 面积 */
    area: {
      selected: 1,
      list: [
        { id: 1, name: '<100平' },
        { id: 2, name: '100-200平' },
        { id: 3, name: '>200平' },
      ]
    },
    /** 地点 */
    place: {
      selected: 1,
      list: [
        { id: 1, name: '上海' },
        { id: 2, name: '北京' },
        { id: 3, name: '天津' },
      ]
    },
    /** 类型 */
    type: {
      selected: 1,
      list: [
        { id: 1, name: '类型1' },
        { id: 2, name: '类型2' },
        { id: 3, name: '类型3' },
      ]
    },
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'dat.selected': e.detail.value
    })
  },
  onSubmit() {
    wx.navigateTo({
      url: '../consultation_detail/detail',
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