Page({
  data : {
    ctx : ''
  },
  onReady(res) {
    this.data.ctx = wx.createLivePlayerContext('player',this)
  },
  statechange(e) {
    // console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
    this.data.ctx.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    this.data.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.data.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.data.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindMute() {
    this.data.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  },
  bindMute1() {
    this.data.ctx.requestFullScreen({
      direction:90,
      success:(res)=>{
        console.log('全屏成功')
        console.log('全屏成功',res)
      },
      fail:res =>{
        console.log('全屏失败')
      },
      complete : res => {
        console.log('全屏完成',res)
      
      } 
    })
  },
  bindMute2() {
    this.data.ctx.exitFullScreen({
      success:res=>{
        console.log('退出成功')
      },
      fail:res=>{
        console.log('退出失败')
      }
    })
  },
  test(e){
    console.log(e)
  }
})