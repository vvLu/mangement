<template>
<div id="search">
  <!-- <h2 >条件搜索</h2> -->
  <div class="tables">
    <el-table
      :data="tableData"
      style="width: 30%">
      <el-table-column
        prop="time"
        label="">
      </el-table-column>
      <el-table-column
        label="活跃">
        <template scope="scope">
           <input type="checkbox" v-model="scope.row.huoyue" @change="huoyuechange1(scope.$index, scope.row.huoyue)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="常规">
        <template scope="scope">
            <input type="checkbox" v-model="scope.row.changgui" @change="changgui(scope.$index, scope.row.changgui)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="沉默 ">
        <template scope="scope">
            <input type="checkbox" v-model="scope.row.chenmo" @change="chenmo(scope.$index, scope.row.chenmo)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-table
    style="width:15%"
    :data="tableData2">
      <el-table-column
        label="时间">
        <template scope="scope">
            <span>最近<el-input v-model="scope.row.time"></el-input>天未联系</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="searchbottom">
      <el-button type="primary" @click="search">搜索</el-button>
    </div>    
  <h2 style="margin-top:40px">结果统计</h2>
  <div>
    <div v-show="tindex" class="allixned">
       <Tables
        :table="table"
        :loading="loading2"
         @shuaxinlist="shuaxinlist"
        @seebehavior="seebehavior"
        @addbeizhu="addbeizhu"
        @gaojisearch="gaojisearch"></Tables>
       <div style="text-align:center">
          <Page 
          :pagenum="pagenum" 
          @handleCurrentChanges="handleCurrentChanges"></Page> 
      </div>
      <!--    -->
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
    @submit="submit"
    ></dialogbeizhu>
  </div>
  <div>
    <gaojidailog
    :dialogTableVisible2="dialogTableVisible2"
    :tableData="tableData3"
    @onSubmit="onSubmit"
    @close="close"
    @huoyuechange="huoyuechange"
    @changguichange="changguichange"
    @chenmochange="chenmochange"
    @allselect="allselect"
    ></gaojidailog>
  </div>
  </div>
</div >
</div>
</template>

<script>
const Tables = () => import('./../table/tableone')
const Page = () => import('./../table/page')
const BehaviorList = () => import('./../User Behavior/index')
const dialogbeizhu = () => import('base/dialog/index')
const gaojidailog = () => import('base/dialog/gaoji')
import {getahsixuan, addbeizhu, getxiangqing, getbeizhu} from 'api/allcustomer.js'
import {format} from 'assets/js/format.js'
export default {
  components: {
    Page,
    Tables,
    BehaviorList,
    dialogbeizhu,
    gaojidailog
  },
  name: 'clientManagement',
  data () {
    return {
      activeName: 'first',
      form: {
        time: '',
        beizhu: '',
        value1: ''
      },
      tableData2: [{
        'time': 7
      }],
      tableData: [{
        'time': '注册3天',
        'huoyue': true,
        'cahnggui': false,
        'chenmo': false
      }, {
        'time': '注册7天',
        'huoyue': true,
        'cahnggui': false,
        'chenmo': false
      }, {
        'time': '近15天',
        'huoyue': true,
        'cahnggui': false,
        'chenmo': false
      }, {
        'time': '近30天',
        'huoyue': true,
        'cahnggui': false,
        'chenmo': false
      }],
      dialogTableVisible2: false,
      tableData3: [{
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
      phone: false,
      kehuyuan: false,
      options: [],
      projectname: [],
      loading: false,
      shaixuan: false,
      biaoqians: [],
      one: 'A',
      two: 'B',
      three: 'C',
      table: [],
      start: 0,
      radio1: '',
      searchdata: {
        'huoyue': [3, 7, 15, 30],
        'changgui': [],
        'chenmo': []
      },
      pagenum: 100,
      pagenum2: 100,
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
      liuyanphone: '',
      table3: [],
      active: [],
      routine: [],
      silence: [],
      loading2: true
    }
  },
  created () {
    /* this.gethangye()
    this.getprojectname() */
    this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    this.getahsixuan(0, 100)
  },
  methods: {
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
      for (var i = 0; i < this.tableData3.length; i++) {
        this.tableData3[i].threeday = false
        this.tableData3[i].sevenday = false
        this.tableData3[i].fifteenday = false
      }
      this.getahsixuan(0, 100)
    },
    // 确认筛选条件
    onSubmit () {
      if (this.active.length === 0 && this.routine.length === 0 && this.silence.length === 0) {
        this.$alert('选项不能为空')
      }
      this.getahsixuan2(0, 100)
    },
    // 获取筛选结果
    getahsixuan2 (start, length) {
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
      for (var i = 0; i < this.tableData3.length; i++) {
        this.tableData3[i].threeday = false
        this.tableData3[i].sevenday = false
        this.tableData3[i].fifteenday = false
      }
    },
    search () {
      console.log(this.searchdata)
      console.log(this.tableData2[0].time)
      this.getahsixuan(0, 100)
    },
    // 获取筛选结果
    getahsixuan (start, length) {
      this.loading2 = true
      let data = {
        'active': this.searchdata.huoyue,
        'routine': this.searchdata.changgui,
        'silence': this.searchdata.chenmo,
        'gapda': this.tableData2[0].time,
        'start': start,
        'length': length
      }
      // this.$ajax.post('/api/clientboard/getboardfind', data)
      getahsixuan(data).then((res) => {
        this.loading2 = false
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
    // 确认添加备注
    submit (val, val2) {
      this.dialogTableVisible = false
      // this.$ajax.get('/api/clientboard/addcontact/' + this.liuyanphone + '?msg=' + this.form.beizhu)
      addbeizhu(this.liuyanphone, this.form.beizhu, val2).then((res) => {
        if (res.data.code === 0) {
          this.$alert('添加成功！')
          this.liuyanphone = ''
          this.form.beizhu = ''
          this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
          this.getahsixuan(0, 100)
        } else {
          this.$alert('添加失败！')
        }
      })
    },
    // 重新加载列表
    shuaxinlist () {
      this.getahsixuan(this.start, 100)
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
    // 获取备注详情
    getbeizhu (val, start, length) {
      getbeizhu(val, start, length).then((res) => {
        this.table3 = res.data.data
        this.pagenum2 = res.data.draw
      })
    },
    // 查看详情
    seebehavior (val) {
      this.getxiangqing(val)
      this.getbeizhu(val.phone, 0, 100)
      this.bTable = true
      this.tindex = false
    },
    // 添加备注
    addbeizhu (val) {
      this.liuyanphone = val.phone
      this.dialogTableVisible = true
    },
    // 页数切换
    handleCurrentChanges (val) {
      this.currentPage = val + 1
      this.start = val
      this.getahsixuan(this.start, 100)
    },
    // 详情里添加备注
    addbeizhuinfo (val) {
      this.getbeizhu(val, 0, 100)
    },
    tindexshow () {
      this.bTable = false
      this.tindex = true
      // this.getahsixuan(0, 100)
    },
    // 切换页数
    xiangqingCurrentChanges (val, val2) {
      console.log(val, val2)
      this.getbeizhu(val, val2, 100)
    },
    // 关闭备注
    closediolag () {
      this.dialogTableVisible = false
      this.form.value1 = format('yyyy-MM-dd hh:ss:mm', new Date())
    },
    huoyuechange1 (val, val2) {
      console.log(val, val2)
      var that = this
      if (val === 0 && val2) {
        this.searchdata.huoyue.push(3)
      } else if (val === 0 && val2 === false) {
        console.log(1)
        for (var i = 0; i < that.searchdata.huoyue.length; i++) {
          if (that.searchdata.huoyue[i] === 3) {
            that.searchdata.huoyue.splice(i, 1)
          }
        }
      }
      if (val === 1 && val2) {
        that.searchdata.huoyue.push(7)
      } else if (val === 1 && val2 === false) {
        console.log(2)
        for (var s = 0; s < that.searchdata.huoyue.length; s++) {
          if (that.searchdata.huoyue[s] === 7) {
            that.searchdata.huoyue.splice(s, 1)
          }
        }
      }
      if (val === 2 && val2) {
        that.searchdata.huoyue.push(15)
      } else if (val === 2 && val2 === false) {
        console.log(3)
        for (var m = 0; m < that.searchdata.huoyue.length; m++) {
          if (that.searchdata.huoyue[m] === 15) {
            that.searchdata.huoyue.splice(m, 1)
          }
        }
      }
      if (val === 3 && val2) {
        that.searchdata.huoyue.push(30)
      } else if (val === 3 && val2 === false) {
        console.log(4)
        for (var n = 0; n < that.searchdata.huoyue.length; n++) {
          if (that.searchdata.huoyue[n] === 30) {
            that.searchdata.huoyue.splice(n, 1)
          }
        }
      }
      console.log(this.searchdata.huoyue)
    },
    changgui (val, val2) {
      var that = this
      if (val === 0 && val2) {
        this.searchdata.changgui.push(3)
      } else if (val === 0 && val2 === false) {
        console.log(1)
        for (var i = 0; i < that.searchdata.changgui.length; i++) {
          if (that.searchdata.changgui[i] === 3) {
            that.searchdata.changgui.splice(i, 1)
          }
        }
      }
      if (val === 1 && val2) {
        that.searchdata.changgui.push(7)
      } else if (val === 1 && val2 === false) {
        console.log(2)
        for (var s = 0; s < that.searchdata.changgui.length; s++) {
          if (that.searchdata.changgui[s] === 7) {
            that.searchdata.changgui.splice(s, 1)
          }
        }
      }
      if (val === 2 && val2) {
        that.searchdata.changgui.push(15)
      } else if (val === 2 && val2 === false) {
        console.log(3)
        for (var m = 0; m < that.searchdata.changgui.length; m++) {
          if (that.searchdata.changgui[m] === 15) {
            that.searchdata.changgui.splice(m, 1)
          }
        }
      }
      if (val === 3 && val2) {
        that.searchdata.changgui.push(30)
      } else if (val === 3 && val2 === false) {
        console.log(4)
        for (var n = 0; n < that.searchdata.changgui.length; n++) {
          if (that.searchdata.changgui[n] === 30) {
            that.searchdata.changgui.splice(n, 1)
          }
        }
      }
    },
    chenmo (val, val2) {
      var that = this
      if (val === 0 && val2) {
        this.searchdata.chenmo.push(3)
      } else if (val === 0 && val2 === false) {
        console.log(1)
        for (var i = 0; i < that.searchdata.chenmo.length; i++) {
          if (that.searchdata.chenmo[i] === 3) {
            that.searchdata.chenmo.splice(i, 1)
          }
        }
      }
      if (val === 1 && val2) {
        that.searchdata.chenmo.push(7)
      } else if (val === 1 && val2 === false) {
        console.log(2)
        for (var s = 0; s < that.searchdata.chenmo.length; s++) {
          if (that.searchdata.chenmo[s] === 7) {
            that.searchdata.chenmo.splice(s, 1)
          }
        }
      }
      if (val === 2 && val2) {
        that.searchdata.chenmo.push(15)
      } else if (val === 2 && val2 === false) {
        console.log(3)
        for (var m = 0; m < that.searchdata.chenmo.length; m++) {
          if (that.searchdata.chenmo[m] === 15) {
            that.searchdata.chenmo.splice(m, 1)
          }
        }
      }
      if (val === 3 && val2) {
        that.searchdata.chenmo.push(30)
      } else if (val === 3 && val2 === false) {
        console.log(4)
        for (var n = 0; n < that.searchdata.chenmo.length; n++) {
          if (that.searchdata.chenmo[n] === 30) {
            that.searchdata.chenmo.splice(n, 1)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#search
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
    display: flex
    input[type=checkbox]
      width:20px
      height:20px
    .el-input
      width: 50px
      margin:0 10px
  .searchbottom
    margin-top: 10px  
  .forme
    width: 30%
    margin:20px 0
    .el-input
      width: 50px
      margin:0 10px
</style>
