<template>
<div style="margin:20px">
<div>
  <el-table
    max-height="300"
    :data="table"
    border
    style="">
    <el-table-column
      prop="enroll_time"
      label="注册时间">
       <template scope="scope" style="display:flex">
          <span >{{ scope.row.enroll_time ? scope.row.enroll_time : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="username"
      label="注册名">
       <template scope="scope" style="display:flex">
          <span >{{ scope.row.username ? scope.row.username : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="resl_name"
      label="姓名">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.resl_name ? scope.row.resl_name : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.phone ? scope.row.phone : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="客户状态">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.type ? scope.row.type : '-' }}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['table'],
  data () {
    return {
      currentRow: null
    }
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
</style>
