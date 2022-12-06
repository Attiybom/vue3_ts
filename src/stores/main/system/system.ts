import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import {
  postUserListData,
  deleteUserListData,
  createUser,
  updateUser,
  postPageListData,
  deletePageListData,
  createPageData,
  updatePageData
} from '@/services/main/system/system'
import useMainStore from '@/stores/main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0,

    pageList: [],
    pageTotalCount: 0
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

      return deleteRes
    },
    async createUserAction(data: any) {
      const createUserRes = await createUser(data)
      // 重新请求数据
      this.getUserListAction({ offset: 0, size: 10 })
      return createUserRes
    },
    async updateUserAction(id: number, data: any) {
      const updateRes = await updateUser(id, data)
      // console.log(updateRes)
      // 重新请求数据
      this.getUserListAction({ offset: 0, size: 10 })
      return updateRes
    },

    // page-action
    async getPageListAction(pagename: string, pageInfo: any) {
      const pageRes = await postPageListData(pagename, pageInfo)
      const { list, totalCount } = pageRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageListAction(pagename: string, id: number) {
      const deleteRes = await deletePageListData(pagename, id)
      // 重新请求数据
      this.getPageListAction(pagename, { offset: 0, size: 10 })

      // 数据发生变化，重新请求数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      return deleteRes
    },
    async createPageAction(pagename: string, data: any) {
      const createPageRes = await createPageData(pagename, data)
      // 重新请求数据
      this.getPageListAction(pagename, { offset: 0, size: 10 })

      // 数据发生变化，重新请求数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      return createPageRes
    },
    async updatePageAction(pagename: string, id: number, data: any) {
      const updateRes = await updatePageData(pagename, id, data)
      // 重新请求数据
      this.getPageListAction(pagename, { offset: 0, size: 10 })

      // 数据发生变化，重新请求数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      return updateRes
    }
  }
})

export default useSystemStore
