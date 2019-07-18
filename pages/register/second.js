// pages/register/second.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'张三',
    userCard:'367268121829382947',
    userPhone:'15506472410',
    showPhoto: '', // 拍照后显示的头像
    canEditPhoto: false, // 如果数据库已经存在头像，则不允许编辑头像
    fileUrl:'https://huanafile.shyunhua.com',
    registerInfo:{},
    codeFlag:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      registerInfo: JSON.parse(options.source)
    })
    var getJiben = JSON.parse(options.source)
    this.setData({
      username: getJiben.xm,
      userCard: getJiben.idCard,
      userPhone: getJiben.mobile,
      codeFlag: options.flag
    })
  },
  Back(){
    // wx.navigateTo({
    //   url: 'register',
    // })
    wx.navigateBack({     //返回上一页面
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
  * 拍照
  */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.setData({
        //   showPhoto: res.tempFilePaths[0]
        // });

        wx.uploadFile({
          url: app.globalData.url + 'file/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            let dat = JSON.parse(res.data);
            let tupian = "registerInfo.showPhoto"
            if (dat && dat.code == 0) {
              that.setData({
                showPhoto: dat.data.store_result,
                'field.image': dat.data.store_result,
                [tupian]: dat.data.store_result
              })
            }
          }
        })
      }
    })
  },
  //注册
  loginSubmit() {
    console.log(this.data.registerInfo, 99999)
    if (this.data.registerInfo.xm == '') return
    if (this.data.registerInfo.idCard == '') return
    if (this.data.registerInfo.mobile == '') return
    if (this.data.registerInfo.pwd == '') return
    if (this.data.registerInfo.showPhoto == '') return
    if (this.data.codeFlag) {
      wx.showToast({
        title: '验证码输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.showLoading({
      title: '注册中',
    })
    


    // this.data.registerInfo.token = app.globalData.token;
    wx.request({
      url: url.registerUrl,
      data: this.data.registerInfo,
      success: res => {
        wx.hideLoading()

        switch (res.data.res_data.state) {
          case 0:
            {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 2000
              })
              // this.setData({
              //   disable: true,
              // });
              this.login()
              break;
            }
          case 1:
            {
              wx.showToast({
                title: 'token失效',
                icon: 'none',
                duration: 2000
              })
              break
            }
          case 2:
            {
              wx.showToast({
                title: '已注册',
                icon: 'none',
                duration: 2000
              })
              break
            }
          case 3:
            {
              wx.showToast({
                title: '手机号错误',
                icon: 'none',
                duration: 2000
              })
              break
            }
          default:
            {
              if (res.data.res_data.error.err_code === 'KFQ_1004') {
                wx.showToast({
                  title: '此用户名已存在',
                  icon: 'none',
                  duration: 2000
                })
              }
              break
            }
        }
      }
    })
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