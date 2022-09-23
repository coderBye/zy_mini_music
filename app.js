// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    navBarHeight: 44
  },
  onLaunch(){
    const info = wx.getSystemInfoSync()
    // console.log(info);
    const screenWidth = info.screenWidth
    const screenHeight = info.screenHeight
    const statusBarHeight = info.statusBarHeight
    this.globalData.screenWidth = screenWidth
    this.globalData.screenHeight = screenHeight
    this.globalData.statusBarHeight = statusBarHeight
  }
})
