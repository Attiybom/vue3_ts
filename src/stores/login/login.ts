import { accountLoginRequest } from '@/services/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: localCache.getCache(LOGIN_TOKEN) ?? '',
    token: ''
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)

      // 登录操作，获取token等信息，并存储到store
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token

      // 将token存储到本地
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 跳转页面
      router.push('/admin')
    }
  }
})

export default useLoginStore
