import axios from 'axios'
import Qs from 'qs'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;utf-8'

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://www.wangdu.site',  // api的base_url
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // console.log(config);
  if (config.method === 'get') {
      // paramsSerializer序列化
    config.paramsSerializer = function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }
  // deal post request
  if (config.method === 'post') {
    config.transformRequest = [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        if (data[it] === null || data[it] === undefined) {
          data[it] = ''
        }
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  }
  return config
},error => {
  console.error(error);
})

instance.interceptors.response.use(res =>{
  return res.data
},error => {
  console.error(error)
})

export default instance