import { fetchVideo, fetchVideoInfo, fetchRecommendInfo } from "../../services/api_video"
import { recommendVideo } from "../../mook/recommed-video"

Page({
  data: {
    videoId: "",
    videoUrl: "",
    videoInfos: {},
    recommendInfos: []
  },
  onLoad(options) {
    var id = options.id
    this.setData({ videoId: id })
    this.getData(id)
  },

  async getData(id) {
    var res1 = await fetchVideoInfo(id)
    this.setData({ videoInfos: res1.data })
    var res2 = await fetchVideo(id)
    this.setData({ videoUrl: res2.data.url })
    // var recommendInfos = await fetchRecommendInfo(id)  //这里的数据有点问题，就mook了
    // this.setData({ recommendInfos })
    this.setData({recommendInfos:recommendVideo.data})
  }

})