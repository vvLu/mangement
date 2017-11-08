<template>
  <div id='tableactive'>
   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="">
      <el-button size="small" @click="fenzubtn">添加到分组</el-button>
    </el-form-item >
    <el-form-item label="">
      <el-button size="small" @click="shanchubtn">删除VIP</el-button>
    </el-form-item >
    <el-form-item label="">
      <el-button size="small" type="danger" @click="addvipbtn">添加到VIP</el-button>
    </el-form-item >
    <el-form-item label="">
      <el-button  size="small"  @click="shaixuanbtn">条件筛选</el-button>
    </el-form-item >
    <el-form-item label="搜索电话">
      <el-input v-model="querys" placeholder="请输入电话" @change="searchbtn"></el-input>
    </el-form-item >
   </el-form>
  </div>
</template>

<script>
const fenzulist = () => import('base/dialog/fenzulist')
export default {
  components: {
    fenzulist
  },
  props: {
  },
  data () {
    return {
      querys: ''
    }
  },
  created () {
  },
  methods: {
    fenzubtn () {
      this.$emit('fenzubtn')
    },
    shaixuanbtn () {
      this.$emit('shaixuanbtn')
    },
    shanchubtn () {
      this.$emit('shanchubtn')
    },
    addvipbtn () {
      this.$emit('addvipbtn')
    },
    searchbtn () {
      this.$emit('searchbtn')
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
