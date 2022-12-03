import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import {
  postUserListData,
  deleteUserListData,
  createUser
} from '@/services/main/system/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo: any) {
      const res = await postUserListData(queryInfo)
      // console.log(res)
      const { list: userList, totalCount } = res.data
      this.userList = userList
      this.totalCount = totalCount
    },
    async deleteUserListAction(id: number) {
      const deleteRes = await deleteUserListData(id)

      // 重新请求数据
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async createUserAction(data: any) {
      const createUserRes = await createUser(data)
      console.log(createUserRes)
      
      // 重新请求数据
      this.getUserListAction({ offset: 0, size: 10 });
    }
  }
})

export default useSystemStore
