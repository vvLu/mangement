<template>
<div >
<div>
  <el-table
    max-height="300"
    :data="table"
    border
    @cell-mouse-enter="cellmouseEnter"
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
          <span >{{ scope.row.username ? scope.row.username : '-' }}<!-- <span v-if="clientRemark">({{scope.row.clientRemark}})</span> --></span>
      </template>
    </el-table-column>
    <el-table-column
      prop="resl_name"
      label="姓名">
      <template scope="scope" style="display:flex">
          <el-input v-model="addbeizhuName" placeholder="请输入内容" v-show="!inputshow" @blur="bluraddName" @keyup.enter.native="keyup"></el-input>
          <span v-show="inputshow">{{ scope.row.resl_name ? scope.row.resl_name : '-' }}<span v-if="scope.row.nameRemark">({{scope.row.nameRemark}})</span></span> 
          <i class="el-icon-edit" @click="addinput" v-show="inputshow"></i>
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
    <el-table-column
      prop="clientRemark"
      label="客户备注">
      <template scope="scope" style="display:flex">
          <el-input type="textarea"  v-model="addbeizhuName2" placeholder="请输入内容"   v-show="inputshow2 === false"  @blur="bluraddName2" @keyup.enter.native="keyup2"></el-input>
          <span v-show="inputshow2">{{ scope.row.clientRemark ? scope.row.clientRemark : '-' }}</span>
          <i class="el-icon-edit" @click="addinput2" v-show="inputshow2"></i>
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
      currentRow: null,
      addbeizhuName: '',
      addbeizhuName2: '',
      inputshow: true,
      inputshow2: true
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
    addinput2 () {
      this.inputshow2 = false
    },
    bluraddName () {
      this.inputshow = true
      this.$emit('bluraddName', this.addbeizhuName)
    },
    bluraddName2 () {
      this.inputshow2 = true
      this.$emit('bluraddName2', this.addbeizhuName2)
    },
    keyup () {
      this.bluraddName()
    },
    keyup2 () {
      this.bluraddName2()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
