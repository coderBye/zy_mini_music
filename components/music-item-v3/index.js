// components/music-item-v3/index.js
Component({
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index:{
      type:Number,
      value:0
    }
  },
  data: {

  },
  methods: {
    handleMusicItemClick(){
      this.triggerEvent("click")
    }
  }
})
