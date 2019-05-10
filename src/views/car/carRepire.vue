<template>
  <div id="car-container" style="margin:20px;">
    <el-form ref="form" :inline="true" :model="managerQueryVo">
      <el-form-item label="车位状态" prop="class">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位编号或车牌号码">
        <el-input placeholder="请输入车位编号或车牌号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="车位编号" />
      <el-table-column prop="ownerName" label="状态"  />
      <el-table-column prop="sex" label="车位类型"  />
      <el-table-column prop="phone" label="管理类别" />
      <el-table-column prop="building" label="预售价格"/>
      <el-table-column prop="tel" label="预租价格"  />
      <el-table-column prop="carNum" label="位置" />
      <el-table-column prop="cardNum" label="面积"  />
      <el-table-column prop="position" label="变更"  >
        <template >
          <el-button size="medium" type="primary" >修改信息</el-button>
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
  name: 'CarRepire',
  components: {
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      tableData: [{
        ownerId: '0001',
        ownerName: '已售',
        sex: '地上车位',
        phone: '物业租赁',
        building: '50000.00',
        tel: '800.00',
        carNum: '1栋A单元旁边',
        cardNum: '12m²'
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
        label: '所有'
      }, {
        value: '选项2',
        label: '空闲'
      }, {
        value: '选项3',
        label: '已售'
      }, {
        value: '选项4',
        label: '已租'
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

