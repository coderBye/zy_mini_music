import request from './request'

// 获取歌曲的详细信息
export function fetchSongDetai(ids){
  return request.get("/song/detail",{
    ids
  })
}
// 歌词信息
export function fetchSongLyric(id){
  return request.get("/lyric",{
    id
  })
}