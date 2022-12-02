import requestInstance from '../../index'

export function postUserListData() {
  return requestInstance.post('/users/list', {
    offset: 0,
    size: 10
  })
}
