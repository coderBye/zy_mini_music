import { HYEventStore } from "hy-event-store"
import { fetchSongDetai, fetchSongLyric } from "../services/api_music"
import { parseLyric } from "../utils/parse-lyric"



const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: false
})

const playStroe = new HYEventStore({
  state: {
    ids: "",
    currentSong: {},
    sliderValue: 0,
    currentTime: "",
    totalTime: 0,
    currentLyric: "",
    currentLyricIndex: 0,
    lyrics: [],
    scrollTop: 0,
    playMode:0  //0：顺序播放  1：单曲循化  2：随机播放
  },
  actions: {
    getCurrentSongAction(ctx, { ids }) {
      console.log(ctx.ids ,ids);
      // if (ctx.ids == ids) return
      ctx.ids = ids
      // 防止换一首歌曲，出现上一首歌曲的信息
      ctx.currentSong = {}
      ctx.currentTime = 0
      ctx.totalTime = 0
      ctx.currentLyric = ""

      fetchSongDetai(ids).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.totalTime = res.songs[0].dt
      })
      fetchSongLyric(ids).then(res => {
        const lyrics = parseLyric(res.lrc.lyric)
        ctx.lyrics = lyrics
      })
      innerAudioContext.stop()
      innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${ids}.mp3`
      innerAudioContext.autoplay = true
      this.dispatch("setupAudioContextListenerAction")
    },
    setupAudioContextListenerAction(ctx) {
      innerAudioContext.onCanplay(() => {
        innerAudioContext.play()
      })
      innerAudioContext.onTimeUpdate(() => {
        const currentTime = innerAudioContext.currentTime * 1000
        const sliderValue = currentTime / ctx.totalTime * 100
        ctx.currentTime = currentTime
        ctx.sliderValue = sliderValue
        for (let i = 0; i < ctx.lyrics.length; i++) {
          if (ctx.currentTime < ctx.lyrics[i].time) {
            const currentLyric = ctx.lyrics[i - 1].text
            const scrollTop = (i - 1) * 35 - 130
            if (ctx.currentLyric !== currentLyric) {
              ctx.currentLyric = currentLyric
              ctx.scrollTop = scrollTop
              ctx.currentLyricIndex = i - 1
            }
            break
          }
        }
      })
    },
  }
})

export {
  innerAudioContext,
  playStroe
}