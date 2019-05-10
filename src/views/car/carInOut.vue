<template>
  <div id="car-container" style="margin:20px;">
    <el-form ref="form" :inline="true" :model="managerQueryVo">
      <el-form-item label="快速检索" prop="class">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="停车牌号"  />
      <el-table-column prop="ownerName" label="车牌号" />
      <el-table-column prop="sex" label="车主姓名" />
      <el-table-column prop="phone" label="车位编号"  />
      <el-table-column prop="building" label="入场时间" />
      <el-table-column prop="tel" label="出场时间"  />
      <el-table-column prop="carNum" label="值班人" />
      <el-table-column prop="cardNum" label="备注"  />
      <el-table-column prop="position" label="变更"  >
        <template slot-scope="scope">
          <el-button size="mini" type="primary">修改
          </el-button>
          <el-button size="mini" type="danger">删除</el-button>

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
    <!--<el-dialog :title="数据权限" :visible.sync="dataFormVisible">-->
    <!--<data-permission ref="dataForm" @close="handleFormClose()"/>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>

export default {
  name: 'CarInOut',
  components: {
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      tableData: [{
        ownerId: 'P0001',
        ownerName: '湘M1222',
        sex: '贾海凌',
        phone: '000X',
        building: '2019-04-12 17:01',
        tel: '2019-04-13 17:01',
        carNum: '贾',
        cardNum: 'XXXX'
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
        label: '停车牌号'
      }, {
        value: '选项2',
        label: '车牌号'
      }, {
        value: '选项3',
        label: '车主姓名'
      }, {
        value: '选项4',
        label: '车位编号'
      }]
    }
  },
  mounted() {
    // this.queryPage()
  },
  methods: {
    handleSizeChange: function(val) {
      this.managerQueryVo.pageObj.size = val
      // this.queryPage()
    },
    handleCurrentChange: function(val) {
      this.managerQueryVo.pageObj.currentPage = val
      // this.queryPage()
    }
  }
}
</script>

<style scoped>

</style>

