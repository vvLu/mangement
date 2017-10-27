import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userName: window.localStorage.userName, // window.localStorage.userName ? window.localStorage.userName :
      isLogin: window.localStorage.isLogin // window.localStorage.isLogin ? window.localStorage.isLogin :
    },
    token: null,
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.toke = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    [types.ISLOGIN]: (state, flag) => {
      state.isLogin = flag
    }
  }
})
