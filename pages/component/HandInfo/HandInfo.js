// pages/component/HandInfo/HandInfo.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {

    bjInfoData: {
      type: Object,
      value: '',

      observer(newVal, oldVal, changedPath) {
       
        if(newVal) {
          this.setData({
            bjInfo: newVal.zt,
            construction: newVal.construction,
            bjInfoProgress: newVal.history
          }
          )
        }
      }
    }
  },

  lifetimes: {
    ready() {
      // console.log(this.data.bjInfoData)

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bjInfo : {},
    flag: true,
    bjClass: 'info-top',
    progressClass: 'process-bottom',
    detail: "",
    title: '事件一',
    time:'2019-01-28 15:07:25',
    person: '张',
    yijian: '无',
    array: [{ title: '申请营业执照',time: '2019-01-28 15:07:25' }, { title: '产权证明',time: '2019-01-28 15:07:25' }, { title: '设置户外申请书',time: '2019-01-28 15:07:25' }, { title: '计算机彩绘照片',time: '2019-01-28 15:07:25' }, { title: '计算机绘制',time: '2019-01-28 15:07:25' }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _bjInfo() {
      
      this.triggerEvent('myFlag', this.data.flag, this.data.flag)
 
      this.setData({
        flag: true,
        bjClass: 'info-top',
        progressClass: 'process-bottom'
      })
    },
    myflag(e){
        console.log(e)
    },
    _bjProgress() {


      this.triggerEvent('myFlag',this.data.flag,this.data.flag)
      this.setData({
        bjClass: 'info-top02',
        progressClass: 'process-bottom02',
        flag: false
      })
    }
  }
})