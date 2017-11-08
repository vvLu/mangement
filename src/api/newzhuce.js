import $http from './api.js'

// 登录
export function login (datas) {
  const url = '/clientboard/login'
  const data = datas
  return $http.post(url, data)
}

// 获取分组客户列表
export function getall (start, length, phones, sort) {
  const url = '/clientboard/getnewuser?start=' + start + '&length=' + length + '&phone=' + phones + '&sort=' + sort
  return $http.get(url)
}

// 获取及时沟通客户列表
export function goutonggetall (start, length, phones, sort) {
  const url = '/clientboard/gettimely?start=' + start + '&length=' + length + '&phone=' + phones + '&sort=' + sort
  return $http.post(url)
}

// 获取VIP客户列表
export function gettable (start, length, phones, sort) {
  const url = '/clientboard/getvip?start=' + start + '&length=' + length + '&phone=' + phones + '&sort=' + sort
  return $http.get(url)
}

// 新建分组
export function addnewfenzuname (name) {
  const url = '/clientboard/addgroup'
  const data = {
    'name': name
  }
  return $http.post(url, data)
}

// 新建分组
export function getfenzulists (start, length) {
  const url = '/clientboard/getgroup?start=' + start + '&length=' + length
  return $http.get(url)
}

// 确认添加到分组
export function addfenzusure (phone, id) {
  const url = '/clientboard/addgroupmember'
  const data = {
    'phone': phone,
    'groupid': id
  }
  return $http.post(url, data)
}

// 获取分组详情
export function getfenzudatils (start, length, phones, groupid, sort) {
  const url = '/clientboard/getgroupmember?start=' + start + '&length=' + length + '&phone=' + phones + '&groupid=' + groupid + '&sort=' + sort
  return $http.get(url)
}

// 删除分组中的客户
export function removefenzu (phone, id) {
  const url = '/clientboard/delgroupuser'
  const data = {
    'phone': phone,
    'id': id
  }
  return $http.post(url, data)
}

// 删除整个分组
export function deletfenzu (id) {
  const url = '/clientboard/delgroup'
  const data = {
    'id': id
  }
  return $http.post(url, data)
}

// 添加姓名备注和客户备注
export function beizhuadds (phone, nameRemark, clientRemark) {
  const url = '/clientboard/addboardremark'
  const data = {
    'phone': phone,
    'nameRemark': nameRemark,
    'clientRemark': clientRemark
  }
  return $http.post(url, data)
}
