// pages/service/main-a.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    canvasHidden:true,
    previewPng:'',
    bannerPng:'',
    allBannerPng: ['../../static/banner.jpg', '../../static/4.jpg', '../../static/test/1.jpg','../../static/test/2.jpg'],
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
    let that = this;
    wx.request({
      url: app.globalData.api + 'Dating_Area_Set',
      success:function(res){
          console.log(res.data.data.data);
          let result = res.data.data.data;
          let bannerTab = [];
          result.map((item) => {
            bannerTab.push(app.globalData.fileUrl + item.icon)
          })
        that.setData({
          fileUrl:app.globalData.fileUrl,
          allBannerPng: bannerTab,
          allTabs:result,
          currentTabs: result[0],
          bannerPng: bannerTab[0]
        })
       // that.createImg(that.data.bannerPng)
      }
    })
        
  },
  switch: function (e){
   //  this.createImg(this.data.allBannerPng[e.target.dataset.index])
     this.setData({
        currentTabs: this.data.allTabs[e.target.dataset.index],
        currentNav: e.target.dataset.index,
        bannerPng: this.data.allBannerPng[e.target.dataset.index]
      })

  },
  previewImg(e){
    // var that = this;
    // var img = e.target.dataset.src;
   
    // wx.previewImage({
    //   urls: [this.data.previewPng],
    //   current: this.data.previewPng,
    // })
    this.setData({
      showModal: true
    })
  },
  close(){
    this.setData({
      showModal: false
    })
  },
  createImg(img){
    var that = this;
    const ctx = wx.createCanvasContext('attendCanvasId');
    wx.getImageInfo({
      src: img,
      success: function (res) {
        console.log(res)
        var scale = res.width / res.height
        that.setData({ //构造画板宽高
          canWidth: 200,
          canHeight: 200 / scale
        })
        
        ctx.drawImage(img, 0, 0, that.data.canWidth, that.data.canHeight);
        setTimeout(function () {
          ctx.draw(false, function () {
            wx.canvasToTempFilePath({
              canvasId: 'attendCanvasId',
              success: function success(res) {
                that.setData({
                  previewPng: res.tempFilePath
                })
                // wx.previewImage({
                //   urls: [res.tempFilePath],
                //   current: res.tempFilePath,
                // })
              }
            })
          })
        }, 500)
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var widthRpx = Math.floor((750 / wx.getSystemInfoSync().windowWidth) *100 ) / 100
    var width = ((widthRpx * wx.getSystemInfoSync().windowWidth) * 100) / 750
   
    var heightRpx = Math.floor((750 / wx.getSystemInfoSync().windowWidth) * 100) / 100
    var height = ((heightRpx * wx.getSystemInfoSync().windowHeight) * 100) / 750
    this.setData({
      imageWidth: width,
      imageHeight: height,
      left: 0 - (height - width) / 2  ,
      top: (height - width) / 2 
    })
 
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