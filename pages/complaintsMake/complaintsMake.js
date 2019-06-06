// pages/complaintsMake /complaintsMake.js
import url from '../../fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      userid: "",
      token: '',
      bjid: '12',

      'ts.ts_fwzx_id': 'b43de5b0a78249169998d85cbd3f4ec2',
      'ts.ts_fwzx': '天津市经济开发区服务中心',
      'ts.ts_dept_id': 'p2',
      'ts.ts_dept_name': '行政审批局',
      'ts.ts_source': 2,
      'ts.ts_reply_state': 2, //投诉反馈状态1为已反馈，2为未反馈
      'ts.ts_public_state': 2, //1为公开，2为不公开
      'ts.ts_zb_state': 2, //转办，1为转办2为未转办
      'ts.ts_state': 1, //投诉信息有效性 （ 1为 有效；2为 废件；3为 草稿；4为 删除）
      'ts.ts_fwpl': 1, //访问频率，默认请传1
      'ts.ts_name': '', //投诉建议 主题名称
      'ts.ts_is_public': 2, //默认请传 2
      'ts.ts_wtms': "" //问题描述

    },
    ts_id: "12",
    flag1:false,
    flag2: false,
    flag3: true,
  },

  //返回

  back () {
    wx.navigateBack({
      
    })
  },

  //提交
  submint() {
    this.data.data.token = wx.getStorageSync('token')
    this.data.data['ts.ts_id'] = this.data.ts_id
    this.data.data.userid = wx.getStorageSync('userid').userid
    console.log(this.data.data)
    if (!this.data.data['ts.ts_name'] || !this.data.data['ts.ts_wtms']) {
      wx.showToast({
        title: '请检查输入 ! ! !',
        icon : 'none'
      })

      return
    }
    wx.request({
      url: url.subPjTs,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: this.data.data,
      success: res => {
       if(res.data.res_data.state == 1){
         wx.showToast({
           title: '保存成功',
           icon: 'success',
           duration: 2000
         })
         wx.reLaunch({
           url: '../index/index',
         })
       } else {
         if (res.data.res_data.state == 0) {
           wx.showToast({
             title: '您未登录或登录失效请重新登录',
             icon: 'none',
             duration: 2000
           })
           wx.navigateTo({
             url: '../login',
           })
         }

         
       }
      }
    })
  },


  getImgUrl(str, fid, name) {
    let index = str.indexOf('webapps');
    console.log(str.substr(index + 7))

    return url.imgUrl + str.substr(index + 7) + '/' + fid + name
  },

  //上传文件
  uploadFn() {
    let that =this;
    let data = `&userid=${wx.getStorageSync('userid').userid}&object_id=${this.data.ts_id}&filetype=ts`
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: url.fileuploadSqcl + data, // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            let obj = JSON.parse(res.data);
           
            that.setData({
              imgUrl: that.getImgUrl(obj.savePath, obj.fid, obj.endName)
            })

        
            // do something
          }
        })
      }
    })
  },




  //获取吐槽pjID
  getpjid() {

    let data = {
      token: wx.getStorageSync('token'),
      userid: wx.getStorageSync('userid').userid
    }
    wx.request({
      url: url.getpjid,
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => {
        console.log(res)
        this.data.ts_id = res.data.res_data.ts_id;
      }
    })
  },
  //获取主题
  topicFn(e) {
    this.data.data['ts.ts_name'] = e.detail.value
  },
  first(){
    this.setData({
      flag1:!this.data.flag1,
      flag2:false,
      flag3:false
    })
  },
  second() {
    this.setData({
      flag1:false,
      flag2: !this.data.flag2,
      flag3: false
    })
  },
  third() {
    this.setData({
      flag1:false,
      flag2: false,
      flag3: !this.data.flag3
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  //获取反馈详情
  concentFn(e) {

    this.data.data['ts.ts_wtms'] = e.detail.value;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getpjid();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})