<template>
<div style="margin:20px" id="tableone">
  <div style='text-align:left;margin-bottom:20px' class="caozuobar">
    <!-- <el-button  size="small" @click="handleEditzdyP">删除分组</el-button> -->
    <el-button  size="small" type="danger" @click="handleEditVip"><i class="el-icon-plus"></i>新建分组</el-button>
   </div>
  <el-table
    max-height="400"
    ref="multipleTable"
    :data="table"
    v-loading="loading"
    element-loading-text="请稍等哦O(∩_∩)O~"
    border
    tooltip-effect="dark"
    style="width: 100%">
      <!-- <el-table-column
      type="selection"
      width="40">
      </el-table-column> -->
      <el-table-column
       width=""
        prop="name"
        label="组名">
        <template scope="scope" style="display:flex">
          <el-button
          size="small"
          type="text" 
          @click="handlesee(scope.$index, scope.row.id, scope.row.name)">{{scope.row.name}}</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="count"
        label="成员数">
        <template scope="scope" style="display:flex">
          <span >{{ scope.row.count ? scope.row.count : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
       width=""
        prop=""
        label="操作">
        <template scope="scope" style="display:flex">
          <el-button
          size="small"
          @click="deletfenzu(scope.$index, scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  <!-- <dialogs ref="dialogs" :dialogTableVisible2="dialogTableVisible2"
    @closediolag="closediolag"
    @onSubmit="onSubmit"
  ></dialogs> -->
</div>
</template>

<script>
const dialogs = () => import('base/dialog/addnewfenzu')

export default {
  props: ['table', 'loading'],
  components: {
    dialogs
  },
  data () {
    return {
      tableData2: [],
      multipleSelection: [],
      dialogs: false,
      caozuo: false,
      dialogFormVisible: false,
      tabledialog: [],
      zdy: '',
      pVIP: '',
      querys: '',
      dialogTableVisible2: false
    }
  },
  created () {
  },
  methods: {
    searchFocus () {
      console.log(this.$refs)
      this.$emit('searchFocus', this.$refs.searchbox.query)
    },
    handleCurrentChange (val) {
      console.log(val)
      this.$emit('seebehavior', val)
    },
    // 注册3日筛选（沉默，常规，活跃）
    filterTag (value, row) {
      console.log(value, row.new_3)
      return row.new_3 === value
    },
    // 注册7日筛选（沉默，常规，活跃）
    seventag (value, row) {
      return row.new_7 === value
    },
    // 近15日筛选（沉默，常规，活跃）
    fifteentag (value, row) {
      return row.day_15 === value
    },
    // 近30日筛选（沉默，常规，活跃）
    thirtytag (value, row) {
      return row.day_30 === value
    },
    // 创建新分组
    handleEditVip () {
      this.$emit('newfenzubtn')
    },
    closediolag () {
      this.dialogTableVisible2 = false
    },
    onSubmit () {
      console.log(this.$refs.dialogs.form.name)
      this.$emit('onSubmit', this.$refs.dialogs.form.name)
    },
    //
    cellClick (row, column, cell, event) {
      console.log(row, column, cell, event)
    },
    // 添加备注
    addbeizhu (index, row) {
      this.$emit('addbeizhu', row)
    },
    // 查看详情
    handlesee (index, id, name) {
      console.log(index, id, name)
      this.$emit('seebehavior1', id, name)
    },
    // 选中行 多选
    handleSelectionChange (val) {
      console.log(val)
    },
    // 高级搜索
    gaojisearch () {
      this.$emit('gaojisearch')
    },
    // 删除分组
    deletfenzu (index, id) {
      console.log(index, id)
      this.$emit('deletfenzu', id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#tableone
  .shaixuan
    width:100%
    .el-form-item
      width:8%
  .el-table--enable-row-hover .el-table__body tr:hover>td
    background: #a5c7ff
  .caozuobar
    position:relative
    .searchbox
      position: absolute
      top: 0
      left: 30%
  .el-button--text
    color: #333
    display: inline-block
    text-align: left
    width:100%
</style>
