import React from 'react'
import Login from './login.Store'
import User from './user.Store'
import channel from './channel.Store'
class RootStore {
  constructor() {
    this.loginStore = new Login()
    this.userStore = new User()
    this.channelStore = new channel()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export default useStore
