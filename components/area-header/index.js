Component({

  properties: {
    title:{
      type:String,
      value:"默认标题"
    },
    showRight:{
      type:Boolean,
      value:true
    },
    rightText:{
      type:String,
      value:"更多"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMoreClick(){
      this.triggerEvent("click")
    }
  }
})
