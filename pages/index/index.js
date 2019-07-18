// login.js
const updateManager = wx.getUpdateManager();
let QR = require("../../utils/qrcode.js");
import url from '../../fetch.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    tokens: '',
    qrCodeUrl: '', // 二维码地址
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorageSync('1', 0)
    this.setData({
      tokens: wx.getStorageInfoSync('token')
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.isLogin()
    this.getUserImg();


  },

  //是否登录
  lianxi() {
    // wx.navigateTo({
    //   url: '../concat/concat',
    // })
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: 39.070220,//要去的纬度-地址
      longitude: 117.249500,//要去的经度-地址
      name: "天津市河西区行政许可服务中心",
      address: '天津市河西区洞庭路20号'
    })
  },
  isLogin() {
    if (!wx.getStorageSync('isLogin')) {
      // wx.showToast({
      //   title: '请登录后操作!!',
      //   icon: 'none',
      // })
      // this.data.flag = false
      this.setData({
        flag: false
      })
    } else {
      // this.data.flag = true
      this.setData({
        flag: true
      })

    }

  },
  // 大厅服务
  service(){
    wx.navigateTo({
      url: '../service/main-a',
    })
  },
  goToLogin() {
    wx.navigateTo({
      url: '../login',
    })
  },

  //进度查询
  routeProgress() {
    let _this = this

    if (_this.data.flag) {
      wx.navigateTo({
        url: '../progress/progressItem/progressItem',
      })
    } else {

      wx.showModal({
        title: '提示',
        content: '很抱歉，您暂未登录 !',
        success(res) {
          if (res.confirm) {
            _this.goToLogin()

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },



  // 点击跳转
  guideReserve() {
    wx.navigateTo({
      url: './guide'
    })
  },


  serviceOrder() {
    let _this = this
    if (this.data.flag) {
      wx.navigateTo({
        // url: '../bid/firstStemp/firstStemp',
        url: '../yuyue/yuyue'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '很抱歉，您暂未登录 !',
        success(res) {
          if (res.confirm) {
            _this.goToLogin()
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  /** 轮播图下的动态信息 */
  dynamicInfosClick(e) {
    let _this = this, type = e.target.dataset.type || e || '';
    if (type) {
      switch (type) {
        case 'yuyue':
          wx.navigateTo({
            url: '../myYuYue/list',
          })
          break;
        case 'paidui':
          wx.navigateTo({
            url: '../myYuYue/list'
          })
          break;
        case 'jindu':
          wx.navigateTo({
            // url: '../progress/progressItem/progressItem',
            url: '../progress/progressItemInfo/progressItemInfo',
          })
          break;
      }
    }
  },
  toMyQrCode() {
    wx.navigateTo({
      url: '../myYuYue/myYuYue'
    })
  },
  /** 中间的各模块跳转 */
  routerTo(e) {
    let _this = this, type = e.target && e.target.dataset ? e.target.dataset.type : e || '';
    if (type && (type == 'shenban' || type == 'yuyue' || type == 'chaxun')) {
      if (this.data.flag) {
        switch (type) {
          case 'shenban':
            wx.navigateTo({
              url: '../Correction/Correction',
            })
            break;
          case 'yuyue':
            wx.navigateTo({
              url: '../yuyue/yuyue'
            })
            break;
          case 'chaxun':
            wx.navigateTo({
              url: '../progress/progressItem/progressItem',
            })
            break;
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '很抱歉，您暂未登录 !',
          success(res) {
            if (res.confirm) {
              _this.goToLogin()
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      switch (type) {
        case 'zhinan':
          wx.navigateTo({
            url: './guide'
          })
          break;
        case 'zhibo':
          wx.navigateTo({
            url: '../video/video'
          })
          break;
      }
    }
  },

  // 获取微信头像

  getUserImg() {

    let store = "";

    let _ = this;
    wx.getStorage({
      key: 'userImg',
      success: function (res) {
        store = res.data;
        console.log(res, 999)
        _.cacheData(store)
      },
      fail: function (err) {

        _.cacheData(false)
      }
    })


  },
  mine() {
    wx.navigateTo({
      url: '../mine/mine',
    })
  },

  // 数据缓存 存取
  cacheData(store) {


    if (store) {
      this.setData({
        userImg: store
      })

    } else {
      let tmr = setInterval(res => {
        if (!app.globalData.userInfo || app.globalData.userInfo.code) {
          console.log('空的')
        } else {

          this.setData({
            userImg: app.globalData.userInfo.avatarUrl
          })

          wx.setStorage({
            key: 'userImg',
            data: app.globalData.userInfo.avatarUrl,
          })
        }

      }, 100)
    }
  },

  // 智能咨询
  intellectConsultation() {
    wx.navigateTo({
      url: '../consultation/consultation'
    })
  },
  //我要申办
  routeBid() {
    let _this = this
    if (this.data.flag) {
      wx.navigateTo({
        // url: '../bid/firstStemp/firstStemp',
        url: '../bid/index/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '很抱歉，您暂未登录 !',
        success(res) {
          if (res.confirm) {
            _this.goToLogin()
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },








  /*******************************************
   * 二维码相关的
   ******************************************/
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      // size.w = width;
      // size.h = height;
      // 因为css设置为30vw，所以此处宽度为屏幕宽度*0.3
      size.w = res.screenWidth * 0.3;
      size.h = size.w;
    } catch (e) {
      // Do something when catch error
      // console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    // console.log(url)
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(canvasId); }, 100);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function (canvasId) {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          qrCodeUrl: tempFilePath,
          canvasHidden: true
        });
      },
      fail: function (res) {
        // console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    // console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    // 初始化 二维码的canvas
    var size = this.setCanvasSize();//动态设置画布大小
    // var initUrl = app.globalData.loginInfo.code;
    var initUrl = 'o58UM5EIJT081Gs59dwrZeRrm9_U';
    this.createQrCode(initUrl, "qrcanvas", size.w, size.h);/////绘制二维码图片

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