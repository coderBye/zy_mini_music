import { innerAudioContext } from "../../store/play-store"
import { playStroe } from "../../store/index"

Page({
  data: {
    id: "",
    currentIndex: 0,
    currentSong: {},
    statusBarHeight: getApp().globalData.statusBarHeight,
    contentHeight: 0,
    currentTime: 0,
    currentLyric: "",
    currentLyricIndex: 0,
    scrollTop: 0,
    totalTime: 0,
    sliderValue: 0,
    isSlider: false,
    lyrics: [],
    isShowLyric: true,
    playMode: 0,  //0：顺序播放  1：单曲循化  2：随机播放
    playModeList: ["order", "repeat", "random"]
  },
  onLoad(options) {
    // 1. 获取歌曲/歌词信息
    this.getData()
    // 2.获取设备顶部高度
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - (globalData.statusBarHeight + globalData.navBarHeight)
    const isShowLyric = globalData.deviceRadio >= 2 ? true : false
    this.setData({ contentHeight, isShowLyric })
  },
  // 网络请求
  getData() {
    playStroe.onStates(["currentSong", "currentTime", "totalTime", "sliderValue"], ({
      currentSong,
      currentTime,
      totalTime,
      sliderValue
    }) => {
      if (currentSong) this.setData({ currentSong })
      if (currentTime && !this.data.isSlider) this.setData({ currentTime })
      if (totalTime) this.setData({ totalTime })
      if (sliderValue && !this.data.isSlider) this.setData({ sliderValue })
    })

    playStroe.onStates(["lyrics", "currentLyric", "currentLyricIndex"], ({
      lyrics,
      currentLyric,
      currentLyricIndex
    }) => {
      if (lyrics) this.setData({ lyrics })
      if (currentLyric) this.setData({ currentLyric })
      if (currentLyricIndex) this.setData({ currentLyricIndex })
    })

    playStroe.onStates(["scrollTop"], ({
      scrollTop
    }) => {
      if (scrollTop) this.setData({ scrollTop })
    })
  },
  // 事件处理
  handleSliderChange(event) {
    // IOS真机滑动进度条有问题
    const sliderValue = event.detail.value
    const currentTime = this.data.totalTime * sliderValue / 100
    innerAudioContext.stop()
    innerAudioContext.seek(currentTime / 1000)
    this.setData({ sliderValue, currentTime, isSlider: false })

  },
  handleSliderChanging(event) {
    const sliderValue = event.detail.value
    const currentTime = this.data.totalTime * sliderValue / 100
    this.setData({ currentTime, isSlider: true })
  },
  handleSwiperChange(event) {
    const currentIndex = event.detail.current
    this.setData({ currentIndex })
  },
  handleBackClick() {
    wx.navigateBack()
  },
  handlePlayMode() {
    let index = this.data.playMode + 1
    if (index >= this.data.playModeList.length) index = 0
    this.setData({ playMode: index })
  }
})