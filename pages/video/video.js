// liveVideo.js
var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
let dateformat = require('../../utils/dateformat.js');
let WxParse = require('../../utils/wxParse/wxParse.js');
let animationShowHeight = 300;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:["简介","互动","点播"],
    tabId: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    page: 1,
    current_page: 0,
    countInterval: {},
    interval: {},
    url: app.globalData.api,
    //视频直播源
    rtmpScorce: '',
    //视频列表
    cardDataVideo: [],
    isPlay: -1, //单个视频停止播放
    isLivePlayed: true, //直播视频是否播放
    isFullScreen: false, //直播视频是否全屏
    statusBarLive: 3, //播放状态栏显示时间倒计时
    clearSettimeOut: {},
    countNum: 0, //倒计时
    count: 1, //倒计时
    countTimes: '', //倒计时显示
    image: '',
    iosTime: '',
    //手风琴
    foldContent: [{
      id: '01',
      title: '',
      shows: true,
    }],
    art:'',
    text:'',
    dialogShow: false,
    height:0,
    sstatus: 1,// 1是滑动到顶部 3是滑动到底部
    isRefresh: false,//是否显示刷新头
    isLoadMore: false,//加载更多
    clientY: 0,//Y方向手指按下的方向
  },

  /**
   * medthod
   */
  //获取点播列表
  getList(url) {
    wx.request({
      url: this.data.url + url,
      success: (res) => {
        if (res.data.code == 0) {
          if (res.data.data.data.length <= 0 && this.data.page != 1) {
            wx.showToast({
              title: '已经到底了',
              icon: 'none',
              duration: 2000
            });
            this.setData({
              page: this.data.page - 1,
              current_page: this.data.page - 1,
              isRefresh: false,//是否显示刷新头
              isLoadMore: false,//加载更多
            })
            return false;
          }
          wx.hideLoading();
          let newData = res.data.data.data;
          let timeData = [];
          newData.forEach(element => {
            if (element.image || element.album) {
              element.image = app.globalData.fileUrl + '/' + (element.image || element.album);
            }
            element.content = element.content.replace(/\<\/?.*?\>/g, '').replace(/\&nbsp\;/g, '');
            if (element.create_time.length == 10) {
              element.create_time = new Date(Number(element.create_time) * 1000).getTime()
            } else if (element.create_time.length == 13) {
              element.create_time = new Date(Number(element.create_time)).getTime()
            } else if (element.create_time.length == 16) {
              element.create_time = new Date(Number(element.create_time.slice(13))).getTime()
            } else {
              element.create_time = new Date(0).getTime()
            }
          })

          if (this.data.page != this.data.current_page && this.data.page != 1) {
            newData = this.data.cardDataVideo.concat(newData);
          }

          if (!this.data.sortTime) {
            for (var i = 0; i < newData.length; i++) {
              for (var j = i; j < newData.length; j++) {
                if (newData[i].views_count < newData[j].views_count) {
                  timeData = newData[j];
                  newData[j] = newData[i];
                  newData[i] = timeData;
                }
              }
            }
          } else {
            for (var i = 0; i < newData.length; i++) {
              for (var j = i; j < newData.length; j++) {
                if (newData[i].create_time < newData[j].create_time) {
                  timeData = newData[j];
                  newData[j] = newData[i];
                  newData[i] = timeData;
                }
              }
            }
          }
          newData.forEach(item => {
            item.create_time = dateformat.dateformat.format(new Date(item.create_time), 'yyyy-MM-dd')
          })
          if (this.data.isRefresh || this.data.isLoadMore){
            wx.showToast({
              title: '刷新成功',
              icon: 'none',
              duration: 2000
            });
          }
          this.setData({
            cardDataVideo: newData,
            isRefresh: false,//是否显示刷新头
            isLoadMore: false,//加载更多
          })
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },
  //获取直播源
  getVideoSource(url) {
    let that = this
    wx.request({
      url: this.data.url + url,
      success: (res) => {
        if (res.data.code == 0 && res.data.data[0] == 'no live stream') {
          let time = res.data.data.live_announce[0] ? res.data.data.live_announce[0].start_time : '';
          let newData = this.data.foldContent;
          let article = res.data.data.live_announce[0] ? res.data.data.live_announce[0].content : '暂无信息';
          let image = res.data.data.live_announce[0] ? app.globalData.fileUrl + '/' + res.data.data.live_announce[0].album : '../../static/banner.jpg';
          WxParse.wxParse('article', 'html', article, that, 5);

          newData[0].title = res.data.data.live_announce[0] ? res.data.data.live_announce[0].title : '暂无直播';
          let time1 = time ? dateformat.dateformat.format(new Date(Number(time) * 1000), 'yyyy-MM-dd hh:mm:ss') : dateformat.dateformat.format(new Date(), 'yyyy-MM-dd')
          newData[0].start_time = time ? '直播时间：' + time1 : '日期：' + time1 ;
          this.setData({
            foldContent: newData,
            image: image,
            rtmpScorce: '',
            count: 1,
            iosTime: res.data.data.live_announce[0] ? res.data.data.live_announce[0].start_time : '',
            art: article,
            text: article.replace(/\<\/?.*?\>/g, "").replace(/\&nbsp\;/g, "")
          });
        } else {
          let time = res.data.data.OnlineInfo.LiveStreamOnlineInfo[0].start_time;
          let newData = this.data.foldContent;
          let article = res.data.data.OnlineInfo.LiveStreamOnlineInfo[0].content;
          WxParse.wxParse('article', 'html', article, that, 5);

          newData[0].title = res.data.data.OnlineInfo.LiveStreamOnlineInfo[0].title;
          time = dateformat.dateformat.format(new Date(Number(time) * 1000), 'yyyy-MM-dd hh:mm:ss')
          newData[0].start_time = '直播时间：' + time;
          this.setData({
            foldContent: newData,
            rtmpScorce: res.data.data.OnlineInfo.LiveStreamOnlineInfo[0].play_rtmp,
            count: 0,
            iosTime: res.data.data.OnlineInfo.LiveStreamOnlineInfo[0].start_time,
            art: article,
            text: article.replace(/\<\/?.*?\>/g, "").replace(/\&nbsp\;/g, "")
          });
        }
      },
      fail: (res) => {
        // console.log('fail', res);
      }
    });
  },

  statechange(e) {
    console.log('live-player code:', e.detail.code)
    if (e.detail.code == 2004)
      this.setData({
        countNum: 0
      });
    if (e.detail.code == 3005){
      this.countDown()
    }
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },

  //隐藏or显示 播放和全屏按钮
  changeStatusBar(e) {
    if (this.data.statusBarLive > 0) {
      this.setData({
        statusBarLive: 0
      });
      clearTimeout(this.clearSettimeOut);
    } else {
      this.setData({
        statusBarLive: 3
      });
      this.statusBarDisappear();
    }
  },
  //直播播放、暂停
  liveVideoPlay() {
    if (this.data.isLivePlayed)
      this.audioCtx.pause() //暂停
    else
      // this.audioCtx.play() //播放
      this.audioCtx.resume({ //恢复
        success: res => {
          console.log('resume success')
        },
        fail: res => {
          console.log('resume fail')
        }
      })

    this.setData({
      isLivePlayed: !this.data.isLivePlayed
    });
    console.log(this.audioCtx)
  },
  //全屏、退出全屏
  fullScreen() {
    if (this.data.isFullScreen) {
      this.audioCtx.exitFullScreen() //退出全屏

    } else {
      this.audioCtx.requestFullScreen({
        direction: 90
      }) //进入全屏
    }

    this.setData({
      isFullScreen: !this.data.isFullScreen
    });
  },
  // 状态栏倒计时三秒消失
  statusBarDisappear() {
    //三秒消失
    if (this.data.statusBarLive > 0) {
      this.clearSettimeOut = setTimeout(() => {
        this.setData({
          statusBarLive: 0
        })
      }, 3000);
    }
  },
  // 倒计时
  countDown() {
    if (this.countInterval){
      clearInterval(this.countInterval);
    }
    if (this.interval){
      clearInterval(this.interval);
    }
    this.countInterval = setInterval(() => {
      this.data.countNum = Math.ceil(this.data.iosTime - (new Date().getTime() / 1000));
      this.getVideoSource('live/live_online_list');
      if (this.data.countNum <= 0) {
        this.setData({
          countNum: 0
        });
      }
      if (this.data.count == 0) {
        this.setData({
          countNum: 0
        });
        clearInterval(this.countInterval);
      }
    }, 1000)
    this.interval = setInterval(() => {
      if (this.data.countNum > 0) {
        let d = Math.floor(this.data.countNum / 3600 / 24) < 10 ? '0' + Math.floor(this.data.countNum / 3600 / 24) : Math.floor(this.data.countNum / 3600 / 24),
          h = Math.floor(this.data.countNum / 3600 % 24) < 10 ? '0' + Math.floor(this.data.countNum / 3600 % 24) : Math.floor(this.data.countNum / 3600 % 24),
          a = Math.floor(this.data.countNum / 3600) < 10 ? '0' + Math.floor(this.data.countNum / 3600) : Math.floor(this.data.countNum / 3600),
          m = Math.floor((this.data.countNum - a * 3600) / 60) < 10 ? '0' + Math.floor((this.data.countNum - a * 3600) / 60) : Math.floor((this.data.countNum - a * 3600) / 60),
          s = Math.floor(this.data.countNum - a * 3600 - m * 60) < 10 ? '0' + Math.floor(this.data.countNum - a * 3600 - m * 60) : Math.floor(this.data.countNum - a * 3600 - m * 60);
        this.setData({
          countNum: this.data.countNum - 1
        });
        this.setData({
          countTimes: d + '天' + h + '时' + m + '分' + s + '秒'
        });
      } else if (this.data.countNum == 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  },
  //选项卡
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      tabId: e.currentTarget.id,
    });
    if (e.currentTarget.id == 2){
      this.getList('admin/live/video_on_demand?type=0&is_show=1')
    }
  },

  info(){
    // 显示遮罩层
    this.setData({
      dialogShow:true,
    })
    // WxParse.wxParse('article', 'html', this.data.art, this, 5);
  },
  close(){
    // 隐藏遮罩层
    this.setData({
      dialogShow: false,
    })
  },
  //视频列表详情
  videoInfo(e){
    wx.navigateTo({
      url: './videoInfo?id=' + e.currentTarget.dataset.id
    })
  },
  //收藏视频
  collect(e){
    console.log(e.currentTarget.dataset.id)
    // this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
  },
  scrollTop(){
    this.setData({
      page: 1,
      sstatus: 1
    });
    // this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
  },
  scrollBottom(){
    console.log('下')
    this.setData({
      page: this.data.page + 1,
      sstatus: 3
    });
    // this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
  },
  /**
* 手指按下
*/
  start: function (e) {
    var touchPoint = e.touches[0];
    var clientY = touchPoint.clientY
    this.setData({
      clientY: clientY
    })
  },
  /**
  * 抬起手指
  */
  end: function (e) {
    console.log(this.data.sstatus)
    var context = this
    var upPoint = e.changedTouches[0];
    var endY = upPoint.clientY
    var pointTopointY = endY - this.data.clientY
    var status = this.data.sstatus
    //上拉刷新
    if (status == 1 && pointTopointY > 50) {
      this.setData({
        isRefresh: true
      })
      this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
    }
    //上拉加载
    if (status == 3 && pointTopointY < -50) {
      this.setData({
        isLoadMore: true
      })
      this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取视频直播源
    this.getVideoSource('live/live_online_list');
    //选项卡
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getVideoSource('live/live_online_list');
    this.audioCtx = wx.createLivePlayerContext('myliveVideo')
    this.statusBarDisappear(); //状态栏倒计时三秒消失
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(()=>{
      wx.getSystemInfo({
        success: res => {
          let clientHeight = res.windowHeight;
          let domHeight = '';
          const query = wx.createSelectorQuery();
          query.select('.overall-page').boundingClientRect(resq => {
            domHeight = resq.height
            this.setData({
              height: clientHeight - domHeight
            });
          }).exec()
        }
      });
    },500)

    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    clearInterval(this.countInterval);
    clearInterval(this.interval);
    this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
    this.getVideoSource('live/live_online_list');
    this.audioCtx = wx.createLivePlayerContext('myliveVideo')
    this.statusBarDisappear(); //状态栏倒计时三秒消失
    this.countDown(); //倒计时
    wx.clearStorage()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.countInterval);
    this.audioCtx.stop();
    this.setData({
      rtmpScorce: 'rtmp://null'
    })
    wx.clearStorage()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.countInterval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getVideoSource('live/live_online_list');
    wx.stopPullDownRefresh()
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