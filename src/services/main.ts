import requestInstance from '.'

// 这里请求的数据，很可能是多处都会用到，所以创建main统一管理
export function postRoleList() {
  return requestInstance.post('/role/list')
}

export function postDepartmentList() {
  return requestInstance.post('/department/list')
}

export function postMenuList() {
  return requestInstance.post('/menu/list')
}
