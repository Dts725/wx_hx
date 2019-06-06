//app.js 

// var fundebug = require('./fundebug.1.0.0.min.js');
// fundebug.init(
//   {
//     apikey: 'f25bde454fd7f711ef9de77a9567bd5f7d23cc2aeac8151dc7712b54a3be7407'
//   })
// fundebug.notify("微信小程序bug测试", "Hello, bug!")
import url from './fetch.js'
// 注释console.log()
// console.log=function(){}

App({
  onLaunch: function () {
    // 展示本地存储能力 
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
        // console.log('1111111111', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId 
        this.globalData.userInfo = res;
        // console.log('3333333333', this.globalData.userInfo)
      }
    })



    // 获取用户信息 
    wx.getSetting({
      success: res => {
        // console.log(res)
        // console.log('222222222')

        if (res.authSetting['scope.userInfo']) {
          // console.log('3333333333333')

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
          wx.getUserInfo({
            success: res => {
              // console.log('4444444444444',res)


              this.warrant()
              // 可以将 res 发送给后台解码出 unionId 
              this.globalData.userInfo = res.userInfo

              // console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
              // 所以此处加入 callback 以防止这种情况 
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.warrant();
          wx.redirectTo({
            url: '../dailg/dailg',
          })
        }
      }
    })
  },

  //授权登录 


  warrant() {
    wx.request({
      url: url.warrant,
      data: {
        client_id: 'yhxcx',//oa/ 
        client_secret: '880055513D7EF8FAF30E7DA7B03B9582' //小程序唯一访问密钥 
      },
      success: res => {
        this.globalData.token = res.data.res_data.token;
        wx.setStorageSync(
          "token",
          res.data.res_data.token
        )
        url.getToken();
      }
    })
  },


  globalData: {
    fileUrl: 'https://file.shyunhua.com',
    userInfo: null,
    loginInfo: null,
    token: "",
    getMaterials: "",
    fid: [],
    api: 'https://hexi.shyunhua.com/', // 接口地址
    // api: 'https://apijcdj.shyunhua.com/', // 上传时需要加 'file/upload'
    fileUrl: 'https://file.shyunhua.com/'  // 显示或下载文件的地址
  }
})
