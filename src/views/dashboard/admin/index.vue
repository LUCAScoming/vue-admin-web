<template>
  <div class="dashboard-editor-container">

    <h1 align="center">欢迎来到物业管理系统</h1>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

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
      currentRole: 'adminDashboard'
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
