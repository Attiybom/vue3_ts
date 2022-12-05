import { defineStore } from 'pinia'
import { postRoleList, postDepartmentList, postMenuList } from '@/services/main'

interface IMainState {
  roleList: any[]
  departmentList: any[]
  menuList: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    roleList: [],
    departmentList: [],
    menuList: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRes = await postRoleList()
      const departmentRes = await postDepartmentList()
      const menuRes = await postMenuList()

      this.roleList = roleRes.data.list
      this.departmentList = departmentRes.data.list
      this.menuList = menuRes.data.list
    }
  }
})

export default useMainStore
