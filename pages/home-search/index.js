import { fetchHotSearch, fetchSeachSuggest,fetchSeachMusic } from "../../services/api-search"
import { playStroe } from "../../store/index"

Page({
  data: {
    searchContent: "",
    hotSearch: [],
    matchSearch: [],
    matchNodes: [],
    exactMatchMusics:[]
  },
  onLoad(options) {
    fetchHotSearch().then(res => {
      this.setData({ hotSearch: res.result.hots })
    })
  },
  // 自定义事件
  handleInputChange(event) {
    const searchContent = event.detail //根据内容去服务器请求数据【防抖优化】
    this.setData({ searchContent })
    if(!searchContent){
      this.setData({matchSearch:[]})
      this.setData({exactMatchMusics:[]})
      return
    }
    fetchSeachSuggest(searchContent).then(res => {
      const matchSearch = res?.result?.allMatch
      if (!matchSearch) return
      this.setData({ matchSearch })
      // 整合富文本的数据
      const keywords = matchSearch.map(item => item.keyword)
      const matchNodes = []
      keywords.forEach(keyword => {
        const nodes = []
        if (keyword.toUpperCase().startsWith(searchContent.toUpperCase())) {
          // 匹配到
          const key1 = keyword.slice(0, searchContent.length)
          const node1 = {
            name: "span",
            attrs: { style: "color: #26ce8a; font-size: 16px;" },
            children: [{ type: "text", text: key1 }]
          }
          nodes.push(node1)
          //未匹配到
          const key2 = keyword.slice(searchContent.length)
          const node2 = {
            name: "span",
            attrs: { style: "color: #000; font-size: 16px;" },
            children: [{ type: "text", text: key2 }]
          }
          nodes.push(node2)
        } else {
          const node = {
            name: "span",
            attrs: { style: "color: #000; font-size: 16px;" },
            children: [{ type: "text", text: keyword }]
          }
          nodes.push(node)
        }
        matchNodes.push(nodes)
      })
      this.setData({ matchNodes })
    })
  },
  handleMusicMatchClick(event){
    const name = event.currentTarget.dataset.item.first || event.currentTarget.dataset.item.keyword
    this.setData({ searchContent:name })
    fetchSeachMusic(name).then(res => {
      this.setData({ exactMatchMusics: res.result.songs })
    })
  },
  handleMusicItemClick(event){
    const ids = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/music-play/index?ids=' + ids,
    })
    playStroe.dispatch("getCurrentSongAction",{ ids })
  }
})
