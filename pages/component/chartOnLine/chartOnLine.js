// pages/component/chartOnLine/chartOnLine.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: [],
    tmpMessage: '',
    scrollTop : '',
    imgUrl : ''
  },

  attached: function() {
    this._scortInit()
    this._onMessageFn()
  
    this.setData({
      imgUrl: app.globalData.userInfo.avatarUrl
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化sort
    _scortInit() {


      let url = 'ws://192.168.6.105:8181';
      // cononect ws
      wx.connectSocket({
        url: url
      })

      // 首次连接sort
      wx.onSocketOpen(function(res) {
        console.log(res)
      })

    },

    // 数据整理渲染
    _initView(flag, message) {

      if (flag) {
        return {
          self: false,
          message: message
        }
      } else {
        return {
          self: true,
          message: message
        }
      }

    },

    // 获取输入聊天内容
    _getValueFn(e) {
      let value = e.detail.value
      this.data.tmpMessage = value;



    },

    // 发送数据
    _send(data) {

      if (!this.data.tmpMessage) return ;
      this.data.dataList.push(this._initView(true, this.data.tmpMessage))
      this.setData({
        dataList: this.data.dataList,
        scrollTop: this.data.dataList.length * 1000,
        inputTxt: '',
        tmpMessage:''
      })
      wx.sendSocketMessage({
        data: this.data.tmpMessage,
      })

    },

    // 监听服务端返回情况

    _onMessageFn() {
      wx.onSocketMessage(res => {

        if (res.data !== this.data.tmpMessage) {
          this.data.dataList.push(this._initView(false, res.data))
          this.setData({
            dataList: this.data.dataList,
            scrollTop: this.data.dataList.length*200
          })
        } else {
          this.data.tmpMessage = ""

        }
      })
    }


  }
})