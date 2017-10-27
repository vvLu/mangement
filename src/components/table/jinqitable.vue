<template>
<div style="margin:20px" id="jinqiguanzhu">
<div >
  <el-table
    max-height="300"
    border
    :data="table2"
    style="">
    <el-table-column label="平台操作">
      <el-table-column
        prop="date_rangs"
        label="最近30天">
      </el-table-column>
      <el-table-column
        prop="operate_day"
        label="操作天数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.operate_day ? scope.row.operate_day : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operate_count"
        label="操作次数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.operate_count ? scope.row.operate_count : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operate_type"
        label="操作类型">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.operate_type ? scope.row.operate_type : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="silent_time"
        label="最近静默">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.silent_time ? scope.row.silent_time : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="350px"
        prop="house"
        label="浏览项目详情">
        <template scope="scope">
          <el-input type="textarea" v-model="scope.row.house"></el-input>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="业务状况">
      <el-table-column
        prop="report_count"
        label="报备次数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.report_count ? scope.row.report_count : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="report_cycle"
        label="报备周期">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.report_cycle ? scope.row.report_cycle : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="look_count"
        label="带看次数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.look_count ? scope.row.look_count : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sign_count"
        label="成交次数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.sign_count ? scope.row.sign_count : '-' }}</span>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['table2'],
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
#jinqiguanzhu
  .el-table .cell
    padding: 8px
</style>
