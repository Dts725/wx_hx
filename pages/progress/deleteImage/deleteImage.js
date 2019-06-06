// pages/progress/deleteImage/deleteImage.js

import url from '../../../fetch.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
    init () {
    let list = wx.getStorageSync('previewImageList').map(el => {
        return {
          url: url.retutnUrl + `?id=${el.id}`,
          id : el.id
        } 
      })
     this.setData({
       previewImageList : list
     })
    },

    delete(e){
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        this.data.previewImageList.splice(index,1)
        this.setData({
          previewImageList : this.data.previewImageList
        })
              // 删除文件
      url.deleteField(id)
      wx.showToast({
        title: '删除成功 ! ! !',
        icon : 'none'
      })
      if (this.data.previewImageList.length === 0) {
        wx.navigateBack({
          
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.init()
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