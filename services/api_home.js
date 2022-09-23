import request from './request'

//获取轮播图的数据 
export function fetchBanner(){
  return request.get("/banner")
}
// 获取推荐歌曲的数据【依据/topList里面的数据，请求数据】
export async function fetchRecommendSong(){
   const hotId = await request.get("/toplist").then(res => {
    const result = res.list.find(item => item.name==="热歌榜") 
    return result.id
  })
  return request.get("/playlist/detail",{id:hotId})
}
// 热门歌单-推荐歌单数据
export function fetchSongMenu(cat="全部", limit=6, offset=0) {
  return request.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}
// 巅峰榜数据
export function fetchTopRanking(name){
  return request.get("/toplist").then(res => {
    return res.list.find(item => item.name === name)
  }).then(res => {
    const id = res.id
    return request.get("/playlist/detail",{id})
  })
}


