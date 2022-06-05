const PC_Key = 'pc_token'

function setToken(token) {
  return window.localStorage.setItem(PC_Key, token)
}

function getToken() {
  return window.localStorage.getItem(PC_Key)
}

function removeToken() {
  return window.localStorage.removeItem(PC_Key)
}

export { setToken, getToken, removeToken }
