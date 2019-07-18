// pages/password/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerInfo: {
      yzm: "",//验证码
      pwd: "",//密码
      mobile: '',//手机号
      pwd1 : "",//确认密码
      disable: false, // 是否允许输入，点击下一步 之后改为true
    },
    phoneVerityCode:'',//////返回来的验证码
    numberCode: '获取验证码',
    addClass: '',
    codeFlag: false,
  },
  //获取验证码 
  getCodeFn() {
    // if (url.rules({
    //   'mobile': this.data.registerInfo.mobile
    // })) {
    //   return
    // }
    let data = {
      token: wx.getStorageSync('token'),
      phone: this.data.registerInfo.mobile
    }
    wx.request({
      url: url.getCode,
      data: data,
      success: res => {
        this.setData({
          phoneVerityCode: res.data.res_data.phoneVerityCode
        })

        if (res.data.res_data.ok) {
          wx.showToast({
            title: res.data.res_data.ok,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '验证码获取成功',
            icon: 'success',
            duration: 2000
          })

          this.delay();//修改时间

        }
      }
    })
  },
  //更改获取验证码字样
  delay() {
    let timer
    let num = 60;
    clearInterval(timer)
    this.setData({
      addClass: "disabled"
    })
    timer = setInterval(res => {
      num--
      if (num >= 1) {
        this.setData({
          numberCode: `${num}秒`
        })
      } else {
        this.setData({
          numberCode: `获取验证码`
        })
        clearInterval(timer)
        this.setData({
          addClass: ""
        })
      }

    }, 1000)
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
   //获取手机号
  getphone(e){
      this.data.registerInfo.mobile = e.detail.value
  },
  ////输入验证码
  getyzm(e){
      if (e.detail.value !== this.data.phoneVerityCode) {
        wx.showToast({
          title: '验证码输入错误请重新输入',
          icon: 'none',
          duration: 2000
        })

        this.setData({
          codeFlag: true
        })
      } else {
        this.setData({
          codeFlag: false
        })
      }
  },
  //获取密码
  getmima(e) {
    this.data.registerInfo.pwd = e.detail.value
  },
  //确认密码
  getmima2(e) {
    this.data.registerInfo.pwd1 = e.detail.value
   
    
  },
  loginSubmit(){
    if (this.data.registerInfo.mobile=='') return
    if (this.data.registerInfo.mobile.yzm == '') return
    if (this.data.registerInfo.mobile.pwd == '') return
    if (this.data.registerInfo.mobile.pwd1 == '') return
    if (this.data.codeFlag) {
      wx.showToast({
        title: '验证码输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.registerInfo.pwd1 != this.data.registerInfo.pwd) {
        wx.showToast({
          title: '两次密码输入不一样，请重新输入',
          icon: 'success',
          duration: 2000
        })
      return
    }
    // wx.showLoading({
    //   title: '注册中',
    // })

    wx.request({
      url: url.registerUrl,
      data: this.data.registerInfo,
      success:res=>{
        wx.navigateTo({
          url: '../login',
        })
      }
      // success: res => {
      //   wx.hideLoading()

      //   switch (res.data.res_data.state) {
      //     case 0:
      //       {
      //         wx.showToast({
      //           title: '注册成功',
      //           icon: 'success',
      //           duration: 2000
      //         })
      //         // this.setData({
      //         //   disable: true,
      //         // });
      //         this.login()
      //         break;
      //       }
      //     case 1:
      //       {
      //         wx.showToast({
      //           title: 'token失效',
      //           icon: 'none',
      //           duration: 2000
      //         })
      //         break
      //       }
      //     case 2:
      //       {
      //         wx.showToast({
      //           title: '已注册',
      //           icon: 'none',
      //           duration: 2000
      //         })
      //         break
      //       }
      //     case 3:
      //       {
      //         wx.showToast({
      //           title: '手机号错误',
      //           icon: 'none',
      //           duration: 2000
      //         })
      //         break
      //       }
      //     default:
      //       {
      //         if (res.data.res_data.error.err_code === 'KFQ_1004') {
      //           wx.showToast({
      //             title: '此用户名已存在',
      //             icon: 'none',
      //             duration: 2000
      //           })
      //         }
      //         break
      //       }
      //   }
      // }
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