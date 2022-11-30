import requestInstance from '../index'

export function accountLoginRequest(data: { name: string; password: string }) {
  return requestInstance.post('/login', data)
}
