// pages/progress/progressItem/progressItem.js
import url from '../../../fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo : "",
    volidFlag : false,
    dataInfo: [{ bj_bh: "102544561230", bj_ctime: '2019-01-14 15:30', ywsx_name: '已提交' }, { bj_bh: "102544561231", bj_ctime: '2019-02-14 15:30', ywsx_name: '已提交' }, { bj_bh: "1025445612320", bj_ctime: '2019-04-14 11:30', ywsx_name: '已提交' }]
  },
  routeProgressInfo (e) {
    console.log(e)
    wx.navigateTo({
      // url: `../progress?detail=${JSON.stringify(e.currentTarget.dataset.parmas)}`,
      // url: `../progressItemInfo/progressItemInfo?detail=${JSON.stringify(e.currentTarget.dataset.parmas)}`,
      // url:'../progress'
      url: '../progressItemInfo/progressItemInfo'
    })
  },
  //获取页面数据
  getData() {
    let data = {
      token: wx.getStorageSync('token'),
      userid: wx.getStorageSync('userid').userid
    }
    wx.request({
      method: 'post',
      url: url.getBjProcessing,
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
        if(res.data.res_data.state === 1) {
          //替换状态吗
          res.data.res_data.list.forEach((el,index) => {
            switch (el.ywsx_state) {
              case 12: {
                res.data.res_data.list[index].ywsx_name = '已提交';
                break;
              }
              case 13: {
                res.data.res_data.list[index].ywsx_name = '预审补正';
                break;
              }
              case 14: {
                res.data.res_data.list[index].ywsx_name = '预审通过';
                break;
              }
              case 20: {
                res.data.res_data.list[index].ywsx_name = '授理通过';
                break;
              }
              case 21: {
                res.data.res_data.list[index].ywsx_name = '审查';
                break;
              }
              case 23: {
                res.data.res_data.list[index].ywsx_name = '退件审批';
                break;
              }
              case 24: {
                res.data.res_data.list[index].ywsx_name = '废件审批';
                break;
              }
              case 31: {
                res.data.res_data.list[index].ywsx_name = '补证';
                break;
              }
              case 32: {
                res.data.res_data.list[index].ywsx_name = '特别程序';
                break;
              }
              case 34: {
                res.data.res_data.list[index].ywsx_name = '上报';
                break;
              }
              case 35: {
                res.data.res_data.list[index].ywsx_name = '上报通过';
                break;
              }
              case 45: {
                res.data.res_data.list[index].ywsx_name = '办结';
                break;
              }
              default : {
                break;
              }
              
            }
          })

     
    
          this.setData({
            dataInfo: res.data.res_data.list
          })
          if(!res.data.res_data.list.length) {
            this.setData({
              volidFlag : true,
            })
          }
        } else {
          wx.showToast({
            title: '您未登录或登录失效请重新登录',
            icon: 'none',
          })
          wx.navigateTo({
            url: '../../login',
          })
        }
 
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getData();
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