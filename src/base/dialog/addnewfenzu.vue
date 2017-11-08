<template>
  <div id='dialog2'>
   <el-dialog title="创建新分组" :visible="dialogTableVisible2" :show-close="false">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分组名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible2: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  created () {
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit')
    },
    close () {
      this.$emit('closediolag')
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
#dialog2
  text-align: center
</style>
