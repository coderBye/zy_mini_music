import request from "./request"

// 请求视频页面的数据【数据有限制的】
export function fetchTopMv(offset,limit=10){
     return request.get("/top/mv",{
       limit:limit,
       offset:offset
     })
}
// 请求视频详情的数据
export function fetchVideoInfo(id){
  return request.get("/mv/detail",{
    mvid:id
  })
}
// 请求播放视频的数据
export function fetchVideo(id){
  return request.get("/mv/url",{
    id
  })
}
// 请求推荐视频数据
export function fetchRecommendInfo(id){
  return request.get("/related/allvideo",{
    id
  })
}