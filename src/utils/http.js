import axios from 'axios'

const http = axios.create({
  baseUrl: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default http
