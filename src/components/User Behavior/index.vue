<template>
<div class="contents" style="text-align:center">
  <div style="text-align:left;margin-bottom:20px">
    <el-button type="text" @click="fanhui"><span class="el-icon-arrow-left"></span>返回</el-button>
  </div>
  <h2 style="margin-top:40px">客户信息</h2>
  <div>
    <Tables :table="bhTbale" ></Tables>
  </div>
  <h2 style="margin-top:40px">近期关注</h2>
  <div>
    <TableJ  :table2="table2"></TableJ>
  </div>
  <h2 style="margin-top:40px">联系详情</h2>
  <div>
    <div style="text-align:left;margin:20px">
      <el-button  size="small" type="danger" @click="handleEditVip">添加备注</el-button>
    </div>
    <Contanttable  :table3="table3"></Contanttable>
  </div>
  <div>
    <dialogbeizhu 
    :dialogTableVisible="dialogTableVisible"
    :form="form"
    @closediolag="closediolag"
    @submit="submit">
    </dialogbeizhu>
    <div style="text-align:center">
        <Page 
        :pagenum="pagenum2" 
        @handleCurrentChanges="handleCurrentChanges"></Page> 
    </div>
  </div>
</div>
</template>

<script>
const Tables = () => import('./../table/xingweitable')
const Page = () => import('./../table/page')
const TableJ = () => import('./../table/jinqitable')
const dialogbeizhu = () => import('base/dialog/index')
const Contanttable = () => import('./../table/contanttable')
import {addbeizhu} from 'api/allcustomer.js'
import {format} from 'assets/js/format.js'
export default {
  props: ['bhTbale', 'table2', 'table3', 'pagenum2'],
  components: {
    Tables,
    TableJ,
    Contanttable,
    dialogbeizhu,
    Page
  },
  name: 'clientManagement',
  data () {
    return {
      activeName: 'first',
      dialogTableVisible: false,
      form: {
        beizhu: '',
        value1: ''
      },
      phone: ''
    }
  },
  created () {
    this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
  },
  methods: {
    fanhui () {
      this.$emit('tindexshow')
    },
    // 添加备注
    handleEditVip () {
      this.dialogTableVisible = true
      // this.$emit('addbeizhuinfo', this.table3[0].phone)
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

<style lang="css" scoped>
body{
	position: relative;
}
.contents{
	width:100%;
	margin:0 auto;
}
.el-form-item__content{
  text-align:center
}
.forms{
  border: 1px solid #ccc;
  padding:20px;
}
.el-form-item{
  margin-bottom: 15px
}
h2{
  text-align: left;
  line-height: 35px;
  background: #20a0ff;
  color:#fff;
  padding-left: 10px;
}
h2 span{
  font-size: 20px;
  margin-right:5px;
}
/* ul{
  display: flex; 
  margin:10px;
}
ul li {
  width: 25%;
  text-align: center;
}
ul li  div{
  line-height: 30px
} */
.el-tabs{
  border: 1px solid #ccc
}
.el-tabs__header{
  margin:0;
}
h2{
  text-align: left;
  line-height: 35px;
  background: #20a0ff;
  color:#fff;
  padding-left: 10px;
  border-radius: 5px 5px 0 0;
}
h2 span{
  font-size: 20px;
  margin-right:5px;
}
</style>
