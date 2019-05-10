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
      <el-table-column prop="ownerId" label="服务编号"  />
      <el-table-column prop="ownerName" label="申请业主" />
      <el-table-column prop="sex" label="联系方式" />
      <el-table-column prop="phone" label="房产位置" />
      <el-table-column prop="building" label="申请内容"  />
      <el-table-column prop="tel" label="状态" />
      <el-table-column prop="result" label="审批结果" />
      <el-table-column label="操作" width="">
        <template>
          <el-button size="mini" type="primary" @click="form2">查看/修改</el-button>
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
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="FormVisible">
      <form2 ref="form2" @close="handleFormClose()" />
    </el-dialog>
  </div>
</template>

<script>
import form2 from './components/form2'
export default {
  name: 'ServiceMa',
  components: {
    form2
  },
  data() {
    return {
      loading: false,
      isEdit: 0,
      value: '',
      value1: '',
      tableData: [{
        ownerId: 'FW003',
        ownerName: '贾海凌',
        sex: '123456790',
        phone: '16栋A单元1602',
        building: '防盗门需要更换',
        tel: '未处理',
        result: '同意'
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
    form2() {
      this.FormVisible = true
    }
  }
}
</script>

<style scoped>

</style>

