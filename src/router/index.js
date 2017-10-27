import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const All = (resolve) => {
  import('components/allcustomer/index').then((module) => {
    resolve(module)
  })
}

const Fenzu = (resolve) => {
  import('components/fenzu/index').then((module) => {
    resolve(module)
  })
}

const Project = (resolve) => {
  import('components/project/index').then((module) => {
    resolve(module)
  })
}

const Vip = (resolve) => {
  import('components/VIP/index').then((module) => {
    resolve(module)
  })
}

const Personas = (resolve) => {
  import('components/personas/index').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => {
  import('base/login/index').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'All',
      component: All
    }, {
      path: '/Fenzu',
      name: 'Fenzu',
      component: Fenzu
    }, {
      path: '/Project',
      name: 'Project',
      component: Project
    }, {
      path: '/Vip',
      name: 'Vip',
      component: Vip
    }, {
      path: '/Personas',
      name: 'Personas',
      component: Personas
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
