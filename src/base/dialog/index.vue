<template>
  <div id='dialog'>
    <el-dialog title="备注信息" :visible="dialogTableVisible" :show-close="false">
      <el-form :model="form" >
      <el-form-item label="注册名" style="text-align:left">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="电话" style="text-align:left">
          <span>{{form.phone}}</span>
        </el-form-item>
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="form.value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" style="text-align:left">
          <el-input type="textarea" v-model="form.beizhu"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button  @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: function () {
        return {
          form: {
            beizhu: '',
            value1: '',
            phone: '',
            name: ''
          }
        }
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    // this.form.value1 = this.format('yyyy-MM-dd hh:ss:mm', new Date())
  },
  methods: {
    onSubmit () {
      console.log(typeof this.form.value1 === 'string')
      if (typeof this.form.value1 === 'string') {
        console.log(1)
        this.$emit('submit', this.form.beizhu, this.form.value1)
      } else {
        console.log(2)
        console.log(this.format('yyyy-MM-dd hh:ss', this.form.value1))
        this.$emit('submit', this.form.beizhu, this.format('yyyy-MM-dd hh:ss', this.form.value1))
      }
      // this.$emit('submit', this.form.beizhu, this.form.value1)
    },
    close () {
      this.$emit('closediolag')
      console.log(this.form.value1)
    },
    format (fmt, time) {
      var o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S': time.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
