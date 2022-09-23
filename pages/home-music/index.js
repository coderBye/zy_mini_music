import { homeStroe } from "../../store/index"
import { fetchBanner, fetchSongMenu, fetchTopRanking } from "../../services/api_home"

Page({
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSongs: [],
    hotSongsMenu: [],
    recommendSongsMenu: [],
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  onLoad(options) {
    this.getData()
    homeStroe.dispatch("getRecommnedSongsAction")
    homeStroe.dispatch("getTopRankingAction")

    homeStroe.onState("recommendSongs", (res) => {
      this.setData({ recommendSongs: res.slice(0, 6) })
    })
    homeStroe.onState("newRanking", res => {
      const result = this.handleRankingData(res)
      this.setData({ newRanking: result })
    })
    homeStroe.onState("originRanking", res => {
      const result = this.handleRankingData(res)
      this.setData({ originRanking: result })
    })
    homeStroe.onState("upRanking", res => {
      const result = this.handleRankingData(res)
      this.setData({ upRanking: result })
    })
  },
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/home-search/index',
    })
  },
  // 这里后期加节流函数做优化
  handleImageLoad() {
    const query = wx.createSelectorQuery()
    query.select('#image').boundingClientRect()
    query.exec((res) => {
      this.setData({ swiperHeight: res[0].height })
    })
  },
  // 网络请求
  getData() {
    fetchBanner().then(res => {
      this.setData({ banners: res.banners })
    })
    fetchSongMenu().then(res => {
      this.setData({ hotSongsMenu: res.playlists })
    })
    fetchSongMenu("华语").then(res => {
      this.setData({ recommendSongsMenu: res.playlists })
    })
  },
  handleRankingData(data) {
    if (Object.keys(data).length === 0) return
    const obj = {}
    obj.name = data.name
    const list = data.tracks.slice(0, 3)
    obj.tracks = list
    obj.coverImgUrl = data.coverImgUrl
    obj.playCount = data.playCount
    return obj
  },
  handleMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/index?type=' + 'hot',
    })
  },
  handleRankingClick(event) {
    const ranking = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/detail-song/index?type=' + 'ranking'  + '&ranking=' + ranking,
    })
  }
})