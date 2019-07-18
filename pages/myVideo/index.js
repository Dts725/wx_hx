var sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
let dateformat = require('../../utils/dateformat.js');
let WxParse = require('../../utils/wxParse/wxParse.js');
let animationShowHeight = 300;

Page({
  data: {
    tabs: ["观看记录", "我的收藏"],
    tabId: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    url: app.globalData.api,
    cardDataVideo: [],
    sstatus: 1,// 1是滑动到顶部 2是滑动中中 3是滑动到底部
    isRefresh: false,//是否显示刷新头
    isLoadMore: false,//加载更多
    clientY: 0,//Y方向手指按下的方向
    height:'',
  },
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
          if (this.data.isRefresh || this.data.isLoadMore) {
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
  //选项卡
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      tabId: e.currentTarget.id,
    });
    this.getList('admin/live/video_on_demand?type=0&is_show=1')
  },
  //视频列表详情
  videoInfo(e) {
    wx.navigateTo({
      url: '../video/videoInfo?id=' + e.currentTarget.dataset.id
    })
  },
  //收藏视频
  collect(e) {
    console.log(e.currentTarget.dataset.id)
    // this.getList('admin/live/video_on_demand?type=0&is_show=1&page=' + this.data.page)
  },
  /**
   * 初始化数据
   */
  onLoad: function (e) {
    //选项卡
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  onShow: function (e) {
    this.getList('admin/live/video_on_demand?type=0&is_show=1')
    setTimeout(() => {
      wx.getSystemInfo({
        success: res => {
          let clientHeight = res.windowHeight;
          let domHeight = 52;
          this.setData({
            height: clientHeight - domHeight
          });
        }
      });
    }, 500)
  },
  //滑动到顶端
  scrollToTop: function (e) {
    this.setData({
      sstatus: 1
    })
  },
  //滑动到底部
  scrollToBottom: function (e) {
    this.setData({
      sstatus: 3
    })
  },
  /**
   * 滑动中
   */
  scroll: function (e) {
    // this.setData({
    //   sstatus: 2,
    // })
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
    var context = this
    var upPoint = e.changedTouches[0];
    var endY = upPoint.clientY
    var pointTopointY = endY - this.data.clientY
    var status = this.data.sstatus
    // util.showLog("滑动的距离:" + pointTopointY + "----:当前的状态:" + status)
    //上拉刷新
    if (status == 1 && pointTopointY > 50) {
      this.setData({
        isRefresh: true
      })
      this.getList('admin/live/video_on_demand?type=0&is_show=1')
    }
    //上拉加载
    if (status == 3 && pointTopointY < -50) {
      this.setData({
        isLoadMore: true
      })
      this.getList('admin/live/video_on_demand?type=0&is_show=1')
    }
  },
})