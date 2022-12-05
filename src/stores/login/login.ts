import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/services/login/login'
import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types'
import { localCache } from '@/utils/cache'
import mapMenusToRoutes from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN, USER_INFO, USER_MENU } from '@/global/constants'
import { toast } from '@/utils/toast'
import useMainStore from '../main'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
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
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      // 将用户的菜单权限存到本地
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENU, userMenus)

      // 动态路由 >> 根据菜单信息，动态注册路由
      const roleRoutes = mapMenusToRoutes(userMenus)
      roleRoutes.forEach((route) => router.addRoute('main', route))

      // 发送请求，部门和角色数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 跳转页面
      router.push('/main')

      // 弹出消息
      toast('登录成功')
    },

    // 用户点击刷新页面时候，加载本地数据
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENU)

      if (token && userInfo && userMenus) {
        // 本地数据存储到store中
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 动态路由 >> 根据菜单信息，动态注册路由
        const roleRoutes = mapMenusToRoutes(userMenus)
        roleRoutes.forEach((route) => router.addRoute('main', route))
      }

      // 再次发送请求部门和角色数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    removeLocalCacheAction() {
      localCache.removeCache(LOGIN_TOKEN)
      localCache.removeCache(USER_INFO)
      localCache.removeCache(USER_MENU)
    }
  }
})

export default useLoginStore
