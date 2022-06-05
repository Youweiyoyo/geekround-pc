import React from 'react'
import Login from './login.Store'
class RootStore {
  constructor() {
    this.loginStore = new Login()
  }
}
const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export default useStore
