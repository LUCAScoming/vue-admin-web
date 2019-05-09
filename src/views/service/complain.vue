<template>
  <div id="car-container" style="margin:20px;">
    <el-form ref="form" :inline="true" :model="managerQueryVo">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-form-item label="述求状态" prop="class">
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
        <el-input placeholder="请输入述求业主" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="ownerId" label="述求编号" width="120" />
      <el-table-column prop="ownerName" label="述求业主" width="120" />
      <el-table-column prop="sex" label="联系方式" width="120" />
      <el-table-column prop="phone" label="述求事项" width="120" />
      <el-table-column prop="building" label="状态" width="120" />
      <el-table-column prop="tel" label="处理结果" width="120" />
      <el-table-column label="操作" width="">
        <template>
          <el-button size="mini" type="primary" @click="form1">查看/修改</el-button>
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
    <el-dialog :visible.sync="FormVisible">
      <form1 ref="form1" @close="handleFormClose()"/>
    </el-dialog>
  </div>
</template>

<script>
import form1 from './components/form1'
export default {
  name: 'Complain',
  components: {
    form1
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      value1: '',
      tableData: [{
        ownerId: 'SQ003',
        ownerName: '贾海凌',
        sex: '123456790',
        phone: '希望每天都有清洁人员...',
        building: '处理完毕',
        tel: '感谢...'
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
        label: '处理完毕'
      }, {
        value: '选项2',
        label: '处理中'
      }, {
        value: '选项3',
        label: '未处理'
      }],
      FormVisible: false
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
    },
    form1() {
      this.FormVisible = true
    },
    handleFormClose() {
      this.FormVisible = false
      // this.queryPage()
    }
  }
}
</script>

<style scoped>

</style>

