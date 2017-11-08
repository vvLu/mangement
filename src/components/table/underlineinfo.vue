<template>
<div >
<div>
  <el-table
    max-height="300"
    :data="underInfo"
    border
    @cell-mouse-enter="cellmouseEnter"
    style="">
    <el-table-column
      prop="name"
      label="姓名">
       <template scope="scope" style="display:flex">
          <span >{{ scope.row.name ? scope.row.name : '-' }}</span>
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
      prop="year"
      label="工龄">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.year ? scope.row.year : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bk"
      label="板块">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.bk ? scope.row.bk : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="com"
      label="公司">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.com ? scope.row.com : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dep"
      label="分部">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.dep ? scope.row.dep : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="xq"
      label="小区">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.xq ? scope.row.xq : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="point"
      label="类型">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.point ? scope.row.point : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dec"
      label="来源">
      <template scope="scope" style="display:flex">
          <span >{{ scope.row.dec ? scope.row.dep : '-' }}</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['underInfo'],
  data () {
    return {
      currentRow: null,
      addbeizhuName: '',
      inputshow: true
    }
  },
  methods: {
    cellmouseEnter (val) {
      console.log(val)
    },
    addinput () {
      this.inputshow = false
      this.autofocus = true
    },
    bluraddName () {
      this.inputshow = true
      this.$emit('bluraddName', this.addbeizhuName)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
