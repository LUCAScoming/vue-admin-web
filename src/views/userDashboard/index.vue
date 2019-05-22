<template>
  <el-form ref="form" :model="form" label-width="80px">
    <h3>物业通告</h3>
    <el-form-item label="活动名称">
      <a href="#">告业主通知书(关于遛狗宠物问题)</a>
      <span>2019-04-12</span>
    </el-form-item>
    <el-form-item label="活动区域">
      <a href="#">关于小区绿化改造通知</a>
      <span>2019-04-12</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
