// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    navBarHeight: 44,
    deviceRadio:0
  },
  onLaunch(){
    const info = wx.getSystemInfoSync()
    const screenWidth = info.screenWidth
    const screenHeight = info.screenHeight
    const statusBarHeight = info.statusBarHeight
    const deviceRadio = screenHeight / screenWidth
    this.globalData.screenWidth = screenWidth
    this.globalData.screenHeight = screenHeight
    this.globalData.statusBarHeight = statusBarHeight
    this.globalData.deviceRadio = deviceRadio
  }
})
