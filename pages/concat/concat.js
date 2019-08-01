Page({
  data: {
    markers: [{
      // iconPath: "../../static/images/localtion.png",
      id: 0,
      latitude: 39.070220,
      longitude: 117.249500,
      width: 30,
      height: 30,
      // title:'天津市河西区行政许可服务中心',
      callout:{
        content: '点我导航',
        fontSize: '30rpx',
        display: 'ALWAYS',
        color: '#ffffff',
        bgColor: '#2780c0',
        borderRadius: '60rpx', 
        padding:6,
      
        textAlign:'center'
        }
    }],

  },
 
  markertap(e) {
    // console.log(44444)
       wx.openLocation({//​使用微信内置地图查看位置。
        latitude: 39.070220,//要去的纬度-地址
        longitude: 117.249500,//要去的经度-地址
        name: "天津市河西区行政许可服务中心",
        address: '天津市河西区洞庭路20号'
      })
  },
  qipao(){
    wx.openLocation({//​使用微信内置地图查看位置。
      latitude: 39.070220,//要去的纬度-地址
      longitude: 117.249500,//要去的经度-地址
      name: "天津市河西区行政许可服务中心",
      address: '天津市河西区洞庭路20号'
    })
  },
  regionchange(){
    console.log(333)
  }

  
})