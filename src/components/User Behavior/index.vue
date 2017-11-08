<template>
<div class="contents" style="text-align:center">
    <el-form ref="form" label-width="80px" v-loading="loading" 
    element-loading-text="请稍等哦O(∩_∩)O~">
  <div style="text-align:left;margin-bottom:20px">
    <el-button type="text" @click="fanhui" style="text-align:left"><span class="el-icon-arrow-left"></span>返回</el-button>
  </div>
  <div class="modles">
    <h2>客户线上信息</h2>
    <div>
      <Tables :table="bhTbale" @bluraddName="bluraddName" @bluraddName2="bluraddName2"></Tables>
    </div>
  </div>
  <div class="modles">
    <h2>客户线下信息</h2>
    <div>
      <Tableunder :underInfo="underInfo" @bluraddName="bluraddName"></Tableunder>
    </div>
  </div>

  <div class="modles">
    <h2>联系详情</h2>
    <div>
      <div class="beizhuadd">
        <el-input type="textarea"  v-model="addbzinfo"></el-input>
        <el-button  size="small" type="danger" @click="handleEditVip">添加备注</el-button>
      </div>
      <Contanttable  :table3="table3"></Contanttable>
      <div style="text-align:center">
          <Page 
          :pagenum="pagenum2" 
          @handleCurrentChanges="handleCurrentChanges"></Page> 
      </div>
    </div>
  </div>
  <div class="modles">
    <h2>客户动态</h2>
    <div>
      <TableJ  :table2="table2"></TableJ>
    </div>
  </div>
  <!-- <div>
    <dialogbeizhu 
    :dialogTableVisible="dialogTableVisible"
    :form="form"
    @closediolag="closediolag"
    @submit="submit">
    </dialogbeizhu>
    
  </div> -->
</el-form>
</div>
</template>

<script>
const Tables = () => import('./../table/xingweitable')
const Tableunder = () => import('./../table/underlineinfo')
const Page = () => import('./../table/page')
const TableJ = () => import('./../table/jinqitable')
const dialogbeizhu = () => import('base/dialog/index')
const Contanttable = () => import('./../table/contanttable')
import {addbeizhu} from 'api/allcustomer.js'
import {format} from 'assets/js/format.js'
export default {
  props: ['bhTbale', 'table2', 'table3', 'pagenum2', 'form', 'underInfo', 'loading'],
  components: {
    Tables,
    TableJ,
    Contanttable,
    dialogbeizhu,
    Page,
    Tableunder
  },
  name: 'clientManagement',
  data () {
    return {
      activeName: 'first',
      dialogTableVisible: false,
      forms: {
        beizhu: '',
        value1: '',
        phone: '',
        name: ''
      },
      phone: '',
      addbzinfo: ''
    }
  },
  created () {
    this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
  },
  methods: {
    // 添加备注姓名
    bluraddName (val) {
      console.log(val)
      this.$emit('bluraddName', val)
    },
    // 添加备注姓名
    bluraddName2 (val) {
      console.log(val)
      this.$emit('bluraddName2', val)
    },
    fanhui () {
      this.$emit('tindexshow')
    },
    // 添加备注
    handleEditVip () {
      console.log(format('yyyy-MM-dd hh:ss:mm', new Date()))
      addbeizhu(this.bhTbale[0].phone, this.addbzinfo, format('yyyy-MM-dd hh:ss:mm', new Date())).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功！')
          this.addbzinfo = ''
          this.$emit('addbeizhuinfo', this.bhTbale[0].phone)
          this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
        } else {
          this.$alert('添加失败！')
        }
      })
    },
    // 关闭备注
    closediolag () {
      this.dialogTableVisible = false
      this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    },
    submit (val, val2) {
      // this.$ajax.get('/api/clientboard/addcontact/' + this.bhTbale[0].phone + '?msg=' + this.form.beizhu)
      addbeizhu(this.bhTbale[0].phone, this.form.beizhu, val2).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功！')
          this.dialogTableVisible = false
          this.$emit('addbeizhuinfo', this.bhTbale[0].phone)
          this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
        } else {
          this.$alert('添加失败！')
        }
      })
    },
    // 页数切换
    handleCurrentChanges (val) {
      console.log(this.bhTbale[0].phone)
      this.$emit('xiangqingCurrentChanges', this.bhTbale[0].phone, val)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contents
  padding-bottom: 100px
  .modles
    border: 1px solid #ccc
    margin-top: 20px
    h2
      text-align: left;
      line-height: 35px;
      background: #20a0ff;
      color:#fff;
      padding-left: 10px;
    .beizhuadd
      display:flex
      margin: 20px
      .el-textarea
        margin-right:20px
</style>
