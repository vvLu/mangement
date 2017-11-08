<template>
  <div id='fenzulist'>
   <el-popover
  ref="popover4"
  placement="right"
  v-show="popovershow"
  trigger="click">
  <el-table max-height="200" :data="gridData">
    <el-table-column width="150" property="name" label="组名">
      <template scope="scope" style="display:flex">
        <el-button type="text" @click="namebtn(scope.row.id)">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="text" @click="addnewfenzu"><i class="el-icon-plus"></i> 添加到新分组</el-button>
</el-popover>
<el-button size="small" v-popover:popover4 @click="fenzubtns">添加到分组</el-button>
  </div>
</template>

<script>
export default {
  props: {
    gridData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      popovershow: false
    }
  },
  created () {
  },
  methods: {
    addnewfenzu () {
      this.$emit('addnewfenzu')
    },
    fenzubtns () {
      this.$emit('fenzubtns')
    },
    namebtn (val) {
      console.log(val)
      this.$emit('namebtn', val)
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
#fenzulist
  text-align: center
  .el-button--text
    display: inline-block
    width: 100%
    
</style>
