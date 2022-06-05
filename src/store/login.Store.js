import { makeAutoObservable } from 'mobx'
import { Http, getToken, setToken } from '@/utils'
class LoginStore {
  token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }
  // 验证码：246810
  getToken = async ({ mobile, code }) => {
    const res = await Http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code,
    })
    this.token = res.data.token
    setToken(this.token)
  }
}

export default LoginStore
