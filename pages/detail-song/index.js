import { homeStroe } from "../../store/index"
import { detailSongsHeader } from "../../mook/detail-songs"

Page({
  data: {
    type:"",
    infos:[],
    headerData:{}
  },
  onLoad(options) {
    const type = options.type
    this.setData({type:type})
    if (type === "hot"){
      homeStroe.onState("recommendSongs",res => {
        this.setData({infos:res})
      })
    }else{
      this.setData({headerData:detailSongsHeader})
      homeStroe.onState(options.ranking,res => {
        this.setData({infos:res.tracks})
      })
    }
   
  },
})