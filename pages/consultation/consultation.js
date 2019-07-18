// pages/consultation/onsultation.js
const recorderManager = wx.getRecorderManager();
let limitMoreClick = require('../../utils/limitMoreClick_wechat');
let base64 = require('../../utils/base64-wechat');
let Md5 = require('../../utils/md5');
let Base64Binary = require('../../utils/Base64Binary');
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
      inputMediaSrc: '', // 录音上传后返回的wav文件名称
      showUrl: '',  // fileUrl
      inputText: '',  // 语音识别或者输入的内容
      resultText: '',  // 语音识别结果文本
      resultMedia: '', // 语音识别结果
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
      'record.inputText': e.detail.value
    });
    // console.log('开始输入：：', e, d, f);
  },
  /** 点击搜索按钮 */
  onSearch() {
    if (limitMoreClick.no_more() < 1) { return; }
    console.log(this.data.record.inputText, app);
    let _this = this;
    // 图灵机器人
    this.tuling(this.data.record.inputText);
    // 讯飞机器人
    // this.xunfei_aiui(this.data.record.inputText);


    // wx.request({
    //   url: app.globalData.api + _this.data.scene.url + (this.data.record.inputText ? '?name=' + this.data.record.inputText : ''),
    //   method: 'get',
    //   success: (res) => {
    //     if (res.data.code == 0) {
    //       this.setData({
    //         'scene.list': res.data.data.data
    //       });
    //       console.log(this.data.scene.list);
    //     }
    //   },
    //   fail: (res) => {
    //     console.log('fail', res);
    //   }
    // });
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
      // // 讯飞机器人
      // that.xunfei_aiui(tempFilePath);
      // that.tuling(app.globalData.fileUrl + 'hexifile/bj_weather.wav');
      return;
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
            'record.inputMediaSrc': dat.data.store_result,
            'record.showUrl': app.globalData.fileUrl,
          });
          // that.tuling(app.globalData.fileUrl + dat.data.store_result);
          that.mp3ToWav(app.globalData.fileUrl + dat.data.store_result).then(res => {
            if (res.data) {
              that.setData({
                'record.resultPlaySrc': app.globalData.fileUrl + res.data
              });
              // 播放音频
              // that.recordingAndPlaying(app.globalData.fileUrl + res.data);

              // that.tuling(app.globalData.fileUrl + res.data);
              // that.tuling(app.globalData.fileUrl + 'hexifile/Free-Converter.com-5d2c31ab04d3d__!tmp_a6bfa0d7ebb30d1be287a8313e5986013b9dad63f8444aaa-53010125.wav');
              // that.tuling(app.globalData.fileUrl + 'hexifile/bj_weather.wav');
              // 讯飞机器人
              // that.xunfei_aiui(app.globalData.fileUrl + res.data);
              // that.xunfei_aiui(app.globalData.fileUrl + 'hexifile/bj_weather.wav');
            }
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



  // mp3转wav
  mp3ToWav(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + 'file/mp3_to_wav' + '?file=' + url,
        method: 'get',
        success: (res) => {
          console.log('转化的wav文件：：：', res);
          resolve(res);
          if (res.data.code == 0) {
          }
        },
        fail: (res) => {
          console.log('fail', res);
          reject(res);
        }
      });

    });
  },

  //播放背景音频
  recordingAndPlaying(url) {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: url,
      // 接口调用结束的回调函数（调用成功、失败都会执行
      complete: function (e, d, f) {
        console.log('接口调用结束的回调函数（调用成功、失败都会执行:::', e, d, f);
      }
    })
  },

  // 语音识别
  audioToText(url) {

  },
  // 语音合成
  textToAudio(text) {

  },


  /** 下一页 */
  gonext() {
    wx.navigateTo({
      url: '../consultation_category/category',
    })
  },

  // 讯飞aiui
  // AIUI是科大讯飞提供的一套人机智能交互解决方案， 旨在实现人机交互无障碍，使人与机器之间可以通过语音、图像、手势等自然交互方式，进行持续，双向，自然地沟通
  xunfei_aiui(info) {
    info = info || '讲个笑话';
    let apiKey = 'a8c55002e4de4d88ace409b3314702eb',
      // auth_id = '52026deefa6c44a45d6ced68693b0970';
      auth_id = '0981ce1ccc0a10ebc04bb4178d7a635e';
    // 请求参数，相当于config配置
    let params = {
      // 情景模式（目前不支持 wpgs-识别动态修正 场景）
      scene: 'main_box',
      // 用户唯一ID（32位字符串，包括英文小写字母与数字，开发者需保证该值与终端用户一一对应）
      auth_id: auth_id,
      // 数据类型，可选值：text（文本），audio（音频）
      data_type: 'text',
      // 是否开启云端vad，可选值：continuous（开启），oneshot（关闭），默认为 continuous，注意，开启后可能返回多个识别和语义结果
      interact_mode: 'continuous',
      // result_level: 'complete'
    };
    let data = info;
    if (/\.(mp3|wav)/.test(info)) {
      params.data_type = "audio";
      params.aue = "raw";
      params.speex_size = 60;
      // data = base64.CusBASE64.encoder(info);
      data = Base64Binary.decodeArrayBuffer(info);
    }
    let curTime = parseInt(new Date().getTime() / 1000),
      param = base64.CusBASE64.encoder(JSON.stringify(params)),
      checkSum = Md5(apiKey + curTime + param);
    // let data = new Blob([info], { type: "text/plain" });
    // let data = Base64Binary.decodeArrayBuffer(info);
    // let data = Base64Binary.decode(info);
    // let data = base64.CusBASE64.encoder(info);
    // let data = '5YyX5Lqs5aSp5rCU5oCO5LmI5qC3';
    console.log('输入的信息：：：', info, ' 编译后的信息：：', data);
    debugger;
    wx.request({
      url: 'https://openapi.xfyun.cn/v2/aiui',
      header: {
        // 讯飞AIUI开放平台注册申请应用的应用ID(appid)
        "X-Appid": "5ac2df8b",
        // 当前UTC时间戳，从1970年1月1日0点0 分0 秒开始到现在的秒数
        "X-CurTime": curTime,
        // 相关参数JSON串经Base64编码后的字符串，见各接口详细说明
        "X-Param": param,
        // 令牌，计算方法：MD5(apiKey + curTime + param)，三个值拼接的字符串，进行MD5哈希计算（32位小写），其中apiKey由讯飞提供，调用方管理。
        "X-CheckSum": checkSum

        // "X-Appid": "5ac2df8b",
        // "X-CurTime": 1562893821,
        // "X-CheckSum": "becb3f9ef9189a624f670548f160e7dd",
        // "X-Param": " 	eyJhdXRoX2lkIjoiOWJjMDFkODg4ZWI2ZDQ4YWZlYzJhNjllZmI3YWNkZGIiLCJkYXRhX3R5cGUiOiJ0ZXh0Iiwic2NlbmUiOiJtYWluX2JveCJ9",
      },
      data: data,
      method: 'post',
      // dataType: '',
      // responseType: 'arraybuffer',
      success: (res) => {
        console.log('讯飞aiui返回的结果：：：', res);
        this.setData({
          'scene.list': res.data.data || []
        });
        // if (res.data.results[0].values.url) {
        //   wx.navigateTo({
        //     url: './consultation_html_result?url=' + res.data.results[0].values.url
        //   })
        // }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },

  // 图灵机器人
  tuling(info) {
    info = info || '附近的地铁站';
    let data = {
      // 	输入类型:0-文本(默认)、1-图片、2-音频
      "reqType": 0,
      // 输入信息
      "perception": {
        // 文本信息  1-128字符
        "inputText": {
          "text": ""
        },
        // 	图片信息  图片地址
        // "inputImage": {
        //   "url": ""
        // },
        // 音频信息  音频地址
        "inputMedia": {
          "url": ""
        },
        // 客户端属性
        "selfInfo": {
          // 地理位置信息
          "location": {
            "city": "上海",
            "province": "闵行区",
            "street": "七宝"
          }
        }
      },
      // 	用户参数
      "userInfo": {
        // 机器人标识
        "apiKey": "4d95f73bc45d4c29bcaf8f60226c5785",
        // 用户唯一标识
        "userId": "d0a4600ef29e3b08"
      }
    };
    // 判断音频
    if (/\.(mp3|wav)/.test(info)) {
      data.perception.inputMedia.url = info;
      data.reqType = 2;
      delete data.perception.inputText;
    } else {
      data.perception.inputText.text = info;
      delete data.perception.inputMedia;
    }
    wx.request({
      url: 'http://openapi.tuling123.com/openapi/api/v2',
      data: data,
      method: 'post',
      dataType: 'json',
      success: (res) => {
        console.log('图灵返回的结果：：：', res);
        this.setData({
          'scene.list': res.data.results
        });
        if (res.data.results[0].values.url) {
          wx.navigateTo({
            url: './consultation_html_result?url=' + res.data.results[0].values.url
          })
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
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