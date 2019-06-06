// pages/bid/bid.js
import url from '../../fetch.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData: {
      sxid: "",
      bjid: ""
    },
    uploadFileInfo: '',
    // img0 : '',//图片和上个页面返回id 相关
    img1 : "",
    img2 : "",
    img3 : "",
    img4 : "",
    img5 : "",
    img6 : "",
    img7 : "",
    img8 : "",
    img9 : "",
    array: ['事项一', '事项二', '事项三', '事项四'],
  },
  bindPickerChange(e){
    this.setData({
      index: e.detail.value
    })
  },

  //截取图片地址
  getImgUrl(str, fid, name,value) {
    let index = str.indexOf('webapps');
 
    let imgUrl = url.imgUrl + str.substr(index + 7) + '/' + fid + name
    switch(value){
      case '0' : 
      {
        this.setData({
          img0 : imgUrl
        })
        this.steStroge('img0',imgUrl)
        break;
      }
      case '1' : 
      {
        this.setData({
          img1 : imgUrl
        })
          this.steStroge('img1', imgUrl)
          break;

      }
      case '2' : 
      {
        this.setData({
          img2 : imgUrl
        })
          this.steStroge('img2', imgUrl)
          break;

      }
      case '3' : 
      {
        this.setData({
          img3 : imgUrl
        })
          this.steStroge('img3', imgUrl)
          break;

      }
      case '4' : 
      {
        this.setData({
          img4 : imgUrl
        })
          this.steStroge('img4', imgUrl)
          break;

      }
      case '5' : 
      {
        this.setData({
          img5 : imgUrl
        })
          this.steStroge('img5', imgUrl)
          break;

      }
      case '6' : 
      {
        this.setData({
          img6 : imgUrl
        })
          this.steStroge('img6', imgUrl)
          break;

      }
      case '7' : 
      {
        this.setData({
          img7 : imgUrl
        })
          this.steStroge('img7', imgUrl)
          break;

      }
      case '8' : 
      {
        this.setData({
          img8 : imgUrl
        })
          this.steStroge('img8', imgUrl)
          break;

      }
      case '9' : 
      {
        this.setData({
          img9 : imgUrl
        })
          this.steStroge('img9', imgUrl)
          break;

      }

      default: {
        break;
      }
    }
  },

  //下载模板
  download(){


    wx.downloadFile({
      url: url.downLoad, 
  
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(res);
        wx.openDocument({
          filePath: filePath,
          fileType : 'doc',
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  },

  // //删除图片 
  //  delete (e) {
  //    let object_id = wx.getStorageSync('uploadInfo')[e.currentTarget.dataset.tap].id;
  //    console.log(object_id)
  //    url.deleteField(object_id)
  //    wx.removeStorageSync(('img' + e.currentTarget.dataset.tap))

  //    switch (e.currentTarget.dataset.tap){
  //     case '0' :{
  //       this.setData({
  //         img0 : ""
  //       })
  //       break;
  //     }
  //     case '1' :{
  //       this.setData({
  //         img1 : ""
  //       })
  //       break;
  //     }
  //     case '2' :{
  //       this.setData({
  //         img2 : ""
  //       })
  //       break;
  //     }
  //     case '3' :{
  //       this.setData({
  //         img3 : ""
  //       })
  //       break;
  //     }
  //     case '4' :{
  //       this.setData({
  //         img4 : ""
  //       })
  //       break;
  //     }
  //     case '5' :{
  //       this.setData({
  //         img5 : ""
  //       })
  //       break;
  //     }
  //     case '6' :{
  //       this.setData({
  //         img6 : ""
  //       })
  //       break;
  //     }
  //     case '7' :{
  //       this.setData({
  //         img7 : ""
  //       })
  //       break;
  //     }
  //     case '8' :{
  //       this.setData({
  //         img8 : ""
  //       })
  //       break;
  //     }
  //     case '9' :{
  //       this.setData({
  //         img9 : ""
  //       })
  //       break;
  //     }
  //   }

  //  },

  //删除附件
  delete(e) {
    let _this = this;
    let tap = e.currentTarget.dataset.tap;

    let id = wx.getStorageSync('uploadInfo')[e.currentTarget.dataset.tap].id;;
    //上传附件
    wx.request({
      url: url.getBjInfoFiled,

      data: {
        clid: id,
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {

        // let list = res.data.res_data.list.map(el => {
        //   return url.retutnUrl + `?id=${el.id}`
        // })
        if (res.data.res_data.list.length) {

          wx.setStorageSync('previewImageList', res.data.res_data.list)

          wx.navigateTo({
            url: './deleteImageBid/deleteImageBid?img='+'img'+tap,
          })
        } else {
          wx.showToast({
            title: '您未上传附件 ! ! !',
            icon: 'none'
          })
        }

      }
    })

  },


  
//预览图片
  view (e) {
    console.log(this.getStroge(('img' + e.currentTarget.dataset.tap)))
    wx.previewImage({
      current: this.getStroge(('img' + e.currentTarget.dataset.tap))[0], // 当前显示图片的http链接
      urls: this.getStroge(('img' + e.currentTarget.dataset.tap)) // 需要预览的图片http链接列表
    })
  },


  //上传图片接口
  uploadFn1(e) {
    let user_id = wx.getStorageSync('userid').userid;
    let object_id = wx.getStorageSync('uploadInfo')[e.currentTarget.dataset.tap].id
    let str = `&user_id=${user_id}&object_id=${object_id}`
 
    let _this = this;

    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach((el,index) => {
          wx.uploadFile({
            url: url.fileuploadSqcl + str,
            filePath: tempFilePaths[index],
            name: 'file',

            success(res) {
              let obj = JSON.parse(res.data);

              _this.getImgUrl(obj.savePath, obj.fid, obj.endName, e.currentTarget.dataset.tap);
              app.globalData.fid[e.currentTarget.dataset.tap] = obj.fid;

            }
          })
        })

      }
    })

  },

  //数据本地存储

    steStroge(key,data) {
      let arr =[]
      if (this.getStroge(key).length>0) {
          //方便预览村存数组
        let tmp = this.getStroge(key);
          tmp.push(data)
         
           wx.setStorageSync(key, tmp)
      }  else {
        //首次存储
       
        wx.setStorageSync(key, [data])
      }
       
    },
    //获取本地数据

    getStroge(key) {
    return  wx.getStorageSync(key) 
    },
    //移除stroge

    remStroge(key) {

      wx.removeStorageSync(key)
    },

  //上传查询列表
  getMaterials() {


    wx.request({
      url: url.getMaterials,
      data: this.data.queryData,
      success: res => {
        if (res.data.res_data.state == 0) {
          wx.showToast({
            title: '您未登录或登录失效请重新登录',
            icon: 'none',
          })
          wx.navigateTo({
            url: '../login',
          })
        } else {
          this.data.uploadFileInfo = res.data.res_data.materials
          wx.setStorageSync('uploadInfo', this.data.uploadFileInfo)
        }
      }
    })
  },

  //提交申请材料
  submit () {

    for(let i = 0;i<6;i++) {
      console.log('img' + (i + 1))
        if(!this.data['img'+(i+1)]) {
          if(i ===1) {
            continue
          } else {
            wx.showToast({
              title: '请检查上传文件 ! ! !',
              icon: 'none'
            })
            return
          }
        }

     
    }
    if (!this.data['img9']) {
 
        wx.showToast({
          title: '请检查上传文件 ! ! !',
          icon: 'none'
        })
        return
    }

    if (wx.getStorageSync('szsqxks') !== '3') {
      wx.showToast({
        title: '请填写设置户外设施行政许可申请书 ! ! !',
        icon: 'none'
      })
      return
    }
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    let data = {
      token: wx.getStorageSync('token'),
      userid: wx.getStorageSync('userid').userid,
      bjid: app.globalData.getMaterials.bjid,
      matterid: 'd7009bfd880e4a06bd410d68639ee76f',
      des : ""
    }
    wx.request({
      url: url.submitMaterials,
      method : 'get',
      data : data,
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      success : res => {
        wx.hideLoading()

          if(res.data.res_data.state ===1) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../index/index',
            })
            wx.setStorageSync('router_edit', '0')

          } else {
            if (res.data.res_data.state === 0) {
              wx.showToast({
                title: 'token校验失败',
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

  back () {
    wx.navigateTo({
      url: './firstStemp/firstStemp',
    })
  },

  //点击分享
  share(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  promise() {
    wx.showShareMenu({
      withShareTicket: true,
      success : res => {
        console.log('成功了')
      },
      fail :  err => {
        console.log('失败了')
      }
    })
    // wx.navigateTo({
    //   url: './promise/promise',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.queryData.sxid = app.globalData.getMaterials.sxid;
    this.data.queryData.bjid = app.globalData.getMaterials.bjid;
    this.data.queryData.token = wx.getStorageSync('token');
     


    if (this.getStroge('router_edit') === '1') {
      this.setData({
        img0: this.getStroge('img0'),
        img1: this.getStroge('img1'),
        img2: this.getStroge('img2'),
        img3: this.getStroge('img3'),
        img4: this.getStroge('img4'),
        img5: this.getStroge('img5'),
        img6: this.getStroge('img6'),
        img7: this.getStroge('img7'),
        img8: this.getStroge('img8'),
        img9: this.getStroge('img9')
      })
     
    } else {
      this.remStroge('img0')
      this.remStroge('img1')
      this.remStroge('img2')
      this.remStroge('img3')
      this.remStroge('img4')
      this.remStroge('img5')
      this.remStroge('img6')
      this.remStroge('img7')
      this.remStroge('img8')
      this.remStroge('img9')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getMaterials();

    if (wx.getStorageSync('szsqxks') === '3') {

    } else {
      wx.setStorageSync('szsqxks', '0')

    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(!this.getStroge('img1'))
    if (this.getStroge('delete_back') === '1') {
      this.setData({
        img0: this.getStroge('img0').length ? this.getStroge('img0')[0] : '',
        img1: this.getStroge('img1').length ? this.getStroge('img1')[0] : '',
        img2: this.getStroge('img2').length ? this.getStroge('img2')[0] : '',
        img3: this.getStroge('img3').length ? this.getStroge('img3')[0] : '',
        img4: this.getStroge('img4').length ? this.getStroge('img4')[0] : '',
        img5: this.getStroge('img5').length ? this.getStroge('img5')[0] : '',
        img6: this.getStroge('img6').length ? this.getStroge('img6')[0] : '',
        img7: this.getStroge('img8').length ? this.getStroge('img7')[0] : '',
        img8: this.getStroge('img8').length ? this.getStroge('img8')[0] : '',
        img9: this.getStroge('img9').length ? this.getStroge('img9')[0] : '',

      })
    }
    this.getStroge('delete_back') === '0'

  },
  application() {
    wx.navigateTo({
      url: './edit/edit',
    })
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
    wx.setStorageSync('router_edit', '0')
    this.remStroge('img0')
    this.remStroge('img1')
    this.remStroge('img2')
    this.remStroge('img3')
    this.remStroge('img4')
    this.remStroge('img5')
    this.remStroge('img6')
    this.remStroge('img7')
    this.remStroge('img8')
    this.remStroge('img9')
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