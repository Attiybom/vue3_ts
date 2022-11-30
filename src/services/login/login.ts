import requestInstance from '../index'
import type { IAccount } from '@/types'

export function accountLoginRequest(data: IAccount) {
  return requestInstance.post('/login', data)
}
