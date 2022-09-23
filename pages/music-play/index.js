import { fetchSongDetai, fetchSongLyric } from "../../services/api_music"
import { innerAudioContext } from "../../store/play-store"
import { parseLyric } from "../../utils/parse-lyric"


Page({
  data: {
    id:"",
    currentIndex:0,
    currentSong: {},
    statusBarHeight: getApp().globalData.statusBarHeight,
    contentHeight: 0,
    currentTime: 0,
    currentLyric: "",
    totalTime: 0,
    sliderValue: 0,
    isSlider: false
  },
  onLoad(options) {
    const ids = options.ids
    // 1. 获取歌曲信息
    fetchSongDetai(ids).then(res => {
      this.setData({ currentSong: res.songs[0], totalTime: res.songs[0].dt })
    })
    const globalData = getApp().globalData
    const contentHeight = globalData.screenHeight - (globalData.statusBarHeight + globalData.navBarHeight)
    this.setData({ contentHeight })
    // 2.歌曲播放
    innerAudioContext.autoplay = true
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${ids}.mp3`
    innerAudioContext.stop()
    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
    })
    innerAudioContext.onTimeUpdate(() => {
      if (this.data.isSlider) return
      const currentTime = innerAudioContext.currentTime * 1000
      const sliderValue = currentTime / this.data.totalTime * 100
      this.setData({ currentTime, sliderValue })
      //3.获取歌词数据
      fetchSongLyric(ids).then(res => {
        const lyrics = parseLyric(res.lrc.lyric)
        for (let i = 0; i < lyrics.length; i++) {
          if (this.data.currentTime < lyrics[i].time) {
            const currentLyric = lyrics[i - 1].text
            if (this.data.currentLyric !== currentLyric) {
              this.setData({ currentLyric })
            }
            break
          }
        }
      })
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
  }
})