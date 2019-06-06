// pages/progress/progressItem/progressItem.js
import url from '../../../fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    bjTopData: {},
    viewFlag: true,
    _previewFlag : false 
  },
  routeProgressInfo(e) {

    // wx.navigateTo({
    //   url: `../progress?detail=${JSON.stringify(e.currentTarget.dataset.parmas)}`,
    // })
  },

  //办件事项
  bjTop(e) {

    this.setData({
      bjTopData: e
    })

  },

  //是否显示详细信息
  onMyFlag(el) {
    if (el.detail) {

      this.setData({
        viewFlag: false,
      })
    } else {

      this.setData({
        viewFlag: true,
      })
    }


  },


  // 查看
  view(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;

    console.log(id)
    console.log(index)
    if (index === 0) {
      this.getBjForm(id)
    } else {
      this.getBjInfo(id)
    }

  },

  // 编辑
  edit(e) {
    let id = e.currentTarget.dataset.id;

    let index = e.currentTarget.dataset.index;

    if (index === 0) {
      this.getBjFormEdit(id)
    } else {

      this.getBjInfoEdit(id)
    }

  },

  //查看表单信息详情
  getBjForm(id) {
    // let id = e.currentTarget.dataset.id;
    wx.request({
      url: url.getBjInfo,
      // url: url.getBjInfo,
      data: {
        clid: id,
        token : wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {

        if(res.data.res_data.state === 1) {
          wx.navigateTo({
            url: `../../bid/edit/edit?data=${JSON.stringify(res.data.res_data)}&view=true`,

          })
        } else {
          if (res.data.res_data.error) {
            wx.showModal({
              title: '警告 ! ! !',
              content: '未检测到您提交户外广告申请书,此次申请无效,请重新申请 ! ! !',
              success: res => {

                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../bid/firstStemp/firstStemp',
                  })
                } else if (res.cancel) {
                  wx.showToast({
                    title: '请重新申请 ! ! !',
                    icon: 'none'
                  })
                }

              },

            })
          } else {
            // wx.showModal({
            //   content: JSON.stringify(url.getBjInfo)+id+'测试'+wx.getStorageSync('token'),
            // })
          
            wx.showToast({
              title: '登录失败,请重新登录 ! ! !',
            })
            wx.navigateTo({
              url: '../../login',
            })
          }

        }

      }
    })
  },
  //编辑表单详情
  getBjFormEdit(id) {
    // let id = e.currentTarget.dataset.id;
    wx.request({
      url: url.getBjInfo,
      // url: url.getBjInfo,
      data: {
        clid: id,
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {
        if(res.data.res_data.state === 1) {
          wx.navigateTo({
            url: `../../bid/edit/edit?data=${JSON.stringify(res.data.res_data)}& view= false`,

          })
        } else {
          if(res.data.res_data.error) {
              wx.showModal({
                title: '警告 ! ! !',
                content: '未检测到您提交户外广告申请书,此次申请无效,请重新申请 ! ! !',
                success : res => {

                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../bid/firstStemp/firstStemp',
                    })
                  } else if (res.cancel) {
                      wx.showToast({
                        title: '请重新申请 ! ! !',
                        icon : 'none'
                      })
                  }
       
                },
             
              })
          } else {
            wx.showToast({
              title: '登录失败,请重新登录 ! ! !',
            })
            wx.navigateTo({
              url: '../../login',
            })
          }

        }
 
      }
    })
  },
  //查看附件
  getBjInfo(id) {
    // let id = e.currentTarget.dataset.id;

    wx.request({
      url: url.getBjInfoFiled,
      data: {
        clid: id,
        token : wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {

        if(res.data.res_data.state === 0) {
          wx.showToast({
            title: '请重新登录! ! !',
          })
          wx.navigateTo({
            url: '../../login',
          })
          return 
        }
        if (!res.data.res_data.list.length) {
          wx.showToast({
            title: '您未上传附件 ! ! !',
            icon: 'none'
          })
          return
        }

        let list = res.data.res_data.list.map(el => {
          return url.retutnUrl + `?id=${el.id}`
        })
        wx.previewImage({
          current: list[0], // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })


      }
    })
  },

//删除附件
delete (e) {
  let  _this = this;
  
  let id = e.currentTarget.dataset.id;
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
    if(res.data.res_data.list.length) {

      wx.setStorageSync('previewImageList', res.data.res_data.list)

      wx.navigateTo({
        url: '../deleteImage/deleteImage',
      })
    } else {
        wx.showToast({
          title: '您未上传附件 ! ! !',
          icon : 'none'
        })
    }

    }})

},


  // 编辑附件
  getBjInfoEdit(id,lisId) {
  
    //上传附件
    wx.request({
      url: url.getBjInfoFiled,

      data: {
        clid: id,
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      success: res => {

        // if (lisId === 'delete') {
        //   if (res.data.res_data.list.length) {
        //     res.data.res_data.list.map(el => {
        //       url.deleteField(el.id)

        //     })
        //     wx.showToast({
        //       title: '附件删除成功 ! ! !',
        //     })
        //   } else {
        //     wx.showToast({
        //       title: '您未上传附件 ! ! !',
        //       icon : 'none'
        //     })
        //   }

  
        // return

        // }



        wx.chooseImage({
          success(res) {
            const tempFilePaths = res.tempFilePaths

            tempFilePaths.forEach((el,index)=> {
              wx.uploadFile({
                url: url.fileuploadSqcl + `&object_id=${id}`, // 仅为示例，非真实的接口地址

                filePath: tempFilePaths[index],
                name: 'file',
                success: (res) => {
                  console.log(res)
                }
              })
            })

          }
        })
      }
    })
  },

  // 提交按钮 
   submitEdit() {

let flag = false;
  //    let tmpList = this.data.dataInfo.list;
  // for(let index = 0;index< tmpList.length;index++) {
  //   if (index === 8 || index === 7 || index === 0) {

  //   } else {
  //     wx.request({
  //       url: url.getBjInfoFiled,
  //       data: {
  //         clid: tmpList[index].id,
  //         token: wx.getStorageSync('token')
  //       },
  //       method: 'GET',
  //       success: res => {

  //         if (res.data.res_data.state === 0) {
  //           flag = true;
  //           wx.showToast({
  //             title: '请重新登录! ! !',
  //           })
  //           wx.navigateTo({
  //             url: '../../login',
  //           })
  //           return
  //         }
  //          console.count('测试')
  //         if (!res.data.res_data.list.length) {
  //           console.log('哈哈哈哈哈哈')
  //           wx.showToast({
  //             title: '您未上传附件 ! ! !',
  //             icon: 'none'
  //           })
  //           flag = true;
  //           return
  //         }
  //       }
  //     })
  //   }
  // }
   this.data.dataInfo.list.forEach((el,index) => {
     console.log('测试')
      if(index === 8 || index === 7 || index === 0){

      } else {
        wx.request({
          url: url.getBjInfoFiled,
          data: {
            clid: el.id,
            token: wx.getStorageSync('token')
          },
          method: 'GET',
          success: res => {

            if (res.data.res_data.state === 0) {
              flag = true;
              wx.showToast({
                title: '请重新登录! ! !',
              })
              wx.navigateTo({
                url: '../../login',
              })
              return
            }
        
            if (!res.data.res_data.list.length) {
              console.log('哈哈哈哈哈哈')
              wx.showToast({
                title: '您未上传附件 ! ! !',
                icon: 'none'
              })
              flag = true;
              return
            }  else {
              if(index === 9) {
                if (!flag) {
                  console.log('2838238428342349')
                  this.syncSubmit()
                };
               
              }
            }
          }
        })
      }
    })

   

  },

  // 同步跳转

  syncSubmit() {
    let data = {
      token: wx.getStorageSync('token'),
      userid: wx.getStorageSync('userid').userid,
      bjid: this.data.dataInfo.bjid,
      ywsx_id: this.data.dataInfo.bjinfo.ywsx_id,
    }
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: url.subBJBZInfo,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => {
        if (res.data.res_data.state === 1) {
    wx.navigateTo({
      url: '../progressItem/progressItem',
    })
        }
      }
    })
    wx.hideLoading()
  },


  //获取页面数据
  getData(e) {
    let _this = this;
    let data = {
      token: wx.getStorageSync('token'),
      bjid: e.bj_id
    }
    wx.request({
      url: url.viewBJBZInfoAndMaterials,
      data: data,
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      success: res => {

        if (res.data.res_data.state === 1) {
          _this.setData({
            dataInfo: res.data.res_data,

            bjTopData: res.data.res_data.bjinfo
          })

          console.log(_this.data.dataInfo)
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
  onLoad: function(options) {

    // this.bjTop(JSON.parse(options.detail))
    this.getData(JSON.parse(options.detail));


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.getData();
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