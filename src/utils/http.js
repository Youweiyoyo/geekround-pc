import axios from 'axios'
import { getToken, removeToken } from './token'
import history from './history'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    //  请求头增加 token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 使用 React 包实现路由跳转
      history.push('/login')
      removeToken()
    }
    return Promise.reject(err)
  }
)

export default http
