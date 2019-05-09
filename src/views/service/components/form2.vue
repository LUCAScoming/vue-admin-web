<template>
  <div id="add-info" style="margin-left: 50px">
    <h2>服务申请处理表</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="述求业主">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="房产位置">
        <el-input v-model="form.position" />
      </el-form-item>
      <el-form-item label="申请内容">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="状态" prop="class">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审批结果">
        <el-input v-model="form.result" type="textarea" />
      </el-form-item>
      <el-form-item label="处理人">
        <el-input v-model="form.people" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Form2',
  data() {
    return {
      form: {
        name: '贾海凌',
        tel: '123456790',
        result: '同意办理',
        people: '闫菲',
        position: '16栋A单元1602',
        desc: '防盗门需要更换'
      },
      value: '选项1',
      options: [{
        value: '选项1',
        label: '处理完毕'
      }, {
        value: '选项2',
        label: '处理中'
      }, {
        value: '选项3',
        label: '未处理'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>

