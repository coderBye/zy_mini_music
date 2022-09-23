import { BASE_URL, TIMEOUT  } from "./config"

class zyRequest{
  request(url,method,parmas){
    return new Promise((resolve,reject) => {
      wx.request({
        url: BASE_URL + url,
        method:method,
        timeout:TIMEOUT,
        data:parmas,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err){
          reject(err)
        } 
      })
    })
  }
  get(url,parmas){
    return this.request(url,"GET",parmas)
  }
  post(url, data){
    return this.request(url,"POST",data)
  }
}

const request = new zyRequest()

export default request