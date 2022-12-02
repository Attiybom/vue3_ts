import requestInstance from '../../index'

export function postUserListData(queryInfo:any) {
  return requestInstance.post('/users/list', queryInfo)
}
