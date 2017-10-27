<template>
<div style="margin:20px" id="tableone">
  <div style='text-align:left;margin-bottom:20px'>
    <el-button v-if="$route.path==='/Vip'" size="small" @click="handleEditzdyP">删除VIP</el-button>
    <el-button v-if="$route.path!=='/Vip'" size="small" type="danger" @click="handleEditVip">添加到VIP</el-button>
    <el-button  size="small"  @click="gaojisearch">条件筛选</el-button>
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
    @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="40">
      </el-table-column>
     <el-table-column
     width="130px"
      prop="enroll_time"
      label="注册日期">
    </el-table-column>
    <el-table-column
     width="160px"
      prop="username"
      label="注册名">
    </el-table-column>
    <el-table-column
      prop="resl_name"
      label="姓名">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.resl_name ? scope.row.resl_name : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
     width="130px"
      prop="phone"
      label="电话">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.phone ? scope.row.phone : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="new_3"
      label="注册3日"> 
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.new_3 ? scope.row.new_3 : '-' }}</span>
      </template>
    </el-table-column><!-- 
      :filter-method="filterTag" -->
    <el-table-column
      prop="new_7"
      label="注册7日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.new_7 ? scope.row.new_7 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="$route.path!=='/Fenzu'"
      prop="day_15"
      label="近15日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.day_15 ? scope.row.day_15 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-if="$route.path!=='/Fenzu'"
      prop="day_30"
      label="近30日">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.day_30 ? scope.row.day_30 : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
     width="160px"
      prop="contact"  
      label="联系时间">
      <template scope="scope" style="display:flex">
        <span >{{ scope.row.contact ? scope.row.contact : '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="标签状态">
        <template scope="scope" style="display:flex">
          <el-tag type="danger" v-if="scope.row.isvip === 1">VIP</el-tag>
          <span v-if="scope.row.isvip === 0">-</span>
        </template>
      </el-table-column>
    <el-table-column label="详情" >
      <template scope="scope" style="display:flex">
          <el-button
          size="small"
          @click="handlesee(scope.$index, scope.row)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column label="回访" >
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

export default {
  props: ['table', 'loading'],
  components: {
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
      }]
    }
  },
  created () {
  },
  methods: {
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
    },
    // 高级搜索
    gaojisearch () {
      this.$emit('gaojisearch')
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

</style>
