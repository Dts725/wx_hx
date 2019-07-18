// pages/yuyue/yuyue.js
let dateformat = require('../../utils/dateformat.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'张三',
    date:'2019-04-05',////预约日期
    time:'15:00-17:00',//预约时间
    time1: '15:00-17:00',//预约时间
    phone:121212121212,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['1', '2', '3', '4', '5', '6'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    index1: 0,//选择的下拉列表下标
    tag:true,
    array: ['事项一', '事项二', '事项三', '事项四'],
    array1: ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00','13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'],
    index: 0,
    multiIndex: [0, 0],
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChange1: function (e) {
    this.setData({
      time1: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            // data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        // data.multiIndex[2] = 0;
        break;
      // case 1:
      //   switch (data.multiIndex[0]) {
      //     case 0:
      //       switch (data.multiIndex[1]) {
      //         case 0:
      //           data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
      //           break;
      //         case 1:
      //           data.multiArray[2] = ['蛔虫'];
      //           break;
      //         case 2:
      //           data.multiArray[2] = ['蚂蚁', '蚂蟥'];
      //           break;
      //         case 3:
      //           data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
      //           break;
      //         case 4:
      //           data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
      //           break;
      //       }
      //       break;
      //     case 1:
      //       switch (data.multiIndex[1]) {
      //         case 0:
      //           data.multiArray[2] = ['鲫鱼', '带鱼'];
      //           break;
      //         case 1:
      //           data.multiArray[2] = ['青蛙', '娃娃鱼'];
      //           break;
      //         case 2:
      //           data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
      //           break;
      //       }
      //       break;
      //   }
        // data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      tag:false
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  //提交
  sub(){
      let obj = {};
      // obj.id = this.data.index
      obj.name = this.data.username
      obj.shixiang = this.data.multiArray[1][this.data.multiIndex[1]]
      obj.phone = this.data.phone
      obj.date = this.data.date
      obj.time = this.data.array1[this.data.index1]
    // console.log(obj)
    
    // wx.request({
    //   url: '',
    //   method: 'post',
    //   data:obj,
    //   success:res=>{
    //     if(res.data.code == 0){
    //       wx.showToast({
    //         title: '预约成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: dateformat.dateformat.format(new Date(), 'yyyy-MM-dd')
    })
    // setTimeout(() => {
    //   this.setData({
    //     username: app.globalData.userInfo.nickName
    //   })
    // }, 500)
   
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
    this.setData({
      date: dateformat.dateformat.format(new Date(), 'yyyy-MM-dd')
    })
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