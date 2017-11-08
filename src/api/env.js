// 配置编译环境和线上环境
// baseUrl: 域名地址

let baseUrl
let routerMode = 'history' // hash history
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.1.57:8080' //  fangsir007.com:9999 192.168.1.78:1234 http://sofmanager.fangsir007.com http://192.168.1.54:80 http://192.168.1.57:8080
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://fangsir007.com:9999'
  routerMode = ''
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
