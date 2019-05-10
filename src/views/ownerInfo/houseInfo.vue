<template>
  <div id="house-container" style="margin:20px;">
    <el-form :inline="true" :model="managerQueryVo">
      <el-form-item>
        <el-input v-model="managerQueryVo.ownerInfo.ownerId" placeholder="请输入业主ID" width="80" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="managerQueryVo.ownerInfo.ownerName" placeholder="请输入业主姓名" width="80" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="queryHouseInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="medium" @click="addInfo">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="业主ID"  />
      <el-table-column prop="ownerName" label="业主姓名"  />
      <!--<el-table-column prop="sex" label="性别" width="60" :formatter="sexFormat" />-->
      <el-table-column prop="phone" label="联系方式" width="120" />
      <el-table-column prop="building" label="楼栋单元" width="80" />
      <el-table-column prop="homeNum" label="房间号" width="80" />
      <el-table-column prop="buyhouseDate" :formatter="timestampToTime" label="购房日期"  />
      <el-table-column prop="houseArea" label="房屋面积" width="120" />
      <el-table-column prop="houseType" label="房型" :formatter="typeFormat" width="120" />
      <el-table-column prop="houseStructure" label="房屋构造" width="120" />
      <el-table-column label="变更" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editInfo(scope.row.id)">查看/修改</el-button>
          <el-button size="mini" type="danger" @click="deleteHouseInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="managerQueryVo.pageObj.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="managerQueryVo.pageObj.size"
      :total="managerQueryVo.pageObj.totalElements"
      style="margin-top:20px;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="新增" :visible.sync="addFormVisible">
      <details-info ref="addForm" @close="handleFormClose()" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import houseInfoApi from '@/api/houseInfo'
import detailsInfo from './components/detailsInfo'
export default {
  name: 'HouseInfo',
  components: {
    detailsInfo
  },
  filters: {
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      tableData: [{
        ownerId: '001',
        ownerName: '刘嘉玲',
        sex: '女',
        phone: '1123456789',
        building: '6',
        homeNum: '23',
        buyhouseDate: '2015-09-23',
        houseStructure: '三室一厅一卫',
        houseArea: '100',
        houseType: '经济适用住房'
      }],
      managerQueryVo: {
        ownerInfo: {
          ownerId: '',
          ownerName: ''
        },
        pageObj: {
          totalElements: null,
          currentPage: null
        }
      },
      addFormVisible: false,
      editFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  mounted() {
    this.queryPage()
  },
  methods: {
    queryPage() {
      this.loading = true
      houseInfoApi.getQueryPage().then(data => {
        this.loading = false
        this.tableData = data.list
        this.tableData.id = data.list.id
        if (data.total > 0) {
          this.managerQueryVo.pageObj.totalElements = data.total
          this.managerQueryVo.pageObj.currentPage = data.pageNum
        }
      })
        .catch(error => {
          this.loading = false
          debugger
          this.$message.error(error.msg)
        })
    },
    queryHouseInfo() {
      this.loading = true
      houseInfoApi.getHouseInfo(this.managerQueryVo.ownerInfo).then(data => {
        this.loading = false
        this.tableData = data.list
        if (data.total > 0) {
          this.managerQueryVo.pageObj.totalElements = data.total
          this.managerQueryVo.pageObj.currentPage = data.pageNum
        }
      })
        .catch(error => {
          this.loading = false
          debugger
          this.$message.error(error.msg)
        })
    },
    handleSizeChange: function(val) {
      this.managerQueryVo.pageObj.size = val
      this.queryOwnerInfo()
    },
    handleCurrentChange: function(val) {
      this.managerQueryVo.pageObj.currentPage = val
      this.queryOwnerInfo()
    },
    handleFormClose() {
      this.addFormVisible = false
      this.queryPage()
    },
    addInfo() {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.dataClear()
      })
    },
    editInfo(id) {
      this.addFormVisible = true
      this.$nextTick(() => {
        console.log(id)
        this.$refs.addForm.editManager(id)
      })
    },
    sexFormat(row) {
      if (row.sex === 0) {
        return '男'
      } else if (row.sex === 1) {
        return '女'
      }
    },
    typeFormat(row) {
      if (row.houseType === 0) {
        return '商品房'
      } else if (row.houseType === 1) {
        return '房改房'
      } else if (row.houseType === 2) {
        return '存量房'
      } else if (row.houseType === 3) {
        return '集资房'
      } else if (row.houseType === 4) {
        return '安居工程住房'
      } else {
        return '经济适用住房'
      }
    },
    deleteHouseInfo(id) {
      this.$confirm('是否删除该业主房产信息?', '提示', {
      }).then(() => {
        this.loading = true
        houseInfoApi.delete(id).then(data => {
          this.loading = false
          this.$message('删除成功')
          this.queryPage()
          debugger
        }, err => {
          this.loading = false
          console.log(err)
          this.$message.error(err.msg)
        })
      })
    },
    timestampToTime(row, column) {
      var date = new Date(row.buyhouseDate) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style scoped>

</style>

