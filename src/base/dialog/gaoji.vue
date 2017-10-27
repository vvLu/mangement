<template>
  <div id='dialog'>
   <el-dialog title="条件筛选" :visible="dialogTableVisible2" :show-close="false">
        <el-table
          :data="tableData">
          <el-table-column
            prop="time"
            label="">
          </el-table-column>
          <el-table-column
            label="活跃">
            <template scope="scope">
               <input type="radio" name="three" v-model="scope.row.threeday" @change="huoyuechange(scope.$index, scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column
            label="常规">
            <template scope="scope">
                <input type="radio" name="seven" v-model="scope.row.sevenday" @change="changguichange(scope.$index, scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column
            label="沉默 ">
            <template scope="scope">
                <input type="radio" name="fifteen" v-model="scope.row.fifteenday" @change="chenmochange(scope.$index, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:15px;text-align:center">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button  @click="close">取消</el-button>
          <el-button  @click="allselect">清除</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTableVisible2: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: false
    }
  },
  data () {
    return {
      active: [],
      routine: [],
      silence: []
    }
  },
  created () {
  },
  methods: {
    allselect () {
      this.$emit('allselect')
    },
    onSubmit () {
      this.$emit('onSubmit')
    },
    close () {
      this.$emit('close')
    },
    // 注册三天
    huoyuechange (index, row) {
      if (row.time === '注册3天') {
        this.active[0] = 3
      } else if (row.time === '注册7天') {
        this.active[0] = 7
      } else if (row.time === '近15天') {
        this.active[0] = 15
      } else if (row.time === '近30天') {
        this.active[0] = 30
      }
      this.$emit('huoyuechange', this.active)
    },
    changguichange (index, row) {
      if (row.time === '注册3天') {
        this.routine[0] = 3
      } else if (row.time === '注册7天') {
        this.routine[0] = 7
      } else if (row.time === '近15天') {
        this.routine[0] = 15
      } else if (row.time === '近30天') {
        this.routine[0] = 30
      }
      this.$emit('changguichange', this.routine)
    },
    chenmochange (index, row) {
      if (row.time === '注册3天') {
        this.silence[0] = 3
      } else if (row.time === '注册7天') {
        this.silence[0] = 7
      } else if (row.time === '近15天') {
        this.silence[0] = 15
      } else if (row.time === '近30天') {
        this.silence[0] = 30
      }
      this.$emit('chenmochange', this.silence)
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
