import { defineStore } from 'pinia'
import { postRoleList, postDepartmentList } from '@/services/main'

interface IMainState {
  roleList: any[]
  departmentList: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    roleList: [],
    departmentList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRes = await postRoleList()
      const departmentRes = await postDepartmentList()

      this.roleList = roleRes.data.list
      this.departmentList = departmentRes.data.list
    }
  }
})

export default useMainStore
