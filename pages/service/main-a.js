// pages/service/main-a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentTabs:[],
     currentNav:0,
     allTabs:[
         {
          name:'办事厅A',
          tabs:[
          { name: '办事区', icon: '../../static/images/chaxunicon01.png' },
          { name: '取号机', icon: '../../static/images/chaxunicon02.png' },
          { name: '前台咨询', icon: '../../static/images/chaxunicon03.png' },
          { name: '自助服务', icon: '../../static/images/chaxunicon01.png' },
          { name: '取件处', icon: '../../static/images/chaxunicon02.png' },
          { name: '储物柜', icon: '../../static/images/chaxunicon03.png' },
          { name: '卫生间', icon: '../../static/images/chaxunicon01.png' },
          { name: '便民服务', icon: '../../static/images/chaxunicon02.png' },
          { name: '文印服务', icon: '../../static/images/chaxunicon03.png' },
        ],
         intro:'办事A佛山封口费说的话饭卡手动阀十大富豪看是否合适四大护法开始就的风格水电开发和宽松的',
         detail:[
           { des:'所开发的是司法考试发首付'},
           { des: '所开发的是司法考试发首付' },
           { des: '所开发的是司法考试发首付' }
         ]
        },
        {
          name: '办事厅B',
          tabs: [
            { name: '前台咨询', icon: '../../static/images/chaxunicon03.png' },
            { name: '自助服务', icon: '../../static/images/chaxunicon01.png' },
            { name: '取件处', icon: '../../static/images/chaxunicon02.png' },
            { name: '储物柜', icon: '../../static/images/chaxunicon03.png' },
            { name: '卫生间', icon: '../../static/images/chaxunicon01.png' },
            { name: '便民服务', icon: '../../static/images/chaxunicon02.png' },
            { name: '文印服务', icon: '../../static/images/chaxunicon03.png' },
          ],
          intro: '办事B佛山封口费说的话饭卡手动阀十大富豪看是否合适四大护法开始就的风格水电开发和宽松的',
          detail: [
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' }
          ]
        },
        {
          name: '办事厅C',
          tabs: [
            { name: '办事区', icon: '../../static/images/chaxunicon01.png' },
            { name: '取号机', icon: '../../static/images/chaxunicon02.png' },
            { name: '前台咨询', icon: '../../static/images/chaxunicon03.png' },
            { name: '自助服务', icon: '../../static/images/chaxunicon01.png' },
          ],
          intro: '办事C佛山封口费说的话饭卡手动阀十大富豪看是否合适四大护法开始就的风格水电开发和宽松的',
          detail: [
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' }
          ]
        },
        {
          name: '办事厅D',
          tabs: [
            { name: '办事区', icon: '../../static/images/chaxunicon01.png' },
            { name: '取号机', icon: '../../static/images/chaxunicon02.png' },
            { name: '前台咨询', icon: '../../static/images/chaxunicon03.png' },
            { name: '自助服务', icon: '../../static/images/chaxunicon01.png' },
            { name: '取件处', icon: '../../static/images/chaxunicon02.png' },
            { name: '储物柜', icon: '../../static/images/chaxunicon03.png' },
            { name: '卫生间', icon: '../../static/images/chaxunicon01.png' },
            { name: '便民服务', icon: '../../static/images/chaxunicon02.png' },
            { name: '文印服务', icon: '../../static/images/chaxunicon03.png' },
          ],
          intro: '办事D佛山封口费说的话饭卡手动阀十大富豪看是否合适四大护法开始就的风格水电开发和宽松的',
          detail: [
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' },
            { des: '所开发的是司法考试发首付' }
          ]
        },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          currentTabs:this.data.allTabs[0]
        })
  },
  switch: function (e){
     this.setData({
        currentTabs: this.data.allTabs[e.target.dataset.index],
        currentNav: e.target.dataset.index
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