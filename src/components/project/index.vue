<template>
<div id="allcustomer">
  <div v-show="tindex" class="allixned">
      <h2>及时沟通</h2>
      <!-- <div class="searchbox">
        <searchbox :querys="querys" ref="searchbox" @searchFocus="searchFocus" placeholder="请输入电话"></searchbox>
        搜索电话：<el-input v-model="querys" placeholder="请输入电话" @change="keyUp"></el-input>
      </div> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="">
           <fenzulist 
            ref="popover4"
            :gridData="gridData"
            @addnewfenzu="addnewfenzu"
            @fenzubtns="fenzubtns"
            @namebtn="namebtn">
            </fenzulist>
        </el-form-item >
        <el-form-item label="搜索电话">
          <el-input v-model="querys" placeholder="请输入电话" @change="keyUp"></el-input>
        </el-form-item >
      </el-form>

       <Tables
        :table="table"
        :loading="loading"
         @shuaxinlist="shuaxinlist"
        @seebehavior="seebehavior"
        @addbeizhu="addbeizhu"
        @gaojisearch="gaojisearch"
        @handleSelectionChange="handleSelectionChange"
        @sortChange="sortChange"></Tables>
       <div style="text-align:center">
          <Page 
          :pagenum="pagenum" 
          @handleCurrentChanges="handleCurrentChanges"></Page> 
      </div>
      <!--    -->
  </div>
  <div v-show="bTable">
    <BehaviorList  
    :loading="bhloading"
    :bhTbale="bhTbale" 
    :underInfo="underInfo"
    :table2="table2" 
    :table3="table3"
    :pagenum2="pagenum2"
    :form="formxq"
    @addbeizhuinfo="addbeizhuinfo"
    @xqbeibubtn="xqbeibubtn"
    @tindexshow="tindexshow"
    @xiangqingCurrentChanges="xiangqingCurrentChanges"
    @bluraddName="bluraddName"
    @bluraddName2="bluraddName2"></BehaviorList>
  </div>
  <div>
    <dialogbeizhu 
    :dialogTableVisible="dialogTableVisible"
    :form="form"
    @closediolag="closediolag"
    @submit="submit"></dialogbeizhu>
  </div>
  <div>
    <gaojidailog
    :dialogTableVisible2="dialogTableVisible2"
    :tableData="tableData"
    @onSubmit="onSubmit"
    @close="close"
    @huoyuechange="huoyuechange"
    @changguichange="changguichange"
    @chenmochange="chenmochange"
    @allselect="allselect"
    ></gaojidailog>
  </div>
  <div>
    <addnewfenzu 
    ref="dialogs" 
    :dialogTableVisible2="dialogTableVisible2s"
    @closediolag="closediolags"
    @onSubmit="onSubmits"></addnewfenzu>
  </div>
</div>

</template>

<script>
const Tables = () => import('./../table/tableone')
const Page = () => import('./../table/page')
const BehaviorList = () => import('./../User Behavior/index')
const dialogbeizhu = () => import('base/dialog/index')
const gaojidailog = () => import('base/dialog/gaoji')
const fenzulist = () => import('base/dialog/fenzulist')
const addnewfenzu = () => import('base/dialog/addnewfenzu')
import {addbeizhu, getxiangqing, getbeizhu, getahsixuan} from 'api/allcustomer.js'
import {goutonggetall, addnewfenzuname, getfenzulists, addfenzusure, beizhuadds} from 'api/newzhuce.js'
import {format} from 'assets/js/format.js'
export default {
  components: {
    Tables,
    Page,
    BehaviorList,
    dialogbeizhu,
    gaojidailog,
    fenzulist,
    addnewfenzu
  },
  data () {
    return {
      activeName: '1',
      table: [],
      pagenum: 100,
      pagenum2: 100,
      start: 0,
      length: 100,
      start2: 0,
      currentPage: 1,
      bhTbale: [],
      table2: [],
      bTable: false,
      tindex: true,
      editableTabs: [{
        'title': '活跃用户',
        'name': '1'
      }, {
        'title': '常规用户',
        'name': '2'
      }, {
        'title': '沉默用户',
        'name': '3'
      }],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      tableData: [{
        'time': '注册3天',
        'threeday': false,
        'sevenday': false,
        'fifteenday': false,
        'thirtyday': false
      }, {
        'time': '注册7天',
        'threeday': false,
        'sevenday': false,
        'fifteenday': false,
        'thirtyday': false
      }, {
        'time': '近15天',
        'threeday': false,
        'sevenday': false,
        'fifteenday': false,
        'thirtyday': false
      }, {
        'time': '近30天',
        'threeday': false,
        'sevenday': false,
        'fifteenday': false,
        'thirtyday': false
      }],
      liuyanphone: '',
      form: {
        beizhu: '',
        value1: '',
        phone: '',
        name: ''
      },
      formxq: {
        beizhu: '',
        value1: '',
        phone: '',
        name: ''
      },
      table3: [],
      active: [],
      routine: [],
      silence: [],
      loading: true,
      querys: '',
      phones: '',
      dialogTableVisible2s: false,
      gridData: [],
      selectsphones: [],
      zuid: 0,
      xqphone: '',
      xqname: '',
      underInfo: [],
      sort: 1,  // 0:按联系时间排序，1:按注册时间排序（默认排序)
      getxqphone: '',
      bhloading: true
    }
  },
  created () {
    this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    this.getall(0, 100, this.phones, this.sort)
    this._getfenzulists(0, 100)
  },
  methods: {
    // 添加姓名备注
    bluraddName (val) {
      console.log(val)
      beizhuadds(this.getxqphone, val, '').then((res) => {
        this._getxiangqing(this.getxqphone)
      })
    },
    // 添加用户备注
    bluraddName2 (val) {
      console.log(val)
      beizhuadds(this.getxqphone, '', val).then((res) => {
        this._getxiangqing(this.getxqphone)
      })
    },
    // 列表排序
    sortChange (val) {
      if (val === 'descending') {
        this.sort = 1
        this.getall(this.start, 100, this.phones, this.sort)
      } else {
        this.sort = 0
        this.getall(this.start, 100, this.phones, this.sort)
      }
    },
    namebtn (val) {
      this.zuid = val
      this._addfenzusure(this.selectsphones, this.zuid)
    },
    _addfenzusure (phone, id) {
      addfenzusure(phone, id).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功')
          this.closediolags()
          this.selectsphones = []
          this.getall(this.start, 100, this.phones, this.sort)
        } else {
          this.$alert('添加失败')
        }
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.selectsphones = val
    },
    fenzubtns () {
      this._getfenzulists(0, 100)
    },
    // 添加到新分组
    addnewfenzu () {
      this.dialogTableVisible2s = true
    },
    closediolags () {
      this.dialogTableVisible2s = false
    },
    onSubmits () {
      console.log(this.$refs.dialogs.form.name)
      addnewfenzuname(this.$refs.dialogs.form.name).then((res) => {
        this.dialogTableVisible2s = false
        if (res.data.code === 0) {
          this._addfenzusure(this.selectsphones, res.data.data.id)
        }
      })
    },
    // 获取所有分组
    _getfenzulists (start, length) {
      getfenzulists(start, length).then((res) => {
        this.gridData = res.data.data
      })
    },
    keyUp () {
      if (this.querys.length >= 3 || this.querys.length === 0) {
        this.phones = this.querys
        this.getall(0, 100, this.phones, this.sort)
      }
    },
    // 高级搜索
    gaojisearch () {
      this.dialogTableVisible2 = true
    },
    // 活跃
    huoyuechange (val) {
      this.active = val
    },
    // 常规
    changguichange (val) {
      this.routine = val
    },
    // 沉默
    chenmochange (val) {
      this.silence = val
    },
    // 清除所选
    allselect () {
      this.dialogTableVisible2 = false
      this.active = []
      this.routine = []
      this.silence = []
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].threeday = false
        this.tableData[i].sevenday = false
        this.tableData[i].fifteenday = false
      }
      this.getall(0, 100, this.phones, this.sort)
    },
    // 确认筛选条件
    onSubmit () {
      if (this.active.length === 0 && this.routine.length === 0 && this.silence.length === 0) {
        this.$alert('选项不能为空')
      }
      this.getahsixuan(0, 100)
    },
    // 获取筛选结果
    getahsixuan (start, length) {
      let data = {
        'active': this.active,
        'routine': this.routine,
        'silence': this.silence,
        'gapda': '',
        'start': start,
        'length': length
      }
      getahsixuan(data).then((res) => {
        this.dialogTableVisible2 = false
        if (res.data.data.length > 0) {
          this.dialogTableVisible2 = false
          this.table = res.data.data
          this.pagenum = res.data.draw
        } else if (res.data.data === 1) {
          this.$alert('请重新登录')
        } else {
          // this.$alert('获取失败')
          this.table = []
        }
      })
    },
    // 关闭筛选条件
    close () {
      this.dialogTableVisible2 = false
      this.active = []
      this.routine = []
      this.silence = []
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].threeday = false
        this.tableData[i].sevenday = false
        this.tableData[i].fifteenday = false
      }
    },
    // 添加备注
    addbeizhu (val) {
      this.liuyanphone = val.phone
      this.dialogTableVisible = true
      getxiangqing(this.liuyanphone).then((res) => {
        if (res.data.code === 0) {
          this.form.name = res.data.data.clientdetails[0].username
          this.form.phone = res.data.data.clientdetails[0].phone
        }
      })
    },
    // 关闭备注
    closediolag () {
      this.dialogTableVisible = false
      this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    },
    // 确认添加备注
    submit (val, val2) {
      this.dialogTableVisible = false
      addbeizhu(this.liuyanphone, this.form.beizhu, val2).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功！')
          this.liuyanphone = ''
          this.form.beizhu = ''
          this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
          this.getall(0, 100, this.phones, this.sort)
        } else {
          this.$alert('添加失败！')
        }
      })
    },
    // 获取列表
    getall (start, length, phones, sort) {
      this.loading = true
      // this.$ajax.post('/api/clientboard/gettimely?start=' + start + '&length=' + length)
      goutonggetall(start, length, this.phones, this.sort).then((res) => {
        this.loading = false
        if (res.data.data.length > 0) {
          this.table = res.data.data
          this.pagenum = res.data.draw
        } else if (res.data.data === 1) {
          this.$alert('请重新登录')
        } else {
          // this.$alert('获取失败')
          this.table = []
        }
      })
    },
    // 重新加载列表
    shuaxinlist () {
      this.getall(this.start, 100, this.phones, this.sort)
    },
    // 页数切换
    handleCurrentChanges (val) {
      this.currentPage = val + 1
      this.start = val
      this.getall(this.start, 100, this.phones, this.sort)
    },
    // 获取详情数据
    getxiangqing (val) {
      this.bhloading = true
      this.getxqphone = val.phone
      this._getxiangqing(this.getxqphone)
    },
    _getxiangqing (val) {
      getxiangqing(val).then((res) => {
        this.bhloading = false
        if (res.data.code === 0) {
          this.xqname = res.data.data.clientdetails[0].username
          this.xqphone = res.data.data.clientdetails[0].phone
          var userinfo = [{
            enroll_time: '',
            username: '',
            resl_name: '',
            phone: '',
            type: '',
            clientRemark: '',
            nameRemark: ''
          }]
          var monthdetail = [{
            date_rangs: '',
            operate_day: '',
            operate_count: '',
            operate_type: '',
            silent_time: '',
            house: '',
            report_count: '',
            report_cycle: '',
            look_count: '',
            sign_count: ''
          }, {
            date_rangs: '',
            operate_day: '',
            operate_count: '',
            operate_type: '',
            silent_time: '',
            house: '',
            report_count: '',
            report_cycle: '',
            look_count: '',
            sign_count: ''
          }, {
            date_rangs: '',
            operate_day: '',
            operate_count: '',
            operate_type: '',
            silent_time: '',
            house: '',
            report_count: '',
            report_cycle: '',
            look_count: '',
            sign_count: ''
          }]
          var userInfors = res.data.data.clientdetails
          userinfo[0].enroll_time = res.data.data.clientdetails[0].enroll_time
          userinfo[0].username = userInfors[0].username
          userinfo[0].resl_name = userInfors[0].resl_name
          userinfo[0].phone = userInfors[0].phone
          userinfo[0].type = userInfors[0].type + ',' + userInfors[1].type
          userinfo[0].clientRemark = userInfors[0].clientRemark
          userinfo[0].nameRemark = userInfors[0].nameRemark
          this.bhTbale = userinfo
          var underInfo = [{
            name: '',
            phone: '',
            year: '',
            bk: '',
            com: '',
            dep: '',
            xq: '',
            point: '',
            dec: ''
          }]
          if (res.data.data.offline === null) {
            underInfo = []
          } else {
            underInfo[0] = res.data.data.offline
          }
          this.underInfo = underInfo
          for (var i = 0; i < userInfors.length; i++) {
            monthdetail[i].date_rangs = '最近' + userInfors[i].date_rangs + '天'
            monthdetail[i].operate_day = userInfors[i].operate_day
            monthdetail[i].operate_count = userInfors[i].operate_count
            monthdetail[i].operate_type = userInfors[i].operate_type
            monthdetail[i].silent_time = userInfors[i].silent_time
            monthdetail[i].house = userInfors[i].house
            monthdetail[i].report_count = userInfors[i].report_count
            monthdetail[i].report_cycle = userInfors[i].report_cycle
            monthdetail[i].look_count = userInfors[i].look_count
            monthdetail[i].sign_count = userInfors[i].sign_count
          }
          monthdetail[2].date_rangs = '月增幅'
          monthdetail[2].operate_day = res.data.data.operate_day
          monthdetail[2].operate_count = res.data.data.operate_count
          monthdetail[2].operate_type = res.data.data.operate_type
          monthdetail[2].silent_time = res.data.data.silent_time
          this.table2 = monthdetail
        }
      })
    },
    // 获取备注详情
    getbeizhu (val, start, length) {
      getbeizhu(val, start, length).then((res) => {
        console.log(res.data)
        this.table3 = res.data.data
        this.pagenum2 = res.data.draw
        console.log(this.pagenum2)
      })
    },
    // 详情里添加备注
    addbeizhuinfo (val) {
      this.getbeizhu(val, 0, 100)
    },
    xqbeibubtn () {
      // this.getbeizhu(val, 0, 100)
      getxiangqing(this.xqphone).then((res) => {
        if (res.data.code === 0) {
          this.formxq.name = res.data.data.clientdetails[0].username
          this.formxq.phone = res.data.data.clientdetails[0].phone
        }
      })
    },
    // 查看详情
    seebehavior (val) {
      console.log(val)
      this.getxiangqing(val)
      this.getbeizhu(val.phone, 0, 100)
      this.bTable = true
      this.tindex = false
    },
    // 切换页数
    xiangqingCurrentChanges (val, val2) {
      console.log(val, val2)
      this.getbeizhu(val, val2, 100)
    },
    tindexshow () {
      this.bTable = false
      this.tindex = true
      // this.getall(0, 100)
      this.getall(this.start, 100, this.phones, this.sort)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#allcustomer
  margin-top: 10px
  .el-tabs
    border: 1px solid #ccc
    .el-tabs__header
      margin:0;
  .allixned
    border: 1px solid #ccc
    border-radius: 5px 5px 0 0;
    position: relative
    h2
      text-align: left;
      line-height: 35px;
      background: #20a0ff;
      color:#fff;
      padding-left: 10px;
      border-radius: 5px 5px 0 0;
    h2 span
      font-size: 20px;
      margin-right:5px;
    .searchbox
      position: absolute
      top: 50px
      left: 220px
      width: 300px
      display: flex
      line-height: 36px
      z-index: 111
      .el-input
        width: 150px
</style>
