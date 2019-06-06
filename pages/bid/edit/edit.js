  // pages/bid/edit/edit.js
  const app = getApp()
  import url from '../../../fetch.js'
  Page({
    /**
     * 页面的初始数据
     */
    data: {

      flagEdit :false,
      adItems: [{
          name: "1",
          value: "经营性"
        },
        {
          name: "2",
          value: "公益性"
        }
      ],
      property: [{
          name: "租赁",
          value: 0
        },
        {
          name: "非租赁",
          value: 1
        }
      ],
      data: {
        token: '',
        accid: '', //用户ID
        userid: "", //用户id
        sxid: "", //事项id
        bjid: "", //办件id
        clid: "", //材料id
        eformcode: "hwgg", //eformcode
        baseidforupload: "", //表单唯一提交不可为空，设置32为uuid
        // "base.base_ctime": "", //表单创建时间
        szdd: "", //设置地点
        szgg: "", //设置规格
        ssxs: "", //设施形式
        ssxsmc: "", //设施形式名称1为牌匾；2为广告牌；3为霓虹灯；4为灯箱；5为标识牌；6为实物造型；7为公告栏；8为宣传栏；9为其他；
        czjg: "", //1为亚克力;2为钢结构;3为铝塑板; 4为 其他
        czjgmc: "", //材质结构名称
        gyxs: "", //光源形式 1 为led 2为内光源3为其他
        gyxsmc: "", //光源性质名称
        ggnr: "", //广告内容
        "base.base_sqdw": "", //申请单位
        "base.base_lxr": "", //联系人
        "base.base_dz": "", //联系地址
        "base.base_sqdwlxdh": "", //申请人联系电话
        "base.base_sgdw": "", //施工单位
        "base.base_sgdwlxdh": "", //施工单位联系电话
        "base.base_ggxz": "", //广告性质（1是经营性，2公益性）
        "base.base_cqlx": "", //产权类型1为租赁2为非租赁
        "base.base_zlkssj": "", //租赁开始时间
        "base.base_zljssj": "", //租赁结束时间
        "base.base_kssj": "", //设置开始时间
        "base.base_jssj": "" //设置结束时间
      },
      ssxsgArray: [{
          id: 1,
          name: '牌匾'
        },
        {
          id: 2,
          name: '广告牌'
        },
        {
          id: 3,
          name: '霓虹灯'
        },
        {
          id: 4,
          name: '灯箱'
        },
        {
          id: 5,
          name: '标识牌'
        },
        {
          id: 6,
          name: '实物造型'
        },
        {
          id: 7,
          name: '广告栏'
        },
        {
          id: 8,
          name: '宣传栏'
        },
        {
          id: 9,
          name: '其它'
        },
      ],
      czjgArray: [{
          id: 1,
          name: '亚克力'
        },
        {
          id: 2,
          name: '钢结构'
        },
        {
          id: 3,
          name: '铝塑板'
        },
        {
          id: 4,
          name: '其它'
        }
      ],
      gyxsArray: [{
          id: 1,
          name: 'LED'
        },
        {
          id: 2,
          name: '内光源'
        },
        {
          id: 3,
          name: '其他'
        },
      ],
      fid: '', //删除文件ID
      ggnr: '', //广告内容
      ssxsmc: '', //设置形式名称
      czjgmc: '', //材料结构名称
      gyxsmc: '', //光源性质
      propertyValue: "", //产权类型
      flag: true, //租赁状态
      bindDateChangeValue: "", //开始时间
      bindDateChangeEndValue: "", //结束时间
      imgUrl: "" //上传图片路径
    },

    bindPickerChange(e) {
      if (e.detail.value == 1) {
        this.setData({
          flag: false,
          propertyValue: this.data.property[e.detail.value].name
        });
      } else {
        this.setData({
          flag: true,
          propertyValue: this.data.property[e.detail.value].name
        });
      }
    },


//编辑提交


    //提交
    submitEdit() {

    //  新增和上传参数不一样  编辑没有baseidforupload
     
    
      //新增提交
      if (!this.data.flagEdit) {
     

        wx.showLoading({
          title: '加载中',
        })
   

        this.data.data.bjid = app.globalData.getMaterials.bjid;
        this.data.data.sxid = app.globalData.getMaterials.sxid;
        this.data.data.clid = wx.getStorageSync('uploadInfo')[0].id;

        this.data.data.token = wx.getStorageSync('token')
        this.data.data.userid = wx.getStorageSync('userid').userid
        this.data.data.accid = wx.getStorageSync('userid').userid
        // if (url.rules(this.data.data)) return
        wx.request({
          url: url.submitEform2, //事项申办提交进本信息,
          data: this.data.data,
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "post",
          success: res => {
            wx.hideLoading()
            if (res.data.res_data.state == 1) {
              wx.setStorageSync('edit', this.data.data)
              wx.setStorageSync('szsqxks', '3')

              wx.navigateBack({
                
              })

            } else {
              if (res.data.res_data.state == 0) {
           

                wx.showToast({
                  title: '登录失效请冲重新登录 ! ! !',
                })
                wx.navigateTo({
                  url: '../../log',
                })
              } else {
                wx.showToast({
                  title: '请检查输入 ! ! !',
                  icon : 'none',
                })
              }

            }
          

          }
        });
      } else {

        //编辑

       
        // if (url.rules(this.data.data)) return

        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: url.updateEform2, //事项申办提交进本信息,
          data: this.data.data,
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "post",
          success: res => {
            wx.hideLoading()

            if (res.data.res_data.state == 1) {
              wx.setStorageSync('edit', this.data.data)
              wx.setStorageSync('szsqxks', '3')
              wx.navigateBack({
                
              })
            } else {
              wx.showToast({
                title: '登录失效请冲重新登录 ! ! !',
              })
              wx.navigateTo({
                url: '../../log',
              })
            }
          }
        });
      }

    },

    back () {
      wx.navigateBack({
        url: '../bid',
      })
    },

    //删除文件
    delete() {
      let data = {
        user_id: wx.getStorageSync('userid').userid,
        fid: this.data.fid.fid
      }
      wx.request({
        url: url.delFile,
        data: data,
        success: res => {

        }
      })
    },

    //截取图片地址

    getImgUrl(str, fid, name) {
      let index = str.indexOf('webapps');
      console.log(str.substr(index + 7))

      return url.imgUrl + str.substr(index + 7) + '/' + fid + name
    },



    //上转材料
    uploadFile() {
      let that = this;
      let data =""
      if (!this.data.flagEdit) {
        data = `&userid=${wx.getStorageSync('userid').userid}&object_id=${this.data.data.baseidforupload}`

      } else {
        //编辑
        url.deleteField(this.data.fileId)
        data = `&userid=${wx.getStorageSync('userid').userid}&object_id=${this.data.base_id}&filetype=ts`
    

      }
      wx.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths
          tempFilePaths.forEach((el,index) => {
            wx.uploadFile({
              url: url.fileuploadSqcl + data, // 仅为示例，非真实的接口地址
              filePath: tempFilePaths[index],
              name: 'file',
              success: (res) => {
                let obj = JSON.parse(res.data);
                that.data.fid = obj.fid
                wx.setStorageSync('editImg', that.getImgUrl(obj.savePath, obj.fid, obj.endName))
                that.setData({
                  imgUrl: that.getImgUrl(obj.savePath, obj.fid, obj.endName)
                })

                app.globalData.fid[0] = that.data.fid
                // do something
              }
            })
          })

        }
      })
    },

    //申请单位
    base_sqdw(e) {
      this.data.data["base.base_sqdw"] = e.detail.value;
    },

    //申请单位
    base_lxr(e) {
      this.data.data["base.base_lxr"] = e.detail.value;
    },

    //地址
    base_dz(e) {
      this.data.data["base.base_dz"] = e.detail.value;
    },

    //联系电话
    base_sqdwlxdh(e) {
      this.data.data["base.base_sqdwlxdh"] = e.detail.value;
    },

    //施工单位
    base_sgdw(e) {
      this.data.data["base.base_sgdw"] = e.detail.value;
    },

    //施工单位联系电话
    base_sgdwlxdh(e) {
      this.data.data["base.base_sgdwlxdh"] = e.detail.value;
    },

    //广告性质
    base_ggxz(e) {
      this.data.data["base.base_ggxz"] = e.detail.value;
      console.log(this.data.data);
    },

    //产权类型
    base_cqlx(e) {
      this.data.data["base.base_cqlx"] = e.detail.value;
      if (e.detail.value == 1) {
        this.setData({
          flag: false,
          propertyValue: this.data.property[e.detail.value].name
        });
      } else {
        this.setData({
          flag: true,
          propertyValue: this.data.property[e.detail.value].name
        });
      }
    },

    //设置租赁开始时间
    base_zlkssj(e) {
      this.data.data["base.base_zlkssj"] = e.detail.value;
      this.setData({
        base_zlkssj: this.data.data["base.base_zlkssj"]
      })
    },

    //设置租赁开始时间
    base_zljssj(e) {
      this.data.data["base.base_zljssj"] = e.detail.value;
      this.setData({
        base_zljssj: this.data.data["base.base_zljssj"]
      })
    },

    //设置地点
    szdd(e) {
      this.data.data.szdd = e.detail.value;
    },

    //设置规格
    szgg(e) {
      this.data.data.szgg = e.detail.value;
    },

    //设置形式
    ssxs(e) {
      this.data.data.ssxs = this.data.ssxsgArray[e.detail.value].id;
      this.data.data.ssxsmc = this.data.ssxsgArray[e.detail.value].name;
      this.setData({
        ssxsmc: this.data.data.ssxsmc
      })
      console.dir(this.data.data)

    },

    //材料结构
    czjg(e) {
      this.data.data.czjg = this.data.czjgArray[e.detail.value].id;
      this.data.data.czjgmc = this.data.czjgArray[e.detail.value].name;
      this.setData({
        czjgmc: this.data.data.czjgmc
      })
    },

    //光源形式
    gyxs(e) {
      this.data.data.gyxs = this.data.gyxsArray[e.detail.value].id;
      this.data.data.gyxsmc = this.data.gyxsArray[e.detail.value].name;
      this.setData({
        gyxsmc: this.data.data.gyxsmc
      })
    },

    //广告内容
    ggnr(e) {
      this.data.data.ggnr = e.detail.value;
      this.setData({
        ggnr: this.data.data.ggnr
      })
    },
    //开始时间

    base_kssj(e) {
      this.data.data['base.base_kssj'] = e.detail.value;
      this.setData({
        base_kssj: e.detail.value
      });
    },
    base_jssj(e) {
      this.data.data['base.base_jssj'] = e.detail.value;
      this.setData({
        base_jssj: e.detail.value
      });
    },

    //设置uuid
      setUuid(that,data2) {
        
        that.data.data.baseidforupload = data2
        
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      wx.setStorageSync('szsqxks', '2')
      url.uuid(this, this.setUuid);
      if (JSON.stringify(options).length<3) {
        let getStrog = wx.getStorageSync('edit')

        if(!getStrog) return
        this.setData({
          disabled: '',
          // imgUrl: wx.getStorageSync('editImg'),
          data: getStrog,
          czjgmc: getStrog.czjgmc, //材质结构名称
          ssxsmc: getStrog.ssxsmc, //设施形式名称1为牌匾；2为广告牌；3为霓虹灯；4为灯箱；5为标识牌；6为实物造型；7为公告栏；8为宣传栏；9为其他；
          gyxsmc: getStrog.gyxsmc, //光源性质名称
          ggnr: getStrog.ggnr, //广告内容
          base_kssj: getStrog["base.base_kssj"], //设置开始时间
          base_jssj: getStrog["base.base_jssj"],//设置结束时间
          // base_zlkssj: data.base.base_zlkssj, //设置结束时间
          // base_zljssj: data.base.base_zljssj, //设置结束时间
          // base_id: getStrog.base_id,
        })


        //是否租赁

        if (getStrog["base.base_cqlx"] == 0) {
          this.setData({
            flag: true,
            propertyValue: '租赁',
            base_zlkssj: getStrog["base.base_zlkssj"], //设置结束时间
            base_zljssj: getStrog["base.base_zljssj"], //设置结束时间
          })
        } else {
          this.setData({
            flag: false,
            propertyValue: '非租赁',
          })
        }
        if (getStrog["base.base_ggxz"] === 1) {
          this.setData({
            adItems: [{
              name: "1",
              value: "经营性",
              checked: true
            },
            {
              name: "2",
              value: "公益性"
            }
            ],
          })
        } else {
          this.setData({
            adItems: [{
              name: "1",
              value: "经营性"
            },
            {
              name: "2",
              value: "公益性",
              checked: true
            }
            ],
          })

        }


 


        return;
      } 
      this.data.flagEdit = true;
      
      let data = JSON.parse(options.data);

      console.log(data)
      this.setData({
        data: {
          token: wx.getStorageSync('token'),
          // accid: wx.getStorageSync('userid').userid, //用户ID
          userid: wx.getStorageSync('userid').userid, //用户id
          sxid: data.sqsx[0].sqsx_id, //事项id
          bjid: data.bjid, //办件id
          clid: data.clid, //材料id
          eformcode: "hwgg", //eformcode
          // baseidforupload: "", //表单唯一提交不可为空，设置32为uuid
          // "base.base_ctime": "", //表单创建时间
          szdd: data.sqsx[0].sqsx_szdd, //设置地点
          szgg: data.sqsx[0].sqsx_szgg, //设置规格
          ssxs: data.sqsx[0].sqsx_ssxs, //设施形式
          ssxsmc: data.sqsx[0].sqsx_ssxsmc, //设施形式名称1为牌匾；2为广告牌；3为霓虹灯；4为灯箱；5为标识牌；6为实物造型；7为公告栏；8为宣传栏；9为其他；
          czjg: data.sqsx[0].sqsx_cljg, //1为亚克力;2为钢结构;3为铝塑板; 4为 其他
          czjgmc: data.sqsx[0].sqsx_cljgmc, //材质结构名称
          gyxs: data.sqsx[0].sqsx_gyxs, //光源形式 1 为led 2为内光源3为其他
          gyxsmc: data.sqsx[0].sqsx_gyxsmc, //光源性质名称
          ggnr: data.sqsx[0].sqsx_ggnr, //广告内容
          "base.base_sqdw": data.base.base_sqdw, //申请单位
          "base.base_lxr": data.base.base_lxr, //联系人
          "base.base_dz": data.base.base_dz, //联系地址
          "base.base_sqdwlxdh": data.base.base_sqdwlxdh, //申请人联系电话
          "base.base_sgdw": data.base.base_sgdw, //施工单位
          "base.base_sgdwlxdh": data.base.base_sgdwlxdh, //施工单位联系电话
          "base.base_ggxz": data.base.base_ggxz, //广告性质（1是经营性，2公益性）
          "base.base_cqlx": data.base.base_cqlx, //产权类型0为租赁1为非租赁
          // "base.base_zlkssj": data.base.base_zlkssj, //租赁开始时间
          // "base.base_zljssj": data.base.base_zljssj, //租赁结束时间
          "base.base_kssj": data.base.base_kssj, //设置开始时间
          "base.base_jssj": data.base.base_jssj, //设置结束时间
          "base.base_id": data.base.base_id
        },
        czjgmc: data.sqsx[0].sqsx_cljgmc, //材质结构名称
        ssxsmc: data.sqsx[0].sqsx_ssxsmc, //设施形式名称1为牌匾；2为广告牌；3为霓虹灯；4为灯箱；5为标识牌；6为实物造型；7为公告栏；8为宣传栏；9为其他；
        gyxsmc: data.sqsx[0].sqsx_gyxsmc, //光源性质名称
        ggnr: data.sqsx[0].sqsx_ggnr, //广告内容
        base_kssj : data.base.base_kssj, //设置开始时间
        base_jssj : data.base.base_jssj,//设置结束时间
        // base_zlkssj: data.base.base_zlkssj, //设置结束时间
        // base_zljssj: data.base.base_zljssj, //设置结束时间
        base_id: data.base.base_id,
        // fileId: 

      })


      // 设置是否租赁 
      if (data.base.base_cqlx === 0) {
          this.setData({
            data : {
          "base.base_zlkssj": data.base.base_zlkssj, //租赁开始时间
          "base.base_zljssj": data.base.base_zljssj, //租赁结束时间
            },
            base_zlkssj: data.base.base_zlkssj, //设置结束时间
            base_zljssj: data.base.base_zljssj, //设置结束时间
          })
      }

      if (data.positionPics.length) {
        this.data.fileId = data.positionPics[0].id
      }

      //设置产权类型
      if (data.base.base_cqlx === 0) {
        this.setData({
          propertyValue: '租赁',

        })
      } else {
        this.setData({
          propertyValue: '非租赁',

        })
      }

      //设置广告性质

      if (data.base.base_ggxz === 1) {
        this.setData({
          adItems: [{
              name: "1",
              value: "经营性",
              checked: true
            },
            {
              name: "2",
              value: "公益性"
            }
          ],
        })
      } else {
        this.setData({
          adItems: [{
              name: "1",
              value: "经营性"
            },
            {
              name: "2",
              value: "公益性",
              checked: true
            }
          ],
        })

      }

      // /获得请求上传图片
      console.log(data)

      if (data.positionPics.length > 0) {
      wx.request({
      
        url: url.getBjInfoFiled + `&clid=${data.positionPics[0].id}`,
        success : res => {
          console.log(res)

            this.setData({
              imgUrl: url.retutnUrl + `?id=${data.positionPics[0].id}`,

            })

        }
      })
      }


      //是否租赁

      if (data.base.base_cqlx === 0) {
        this.setData({
          flag : true
        })
      } else {
        this.setData({
          flag: false
        })
      }

      //判断编辑还是查看
      if (options.view) {
        this.setData({
          disabled: 'disabled'
        })
        return
      } else {
        this.setData({
          disabled: ""
        })
      }
     
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
      wx.setStorageSync('router_edit', '1')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
  });