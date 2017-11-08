<template>
<div id="login">
  <el-dialog title="用户登录" :visible.sync="dialogFormVisible">
    <div class="login">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" class="password">
          <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice" v-show="isnotice">账户名或者密码错误</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {login} from 'api/newzhuce.js'
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      dialogFormVisible: true,
      formLabelWidth: '80px',
      isnotice: false
    }
  },
  created () {
    console.log(this.$store.state.user.isLogin)
    if (this.$store.state.user.isLogin) {
      this.dialogFormVisible = false
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      var formdata = new FormData()
      formdata.append('phone', this.form.name)
      formdata.append('psw', this.form.password)
      window.localStorage.userName = ''
      window.localStorage.isLogin = false
      // this.$ajax.post('/api/clientboard/login', formdata)
      login(formdata).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 0) {
          if (window.localStorage) {
            window.localStorage.setItem('userName', this.form.name)
            window.localStorage.setItem('isLogin', true)
            window.localStorage.setItem('title', res.data.data.bank)
            this.$store.state.user.isLogin = true
            this.$store.state.title = res.data.data.bank
            this.$store.state.user.userName = this.form.name
            this.$router.push('/')
          }
        } else {
          this.isnotice = true
        }
      })
    },
    quxiao () {
      this.dialogFormVisible = false
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#login
  .login
    width: 90%
    border-radius: 5px
    padding: 20px
    .dialog-footer
      text-align:center
  .password
    margin-bottom: 15px
  .notice
    padding-left: 80px
    font-size: 12px
    color: #ff3434
    margin-bottom:15px
  .el-dialog--small
    width:28%
    .el-dialog__header
      text-align:center
  .loginbtn 
    .el-button
      position:absolute
      top: 10px
      right:15px
</style>
