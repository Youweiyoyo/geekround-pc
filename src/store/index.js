import React from 'react'
import Login from './login.Store'
import User from './user.Store'
class RootStore {
  constructor() {
    this.loginStore = new Login()
    this.userStore = new User()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export default useStore
