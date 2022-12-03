import requestInstance from '../../index'

export function postUserListData(queryInfo: any) {
  return requestInstance.post('/users/list', queryInfo)
}

export function deleteUserListData(id: number) {
  return requestInstance.delete('/users/' + id)
}

export function createUser(data: any) {
  return requestInstance.post('/users', data)
}

export function updateUser(id: number, data: any) {
  return requestInstance.patch('/users/' + id, data)
}

//

export function postPageListData(pagename: string, pageInfo: any) {
  return requestInstance.post(`/${pagename}/list`, pageInfo)
}

export function deletePageListData(pagename: string, id: number) {
  return requestInstance.delete(`/${pagename}/` + id)
}
export function createPageData(pagename: string, data: any) {
  return requestInstance.post(`/${pagename}`, data)
}

export function updatePageData(pagename: string, id: number, data: any) {
  return requestInstance.patch(`/${pagename}/` + id, data)
}
