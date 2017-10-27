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
</style>
