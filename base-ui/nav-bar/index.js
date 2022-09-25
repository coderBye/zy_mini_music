Component({
  properties: {

  },
  data: {
    statusBarHeight:getApp().globalData.statusBarHeight,
    navBarHeight:getApp().globalData.navBarHeight
  },

  methods: {
    handleLeftClick(){
      this.triggerEvent("click")
    }
  }
})
