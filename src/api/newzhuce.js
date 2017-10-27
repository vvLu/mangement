/* import axios from 'axios'
import { baseUrl } from './env'

// 获取分组客户列表
export function getall (start, length) {
  const url = baseUrl + '/clientboard/getnewuser?start=' + start + '&length=' + length
  return axios.get(url)
}

// 获取及时沟通客户列表
export function goutonggetall (start, length) {
  const url = baseUrl + '/clientboard/gettimely?start=' + start + '&length=' + length
  return axios.post(url)
}

// 获取VIP客户列表
export function gettable (start, length) {
  const url = baseUrl + '/clientboard/getvip?start=' + start + '&length=' + length
  return axios.get(url)
}

// 登录
export function login (datas) {
  const url = baseUrl + '/clientboard/login'
  const data = datas
  return axios.post(url, data)
} */

import $http from './api.js'

// 登录
export function login (datas) {
  const url = '/clientboard/login'
  const data = datas
  return $http.post(url, data)
}

// 获取分组客户列表
export function getall (start, length) {
  const url = '/clientboard/getnewuser?start=' + start + '&length=' + length
  return $http.get(url)
}

// 获取及时沟通客户列表
export function goutonggetall (start, length) {
  const url = '/clientboard/gettimely?start=' + start + '&length=' + length
  return $http.post(url)
}

// 获取VIP客户列表
export function gettable (start, length) {
  const url = '/clientboard/getvip?start=' + start + '&length=' + length
  return $http.get(url)
}
