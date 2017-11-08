<template>
  <div id="app">
    <Menue></Menue>
    <!-- <Login></Login> -->
    <!-- <Alerts></Alerts> -->
    <router-view style="padding: 0 45px"></router-view>
  </div>
</template>

<script>
import Menue from 'base/menue/index'
import Login from 'base/login/index'
export default {
  name: 'app',
  components: {
    Menue,
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background: #a5c7ff
}
.el-button--text{
  display: inline-block;
  width: 100%;
  color:#00599a;
  text-align: left;
}
/*.el-button--text:focus, .el-button--text:hover{
  color: #fff
}*/
.el-textarea.is-disabled .el-textarea__inner{
  color: #333 !important
}
</style>
