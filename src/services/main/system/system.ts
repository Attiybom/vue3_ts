import requestInstance from '../../index'

export function postUserListData(queryInfo:any) {
  return requestInstance.post('/users/list', queryInfo)
}

export function deleteUserListData(id: number) {
  return requestInstance.delete('/users/' + id)
}

export function createUser(data: any) {
  return requestInstance.post('/users', data)
}
