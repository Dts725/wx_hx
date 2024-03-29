// pages/Correction/Correction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableFlag : true,
    id:'',
    turnFlag : false,
    entrClass: ["translation-01", "translation-02", "translation-03", "translation-04", "translation-05"],
    addClass : [],
    liveClass : []

  },
//切换样式 
  turn() {
    console.log("切换样式")
    this.setData({
      turnFlag: !this.data.turnFlag
    })
    if (this.data.turnFlag) {
      this.setData({
        "addClass": this.data.entrClass
      })
    } else {
      this.setData({
        "addClass": []
      })
    }
  },

//动态选择 主题部门

  tableSelectFn () {
    this.setData({
      tableFlag : !this.data.tableFlag
    })

  },

  bindFn () {
    wx.navigateTo({
      url: './detail/detail?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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