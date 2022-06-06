import { makeAutoObservable } from 'mobx'
import { http, getToken, setToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }
  // 验证码：246810
  getToken = async ({ mobile, code }) => {
    const res = await http.post('/authorizations', {
      mobile,
      code,
    })
    this.token = res.data.token
    setToken(this.token)
  }
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore
