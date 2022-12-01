import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/services/login/login'
import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN, USER_INFO, USER_MENU } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENU) ?? []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)

      // 登录操作，获取token等信息，并存储到store
      const id = loginRes.data.id
      this.token = loginRes.data.token

      // 将token存储到本地
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取用户信息(特别是角色信息)
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 根据角色信息，获取用户的菜单权限
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      // console.log(userMenusRes)
      const userMenu = userMenusRes.data
      this.userMenus = userMenu

      // 将用户的菜单权限存到本地
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENU, userMenu)

      // 跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
