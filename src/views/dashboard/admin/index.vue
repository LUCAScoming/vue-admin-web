<template>
  <div class="dashboard-editor-container">

    <h1 align="center">欢迎来到物业管理系统</h1>
    <div style="margin-top: 50px; margin-left: 10px;margin-right: 10px;margin-bottom: 50px">
      <div>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div class="text item">
                  <a style="margin: 10px">收到一条来自业主闫菲的业主申请</a>
                  <a style="margin-left: 50px;color: blue;" @click="apply">查看详情</a>
                </div>
                <div class="text item">
                  <a style="margin: 10px">收到一条来自业主贾海凌的投诉建议</a>
                  <a style="margin-left: 50px;color: blue;" @click="complain">查看详情</a>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-left: 10px">
      <el-form :inline="true" :model="managerQueryVo">
        <el-form-item label="欠费类别" prop="class">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="name" placeholder="请输入业主姓名/一卡通号码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column prop="ownerId" label="姓名"/>
        <el-table-column prop="ownerName" label="一卡通号码"/>
        <el-table-column prop="sex" label="联系方式"/>
        <el-table-column prop="phone" label="欠费类别"/>
        <el-table-column label="操作" width="">
          <template>
            <el-button size="mini" type="primary" @click="pay">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<el-carousel indicator-position="outside">-->
      <!--<el-carousel-item v-for="item in 4" :key="item">-->
        <!--<h3>{{ item }}</h3>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->

    <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>-->

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData"/>-->

    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--<line-chart :chart-data="lineChartData"/>-->
    <!--</el-row>-->

    <!--<el-row :gutter="32">-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<raddar-chart/>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart/>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<bar-chart/>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row :gutter="8">-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
    <!--<transaction-table/>-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<todo-list/>-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<box-card/>-->
    <!--</el-col>-->
    <!--</el-row>-->

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard',
      value: '',
      name: '',
      options: [{
        value: 1,
        label: '所有'
      }, {
        value: 2,
        label: '水费'
      }, {
        value: 3,
        label: '电费'
      }, {
        value: 4,
        label: '燃气费'
      }, {
        value: 5,
        label: '物业费'
      }],
      tableData: [{
        ownerId: '廖展亮',
        ownerName: '2015190323',
        sex: '1453567788',
        phone: '物业费'
      },{
        ownerId: '闫菲',
        ownerName: '20151903432',
        sex: '1453567788',
        phone: '水费'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    apply() {
      this.$router.push({path: '/service/serviceMa'})
    },
    complain() {
      this.$router.push({path: '/service/complain'})
    },
    pay() {
      this.$router.push({path: '/card/pay'})
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background: url("../img/2.jpg");
    background-repeat: no-repeat;
    background-position: center;

  }

  .el-carousel__item:nth-child(2n+1) {
    background: url("../img/3.jpg");
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
