import { makeAutoObservable } from 'mobx'
import Http from '@/utils/http'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }

  loadChannelList = async () => {
    const res = await Http.get('/channels')
    this.channelList = res.data.channels
  }
}
export default ChannelStore
