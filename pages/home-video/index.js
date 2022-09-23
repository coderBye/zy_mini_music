import { fetchTopMv } from "../../services/api_video"

Page({

  data: {
    topMvs:[]
  },
  onLoad(options) {
    fetchTopMv(0,10).then(res => {
      const result = res.data
        this.setData({
          topMvs: result
        })
    })
  },
  onPullDownRefresh() {
    console.log("下拉刷新，重新请求数据")
    fetchTopMv(0).then(res => {
      const result = res.data
        this.setData({
          topMvs: result
        })
    })
  },
  onReachBottom() {
    console.log("滚动到页面底部，获取更多数据")
    fetchTopMv(this.data.topMvs.length).then(res => {
      this.setData({topMvs:this.data.topMvs.concat(res.data)})
    })
  },
  handleVideoItemClick(event){
    // 获取每个item的id到detail-video页面
      var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  }
})