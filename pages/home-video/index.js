import { fetchTopMv } from "../../services/api_video"

Page({

  data: {
    topMvs: [],
    hasMore: true
  },
  onLoad(options) {
    fetchTopMv(0, 10).then(res => {
      const result = res.data
      const hasMore = res.hasMore
      console.log(res.hasMore);
      this.setData({ topMvs: result, hasMore })
    })
  },
  onPullDownRefresh() {
    console.log("下拉刷新，重新请求数据")
    this.setData({hasMore:true})
    fetchTopMv(0).then(res => {
      const result = res.data
      this.setData({
        topMvs: result
      })
    })
  },
  onReachBottom() {
    console.log("滚动到页面底部，获取更多数据")
    if (!this.data.hasMore) return
    fetchTopMv(this.data.topMvs.length).then(res => {
      const hasMore = res.hasMore
      console.log(hasMore);
      this.setData({ topMvs: this.data.topMvs.concat(res.data), hasMore })
    })
  },
  handleVideoItemClick(event) {
    // 获取每个item的id到detail-video页面
    var id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  }
})