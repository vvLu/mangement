<template>
  <div id='leftMenus'>
    <el-menu theme="dark" :default-active="idnexname" class="el-menu-demo" mode="horizontal" >
      <el-submenu index="1">
        <template slot="title">我的客户</template>
        <router-link to="/"><el-menu-item index="1-1">我的所有客户</el-menu-item></router-link>
        <router-link to="Vip"><el-menu-item index="1-2">我的VIP客户</el-menu-item></router-link>
        <router-link to="Project"><el-menu-item index="1-3">及时沟通</el-menu-item></router-link>
        <router-link to="Fenzu"><el-menu-item index="1-4">新注册用户</el-menu-item></router-link>
      </el-submenu>
      <router-link to="Personas"><el-menu-item index="2">客户搜索</el-menu-item></router-link>
      <el-submenu index="2" class="yonghuinfo" v-if="$store.state.user.isLogin">
        <template slot="title">用户:{{$store.state.user.userName}}</template>
        <el-menu-item index="2-1" @click="qiehuanuser">切换用户</el-menu-item>
      </el-submenu>
    </el-menu><!-- 
       {{$store.state.user.isLogin}} -->
   <div id="loginbtn" v-if="$store.state.user.isLogin === false">
     <router-link to="/login"><el-button type="primary">登录</el-button></router-link>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: '',
      idnexname: ''
    }
  },
  watch: {
    '$route' (val) {
      if (val.path === '/') {
        this.idnexname = '1-1'
      } else if (val.path === '/Vip') {
        this.idnexname = '1-2'
      } else if (val.path === '/Project') {
        this.idnexname = '1-3'
      } else if (val.path === '/Fenzu') {
        this.idnexname = '1-4'
      } else if (val.path === '/Personas') {
        this.idnexname = '2'
      }
    },
    '$store' (val) {
      console.log(val)
      if (this.$store.state.user.isLogin === 'false') {
        this.$router.push('/login')
      }
    }
  },
  created () {
    if (this.$route.path === '/') {
      this.idnexname = '1-1'
    } else if (this.$route.path === '/Vip') {
      this.idnexname = '1-2'
    } else if (this.$route.path === '/Project') {
      this.idnexname = '1-3'
    } else if (this.$route.path === '/Personas') {
      this.idnexname = '2'
    }
    this.islogin()
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('childEventIsShow', key)
      this.$emit('changechild', key)
    },
    islogin () {
      console.log(this.$store.state.user)
      if (this.$store.state.user.isLogin === false) {
        this.$router.push('/login')
      }
    },
    qiehuanuser () {
      this.$store.state.user.isLogin = false
      this.$store.state.user.userName = ''
      window.localStorage.setItem('userName', '')
      window.localStorage.setItem('isLogin', false)
      this.$router.push('/login')
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
#leftMenus
  position:relative
  #loginbtn
    position:absolute
    top: 10px
    right:15px
  .yonghuinfo 
    float: right
    top:0
    right: 2q0px
  #username
    position:absolute
    top: 10px
    right:15px
    color: #fff
</style>
