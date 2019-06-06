// pages/consultation/onsultation.js
const recorderManager = wx.getRecorderManager();
let limitMoreClick = require('../../utils/limitMoreClick_wechat');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 场景相关的 */
    scene: {
      url: 'Scene',  // 查询的场景接口
      list: [],  // 场景结果列表
    },
    /** 录音相关的 */
    record: {
      // openRecordingdis: "block",//录音图片的不同
      shutRecordingdis: "",//录音时增加动画
      recordingTimeqwe: 0,//录音计时
      setInter: "",//录音名称
      resultSrc: '',
      showUrl: '',
      resultText: '',  // 语音识别或者输入的内容
    },
  },
  /** 开始按住 */
  touchstart(e) {
    this.setData({
      'record.recordingTimeqwe': 0
    })
    // this.recordingTimer();
    this.openRecording();
    // console.log('touchstart:::', e, '  time:::', this.data.recordingTimeqwe);
    //开始录音计时   最大录音时长 50秒  因为后台最大支持60秒
    this.recordingTimer(50, this.touchend);
  },
  /** 结束按住 */
  touchend(e) {
    if (this.data.record.setInter) {
      clearInterval(this.data.record.setInter);
    }
    this.shutRecording();
    setTimeout(() => {
      this.setData({
        'record.recordingTimeqwe': 0
      })
    }, 1000);
    // console.log('touchend:::', e, '  time:::', this.data.recordingTimeqwe);
  },
  /** 开始输入 */
  onInput(e) {
    this.setData({
      'record.resultText': e.detail.value
    });
    // console.log('开始输入：：', e, d, f);
  },
  /** 点击搜索按钮 */
  onSearch() {
    console.log(this.data.record.resultText, app);
    if (limitMoreClick.no_more() < 1) { return; }
    let _this = this;
    wx.request({
      url: app.globalData.api + _this.data.scene.url + (this.data.record.resultText ? '?name=' + this.data.record.resultText : ''),
      method: 'get',
      success: (res) => {
        if (res.data.code == 0) {
          this.setData({
            'scene.list': res.data.data.data
          });
          console.log(this.data.scene.list);
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },
  //录音计时器
  recordingTimer(max, callback) {
    var that = this;
    //将计时器赋值给setInter
    that.data.record.setInter = setInterval(function () {
      var time = that.data.record.recordingTimeqwe + 1;
      if (max && time >= max) {
        clearInterval(that.data.record.setInter);
        if (typeof (callback) == 'function') {
          callback()
        }
      }
      that.setData({
        'record.recordingTimeqwe': time
      })
    }, 1000);
  },
  /** 开始录音 **/
  openRecording() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          'record.shutRecordingdis': "is_active",
          // 'record.openRecordingdis': "none"
        })
      }
    })
    const options = {
      duration: 50000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为50s
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      // format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //结束录音
  shutRecording() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          'record.shutRecordingdis': "",
          // 'record.openRecordingdis': "block"
        })
      }
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('。。停止录音。。', res.tempFilePath)
      const { tempFilePath } = res;
      //结束录音计时  
      clearInterval(that.data.record.setInter);
      //上传录音
      wx.uploadFile({
        url: app.globalData.api + 'file/upload',//这是你自己后台的连接
        filePath: tempFilePath,
        name: "file",//后台要绑定的名称
        header: {
          "Content-Type": "multipart/form-data"
        },
        //参数绑定
        formData: {
          recordingtime: that.data.record.recordingTimeqwe,
          topicid: that.data.topicid,
          userid: 1,
          praisepoints: 0
        },
        success(ress) {
          console.log('保存完成:::', ress, typeof (ress));
          let dat = (typeof (ress.data) == 'string' && ress.data.indexOf('{') > -1) ? JSON.parse(ress.data) : ress.data;
          that.setData({
            'record.resultSrc': dat.data.store_result,
            'record.showUrl': app.globalData.fileUrl,
          });
          wx.showToast({
            title: '保存完成',
            icon: 'success',
            duration: 2000
          })
        },
        fail(ress) {
          console.log("。。录音保存失败。。");
        }
      });
      // wx.uploadFile({
      //   url: appURL + '/wx_SubjectInformation/wx_SubjectRecordKeeping.do',//这是你自己后台的连接
      //   filePath: tempFilePath,
      //   name:"file",//后台要绑定的名称
      //   header: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   //参数绑定
      //   formData:{
      //     recordingtime: that.data.recordingTimeqwe,
      //     topicid: that.data.topicid,
      //     userid:1,
      //     praisepoints:0
      //   },
      //   success(ress){
      //     console.log(res);
      //     wx.showToast({
      //       title: '保存完成',
      //       icon:'success',
      //       duration:2000
      //     })
      //   },
      //   fail(ress){
      //     console.log("。。录音保存失败。。");
      //   }
      // });
    })
  },

  //录音播放
  recordingAndPlaying(eve) {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: '' + eve.currentTarget.dataset.gid + ''
    })
  },




  /** 下一页 */
  gonext() {
    wx.navigateTo({
      url: '../consultation_category/category',
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