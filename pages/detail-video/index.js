import {fetchVideo, fetchVideoInfo,fetchRecommendInfo } from "../../services/api_video"

Page({
  data: {
    videoId:"",
    videoUrl:"",
    videoInfos:{},
    recommendInfos:[]
  },
  onLoad(options) {
    var id = options.id
    this.getData(id)
  },

   async getData(id) {
      var res1 = await fetchVideoInfo(id)
      this.setData({videoInfos: res1.data})
      var res2 = await fetchVideo(id)
      this.setData({videoUrl:res2.data.url})
      var recommendInfos = await fetchRecommendInfo(id)
      this.setData({recommendInfos:recommendInfos.data})
  }

})