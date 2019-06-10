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
    scrollTop: '',
    imgUrl: ''
  },

  attached: function() {
    this._scortInit()
    this._onMessageFn()
    this.setData({
      imgUrl: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName
    })
  },
  detached: function() {

    this.close()
  },
  /**
   * 组件的方法列表
   */
  methods: {

    close() {
      wx.onSocketClose(res => {})
    },
    // 初始化sort
    _scortInit() {


      let url = 'wss://hexi.shyunhua.com:3234';
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

      if (!this.data.tmpMessage) return;
      // 维护数组
      this.data.dataList.push(this._initView(true, this.data.tmpMessage))

      let str = JSON.stringify({
        "room_id": 5,
        "content": this.data.tmpMessage,
        "img": app.globalData.userInfo.avatarUrl,
        "name": app.globalData.userInfo.nickName
      });
      wx.sendSocketMessage({
        data: str
      })
      // 样式 , 数据恢复
      this.setData({
        dataList: this.data.dataList,
        scrollTop: this.data.dataList.length * 1000,
        inputTxt: '',
      })


    },

    // 监听服务端返回情况

    _onMessageFn() {
      wx.onSocketMessage(res => {
        if (res.data === "连接成功") return;
        let tmp = JSON.parse(res.data)
        if (tmp.content !== this.data.tmpMessage) {

          this.data.dataList.push(this._initView(false, tmp))
          this.setData({
            dataList: this.data.dataList,
            scrollTop: this.data.dataList.length * 200
          })
        } else {
          this.data.tmpMessage = ""

        }
      })
    }


  }
})