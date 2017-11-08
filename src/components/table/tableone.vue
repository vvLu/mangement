<template>
<div style="margin:20px" id="tableone">
  <div style="text-align:left;margin-bottom:20px;position:absolute;top: -50px;left:0"  v-if="$route.path==='/userfenzu'" >
      <el-button type="text" @click="fanhui" style="text-align:left"><span class="el-icon-arrow-left"></span>返回</el-button>
    </div>
  <div style='text-align:left;margin-bottom:20px' class="caozuobar">
    <el-button v-if="$route.path==='/Vip'" size="small" @click="handleEditzdyP">删除VIP</el-button>
    <el-button v-if="$route.path!=='/Vip'" size="small" type="danger" @click="handleEditVip">添加到VIP</el-button>
    <el-button  size="small"  @click="gaojisearch">条件筛选</el-button>
    <el-button v-if="$route.path==='/userfenzu'" size="small"  @click="removefenzu">移出分组</el-button>
   </div>
  <el-table
    max-height="400"
    ref="multipleTable"
    :data="table"
    v-loading="loading"
    element-loading-text="请稍等哦O(∩_∩)O~"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
     @sort-change="sortChange">
      <el-table-column
      type="selection"
      width="40">
      </el-table-column>
     <el-table-column
     width="100px"
      prop="enroll_time"
      label="注册日期">
    </el-table-column>
    <el-table-column
     width="120px"
      prop=""
      label="注册名">
      <template scope="scope" style="display:flex">
        <el-button
          size="small"
          type="text"
          @click="handlesee(scope.$index, scope.row)">{{scope.row.username}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="resl_name"
      label="姓名">
      <template scope="scope" style="display:flex">
        <!-- <span >{{ scope.row.resl_name ? scope.row.resl_name : '-' }}</span> -->
        <el-button
          size="small"
          type="text"
          @click="handlesee(scope.$index, scope.row)">{{ scope.row.resl_name ? scope.row.resl_name : '-' }}</el-button><!-- <span v-if="scope.row.nameRemark">({{scope.row.nameRemark}})</span> -->
      </template>
    </el-table-column>
    <el-table-column
      prop="clientRemark"
      label="用户备注">
      <template scope="scope" style="display:flex">
        <!-- <span >{{ scope.row.resl_name ? scope.row.resl_name : '-' }}</span> -->
        <el-button
          size="small"
          type="text"
          @click="handlesee(scope.$index, scope.row)">{{ scope.row.clientRemark ? scope.row.clientRemark : '-' }}</el-button>
      </template>
    </el-table-column>
    
    <el-table-column
     width="100px"
      prop="phone"
      label="电话">
      <template scope="scope" style="display:flex">
        <!-- <span >{{ scope.row.phone ? scope.row.phone : '-' }}</span> -->
        <el-button
          size="small"
          type="text"
          @click="handlesee(scope.$index, scope.row)">{{ scope.row.phone ? scope.row.phone : '-' }}</el-button>
      </template>
    </el-table-column>
    <el-table-column
     width="50px"
      prop="new_3"
      label="注册3日"> 
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.new_3 ? scope.row.new_3 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
     width="50px"
      prop="new_7"
      label="注册7日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.new_7 ? scope.row.new_7 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="$route.path!=='/Fenzu'"

     width="50px"
      prop="day_15"
      label="近15日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.day_15 ? scope.row.day_15 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="$route.path!=='/Fenzu'"
     width="50px"
      prop="day_30"
      label="近30日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.day_30 ? scope.row.day_30 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="contact"  
     width="150px"
     sortable="custom"
      label="最近联系时间">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.contact ? scope.row.contact : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="msg"  
     width="220px"
      label="联系内容">
      <template scope="scope" style="display:flex">
        <el-input type="textarea" :disabled="true" v-if="scope.row.msg" v-model="scope.row.msg"></el-input>
        <span v-if="!scope.row.msg">-</span>
      </template>
    </el-table-column>
    <el-table-column
     width="50px"
        label="VIP">
        <template scope="scope" style="display:flex">
          <el-tag type="danger" v-if="scope.row.isvip === 1">VIP</el-tag>
          <span v-if="scope.row.isvip === 0">-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所属分组">
        <template scope="scope" style="display:flex">
          <el-tag style="margin-right:5px" type="danger" v-if="scope.row.groups" v-for="i in scope.row.groups">{{i}}</el-tag></br>
          <span v-if="!scope.row.groups">-</span>
        </template>
      </el-table-column>
    <!-- <el-table-column label="详情" >
      <template scope="scope" style="display:flex">
          <el-button
          size="small"
          @click="handlesee(scope.$index, scope.row)">查看</el-button>
      </template>
    </el-table-column> -->
    <el-table-column label="回访" 
     width="60px">
      <template scope="scope" style="display:flex">
          <el-button
          size="small"
          @click="addbeizhu(scope.$index, scope.row)">添加</el-button>
      </template>
    </el-table-column>
  </el-table>
    
</div>
</template>

<script>
import {handleEditzdyP, handleEditVip} from 'api/allcustomer.js'
const searchbox = () => import('base/search/search')

export default {
  props: ['table', 'loading'],
  components: {
    searchbox
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
      formInline: {
        zhucevalue: '0',
        zhuceseven: '0',
        jinfiften: '0',
        jinthirty: '0'
      },
      zhucethree: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '沉默'
      }, {
        value: '2',
        label: '常规'
      }, {
        value: '3',
        label: '活跃'
      }],
      querys: ''
    }
  },
  created () {
  },
  methods: {
    sortChange (val) {
      console.log(val)
      this.$emit('sortChange', val.order)
    },
    // 移出分组
    removefenzu () {
      this.$emit('removefenzu')
    },
    searchFocus () {
      console.log(this.$refs)
      this.$emit('searchFocus', this.$refs.searchbox.query)
    },
    rowClick () {
      console.log(1)
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
    // 删除vip
    handleEditzdyP () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请先选择客户！')
      } else {
        var that = this
        // that.$ajax.post('/api/clientboard/delvip', this.multipleSelection)
        handleEditzdyP(this.multipleSelection).then(function (res) {
          if (res.data.code === 0) {
            that.$alert('删除成功')
            that.$emit('shuaxinlist')
          } else {
            that.$alert('未登录！')
          }
        })
      }
    },
    // 添加到vip
    handleEditVip () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请先选择客户！')
      } else if (this.pVIP === 1) {
        this.$alert('不能重复添加VIP！')
      } else {
        var that = this
        var data = this.multipleSelection
        // that.$ajax.post('/api/clientboard/addvip', data)
        handleEditVip(data).then(function (res) {
          if (res.data.code === 0) {
            that.$alert('添加成功！')
            that.$emit('shuaxinlist')
          } else {
            that.$alert('未登录！')
          }
        })
      }
    },
    // 添加备注
    addbeizhu (index, row) {
      this.$emit('addbeizhu', row)
    },
    // 查看详情
    handlesee (index, row) {
      this.$emit('seebehavior', row)
    },
    // 选中行 多选
    handleSelectionChange (val) {
      console.log(val)
      var data = []
      var zdy = ''
      var pVIP = ''
      for (var i = 0; i < val.length; i++) {
        data[i] = val[i].phone
        if (val[i].isvip === 1) {
          pVIP = val[i].isvip
        }
      }
      this.zdy = zdy
      this.pVIP = pVIP
      this.multipleSelection = data
      this.$emit('handleSelectionChange', data)
    },
    // 高级搜索
    gaojisearch () {
      this.$emit('gaojisearch')
    },
    fanhui () {
      this.$emit('fanhui')
    },
    // 添加到分组
    handleEditzdyfenzu () {
      this.$emit('handleEditzdyfenzu')
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
  .el-table .cell
    padding: 8px
  .caozuobar
    position:relative
    .searchbox
      position: absolute
      top: 0
      left: 30%
</style>
