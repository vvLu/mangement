import $http from './api.js'

// 获取所有客户列表
export function getallList (start, length, phone, sort) {
  const url = '/clientboard/gethomeboard?start=' + start + '&length=' + length + '&phone=' + phone + '&sort=' + sort
  return $http.get(url)
}

// 列表上添加备注
export function addbeizhu (phone, msg, time) {
  const url = '/clientboard/addcontact/' + phone + '?msg=' + msg + '&time=' + time
  return $http.get(url)
}

// 获取客户详情数据
export function getxiangqing (phone) {
  const url = '/clientboard/getuserinfo/' + phone
  return $http.get(url)
}

// 获取备注详情数据
export function getbeizhu (phone, start, length) {
  const url = '/clientboard/getcontact?phone=' + phone + '&start=' + start + '&length=' + length
  return $http.get(url)
}

// 获取筛选结果
export function getahsixuan (datas) {
  const url = '/clientboard/getboardfind'
  const data = datas
  return $http.post(url, data)
}

// 删除VIP
export function handleEditzdyP (datas) {
  const url = '/clientboard/delvip'
  const data = datas
  return $http.post(url, data)
}

// 添加VIP
export function handleEditVip (datas) {
  const url = '/clientboard/addvip'
  const data = datas
  return $http.post(url, data)
}
