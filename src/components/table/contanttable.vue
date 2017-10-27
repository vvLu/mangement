<template>
<div style="margin:20px" id="lianxixiangqing">
<div >
  <el-table
    max-height="300"
    border
    :data="table3"
    style="">
      <el-table-column
        prop="create_time"
        label="联系时间">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.create_time ? scope.row.create_time : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="msg"
        label="备注内容">
        <template scope="scope" style="display:flex">
          <el-input type="textarea" v-model="scope.row.msg"></el-input>
        </template>
      </el-table-column>
  </el-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['table3'],
  data () {
    return {
      currentRow: null
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#lianxixiangqing
  .el-table .cell
    padding: 8px  
</style>
