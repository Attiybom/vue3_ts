import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { postUserListData } from '@/services/main/system/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0
  }),
  actions: {
    async getUserListAction() {
      const res = await postUserListData()
      // console.log(res)
      const { list: userList, totalCount } = res.data
      this.userList = userList
      this.totalCount = totalCount
    }
  }
})

export default useSystemStore
