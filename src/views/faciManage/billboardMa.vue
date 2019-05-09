<template>
  <div id="owner-container" style="margin:20px;">
    <el-form ref="form" :inline="true" :model="managerQueryVo">
      <el-form-item label="公告类别" prop="class">
        <el-select v-model="value" placeholder ="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="公告编号">
        <el-input placeholder="请输入公告编号"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="medium">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="公告编号" width="120"/>
      <el-table-column prop="ownerName" label="公告名称" width="120"/>
      <el-table-column prop="sex" label="投放方式" width="120"/>
      <el-table-column prop="phone" label="上线时间" width="120"/>
      <el-table-column prop="building" label="下线时间" width="120"/>
      <el-table-column label="操作" width="">
        <template >
          <el-button size="mini" type="primary" >一键投放</el-button>
          <el-button size="mini" type="success" >查看</el-button>
          <el-button size="mini" type="danger" >删除</el-button>
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
      @current-change="handleCurrentChange"/>
    <el-dialog :title="新增" :visible.sync="addFormVisible">
      <add-info ref="addForm" @close="handleFormClose()"/>
    </el-dialog>
    <el-dialog :title="编辑" :visible.sync="editFormVisible">
      <add-info ref="addForm" @close="handleFormClose()"/>
    </el-dialog>
    <!--<el-dialog :title="数据权限" :visible.sync="dataFormVisible">-->
    <!--<data-permission ref="dataForm" @close="handleFormClose()"/>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ownerInfoApi from '@/api/ownerInfo'
// import ManagerApi from '@/api/mathsgo/manager'
// import Change from './components/Change'
// import AddInfo from './components/addInfo'
// import EditManage from './components/EditManager'
// import DataPermission from './components/DataPermission'
export default {
  name: 'BillboardMa',
  components: {
    // EditManage,
    // AddInfo
    // Change,
    // DataPermission
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      tableData: [{
        ownerId: '1',
        ownerName: '关于...',
        sex: '电子显示屏',
        phone: '2019-03-12',
        building: '2019-04-12'
      }],
      managerQueryVo: {
        pageObj: {
          pageNum: 1,
          pageSize: 10,
          ownerInfo: {}
        }
      },
      options: [{
        value: '选项1',
        label: '电子显示屏公告'
      }, {
        value: '选项2',
        label: '线上公告'
      }],
      addFormVisible: false,
      editFormVisible: false,
      changeFormVisible: false,
      dataFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  mounted() {
    // this.queryPage()
  },
  methods: {
    // queryPage() {
    //   this.loading = true
    //   ownerInfoApi.getQueryPage(this.managerQueryVo.pageObj)
    //     .then(data => {
    //       debugger
    //       this.loading = false
    //       this.tableData = data.obj.list
    //       console.log(this.tableData)
    //       if (data.obj.total > 0) {
    //         this.managerQueryVo.pageObj.totalElements = data.obj.totalElements
    //         this.managerQueryVo.pageObj.currentPage = data.obj.currentPage
    //       }
    //     })
    //     .catch(error => {
    //       this.loading = false
    //       console.error(error)
    //       this.$message.error(error.msg)
    //     })
    // },
    handleSizeChange: function(val) {
      this.managerQueryVo.pageObj.size = val
      this.queryPage()
    },
    handleCurrentChange: function(val) {
      this.managerQueryVo.pageObj.currentPage = val
      this.queryPage()
    },
    handleFormClose() {
      this.addFormVisible = false
      this.editFormVisible = false
      this.dataFormVisible = false
      // this.queryPage()
    },
    addInfo() {
      this.addFormVisible = true
      this.$nextTick(() => {
        // this.$refs.addForm.formClear()
      })
    }
    // editManager(id) {
    //   this.editFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs.editForm.editManager(id)
    //   })
    // },
    // dataPermission(id) {
    //   this.dataFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs.dataForm.getSchoolByUserId(id)
    //   })
    // },
    // // 禁用
    // deleteManager(id, state) {
    //   this.$confirm('是否禁用该账号权限?', '提示', {
    //   }).then(() => {
    //     this.loading = true
    //     ManagerApi.delete(id, state).then(data => {
    //       this.loading = false
    //       this.$message('禁用成功')
    //       this.queryPage()
    //     }, err => {
    //       this.loading = false
    //       console.log(err)
    //       this.$message.error(err.msg)
    //     })
    //   })
    // },
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
