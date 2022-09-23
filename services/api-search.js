import request from './request'

export function fetchHotSearch(){
  return request.get("/search/hot")
}

export function fetchSeachSuggest(keywords,type="mobile"){
  return request.get("/search/suggest",{
    keywords:keywords,
    type:type
  })
}

export function fetchSeachMusic(keywords){
  return request.get("/cloudsearch",{
    keywords
  })
}