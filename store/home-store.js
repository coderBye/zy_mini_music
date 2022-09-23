import { HYEventStore } from "hy-event-store"

import {fetchRecommendSong, fetchTopRanking } from "../services/api_home"

const rankingMap = [
  { name: "新歌榜", label: "newRanking" },
  { name: "原创榜", label: "originRanking" },
  { name: "飙升榜", label: "upRanking" }
]


const homeStroe = new HYEventStore({
  state: {
    recommendSongs: [],
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    getRecommnedSongsAction(ctx) {
      fetchRecommendSong().then(res => {
        const result = res.playlist.tracks
        ctx.recommendSongs = result
      })
    },
    getTopRankingAction(ctx) {
      for (const item of rankingMap) {
        fetchTopRanking(item.name).then(res => {
          ctx[item.label] = res.playlist
        })
      }
    }
  }
})

export {
  homeStroe
}