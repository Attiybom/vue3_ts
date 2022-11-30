import { accountLoginRequest } from '@/services/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  actions: {
    async accountLoginAction(account: { name: string; password: string }) {
      const loginRes = await accountLoginRequest(account)
      console.log(loginRes)
      console.log(loginRes.data.id)
      this.id = loginRes.data.id

      this.name = loginRes.data.name
      this.token = loginRes.data.token
    }
  }
})

export default useLoginStore
