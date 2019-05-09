<template>
  <div id="owner-container" style="margin:20px;">
    <el-form ref="form" :inline="true" :model="managerQueryVo">
      <el-form-item>
        <el-input v-model="managerQueryVo.ownerInfo.ownerId" placeholder="请输入业主ID" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="managerQueryVo.ownerInfo.ownerName" placeholder="请输入业主姓名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="queryOwnerInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="medium" @click="addInfo">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="业主ID" width="120" />
      <el-table-column prop="ownerName" label="姓名" width="120" />
      <el-table-column prop="sex" label="性别" width="120" :formatter="sexFormat" />
      <el-table-column prop="phone" label="联系方式" width="120" />
      <el-table-column prop="building" label="楼层单元" width="120" />
      <el-table-column prop="homeNum" label="房间号" width="120" />
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editInfo(scope.row.id)">查看/修改</el-button>
          <el-button size="mini" type="danger" @click="deleteOwnerInfo(scope.row.id)">删除</el-button>
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
      <add-info ref="addForm" @close="handleFormClose" />
    </el-dialog>
    <el-dialog :title="编辑" :visible.sync="editFormVisible">
      <add-info ref="addForm" @close="handleFormClose" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ownerInfoApi from '@/api/ownerInfo'
import AddInfo from './components/addInfo'
export default {
  name: 'OwnerInfo',
  components: {
    AddInfo
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      tableData: [{
        id: '',
        ownerName: '',
        sex: '',
        phone: '',
        building: '',
        homeNum: ''
      }],
      managerQueryVo: {
        ownerInfo: {
          ownerId: '',
          ownerName: ''
        },
        pageObj: {
          size: 10,
          totalElements: null,
          currentPage: 1
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
      ownerInfoApi.getQueryPage().then(data => {
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
    queryOwnerInfo() {
      this.loading = true
      ownerInfoApi.getOwnerInfo(this.managerQueryVo.ownerInfo).then(data => {
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
    queryOwnerPage() {
      this.loading = true
      ownerInfoApi.getOwnerPage(this.managerQueryVo.pageObj).then(data => {
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
      console.log(val)
      this.managerQueryVo.pageObj.size = val
      this.queryOwnerPage()
    },
    handleCurrentChange: function(val) {
      this.managerQueryVo.pageObj.currentPage = val
      this.queryOwnerPage()
    },
    handleFormClose() {
      this.addFormVisible = false
      this.editFormVisible = false
      this.queryPage()
    },
    addInfo() {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.dataClear()
        debugger
      })
    },
    editInfo(id) {
      this.editFormVisible = true
      this.$nextTick(() => {
        console.log(id)
        this.$refs.addForm.editManager(id)
        debugger
      })
    },
    sexFormat(row) {
      if (row.sex === 0) {
        return '男'
      } else if (row.sex === 1) {
        return '女'
      }
    },
    // 删除
    deleteOwnerInfo(id) {
      this.$confirm('是否删除该业主信息?', '提示', {
      }).then(() => {
        this.loading = true
        ownerInfoApi.delete(id).then(data => {
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
    }
    // // 启用
    // startManager(id, state) {
    //   this.$confirm('是否启用该账号权限?', '提示', {
    //   }).then(() => {
    //     this.loading = true
    //     ManagerApi.delete(id, state).then(data => {
    //       this.loading = false
    //       this.$message('启用成功')
    //       this.queryPage()
    //     }, err => {
    //       this.loading = false
    //       console.log(err)
    //       this.$message.error(err.msg)
    //     })
    //   })
    // },
    // reset(id) {
    //   this.$confirm('是否重置密码?', '提示', {
    //   }).then(() => {
    //     ManagerApi.reset(id).then(data => {
    //       this.$message('重置成功')
    //       this.handleQuery()
    //     }, err => {
    //       console.log(err)
    //       this.$message.error(err.msg)
    //     })
    //   })
    // },
    // stateFormat(row) {
    //   if (row.state === 0) return '已启用'
    //   else if (row.state === -1) return '未启用'
    // }
  }
}
</script>

<style scoped>

</style>
