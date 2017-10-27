<template>
<div id="vipindex">
  <div v-show="tindex">
  	<div  class="tables">
  		  <h2>我的VIP客户</h2>
  	  	<Tables 
        :table="table" 
        :loading="loading"
        @shuaxinlist="shuaxinlist" 
        @seebehavior="seebehavior"
        @addbeizhu="addbeizhu"
        @gaojisearch="gaojisearch"></Tables>
         <div style="text-align:center">
              <Page :pagenum="pagenum" 
               @handleCurrentChanges="handleCurrentChanges"  >
               </Page>
         </div>
    </div>
  </div>
  <div v-show="bTable">
    <BehaviorList  
    :bhTbale="bhTbale" 
    :table2="table2" 
    :table3="table3"
    :pagenum2="pagenum2"
    @addbeizhuinfo="addbeizhuinfo"
    @tindexshow="tindexshow"
    @xiangqingCurrentChanges="xiangqingCurrentChanges"></BehaviorList>
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
</div>
</template>

<script>
const Tables = () => import('./../table/tableone')
const Page = () => import('./../table/page')
const BehaviorList = () => import('./../User Behavior/index')
const dialogbeizhu = () => import('base/dialog/index')
const gaojidailog = () => import('base/dialog/gaoji')
import {gettable} from 'api/newzhuce.js'
import {addbeizhu, getxiangqing, getbeizhu, getahsixuan} from 'api/allcustomer.js'
import {format} from 'assets/js/format.js'

export default {
  components: {
    Tables,
    BehaviorList,
    Page,
    dialogbeizhu,
    gaojidailog
  },
  data () {
    return {
      detail: false,
      tableishow: true,
      activeName: 'first',
      addvip: false,
      bhTbale: [],
      table: [],
      table2: [],
      start: 0,
      pagenum: 100,
      pagenum2: 100,
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
        value1: ''
      },
      bTable: false,
      tindex: true,
      table3: [],
      active: [],
      routine: [],
      silence: [],
      loading: true
    }
  },
  created () {
    this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    this.gettable(0, 100)
  },
  methods: {
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
      this.gettable(0, 100)
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
        if (res.data.data.length > 0) {
          this.dialogTableVisible2 = false
          this.table = res.data.data
          this.pagenum = res.data.draw
        } else if (res.data.data === 1) {
          this.$alert('请重新登录')
        } else {
          this.$alert('获取失败')
        }
      })
    },
    // 高级搜索
    gaojisearch () {
      this.dialogTableVisible2 = true
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
    // 操作后重新获取列表
    shuaxinlist () {
      this.gettable(0, 100)
    },
    // 获取vip列表
    gettable (start, length) {
      this.loading = true
      var that = this
      // that.$ajax.get('/api/clientboard/getvip?start=' + start + '&length=' + length)
      gettable(start, length).then((res) => {
        this.loading = false
        if (res.data.data.length > 0) {
          that.table = res.data.data
          that.pagenum = res.data.draw
        } else if (res.data.data === 1) {
          this.$alert('未登录')
        } else {
          this.$alert('获取失败')
        }
      })
    },
    // 添加备注
    addbeizhu (val) {
      this.liuyanphone = val.phone
      this.dialogTableVisible = true
    },
    // 关闭备注
    closediolag () {
      this.dialogTableVisible = false
      this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    },
    // 确认添加
    submit (val, val2) {
      this.dialogTableVisible = false
      addbeizhu(this.liuyanphone, this.form.beizhu, val2).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功！')
          this.liuyanphone = ''
          this.form.beizhu = ''
          this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
          this.gettable(0, 100)
        } else {
          this.$alert('添加失败！')
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
    // 获取详情数据
    getxiangqing (val) {
      getxiangqing(val.phone).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          var userinfo = [{
            enroll_time: '',
            username: '',
            resl_name: '',
            phone: '',
            type: ''
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
          this.bhTbale = userinfo
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
    tindexshow () {
      this.bTable = false
      this.tindex = true
      // this.gettable(0, 100)
    },
    // 详情里添加备注
    addbeizhuinfo (val) {
      this.getbeizhu(val, 0, 100)
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
    // 切换页数
    xiangqingCurrentChanges (val, val2) {
      console.log(val, val2)
      this.getbeizhu(val, val2, 100)
    },
    handleCurrentChanges (val) {
      this.currentPage = val + 1
      this.start = val
      this.gettable(this.start, 100)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#vipindex
  margin-top: 10px
  .el-tabs
    border: 1px solid #ccc
    .el-tabs__header
      margin:0;
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
  .tables
    border: 1px solid #ccc
    border-radius: 5px 5px 0 0
</style>
