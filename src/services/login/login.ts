import requestInstance from '../index'
import type { IAccount } from '@/types'

export function accountLoginRequest(data: IAccount) {
  return requestInstance.post('/login', data)
}

export function getUserInfoById(id: number) {
  return requestInstance.get('/users/' + id)
}

export function getUserMenusByRoleId(id: number) {
  return requestInstance.get(`/role/${id}/menu`)
}
