<template>
  <div id="add-info" style="margin-left: 50px">
    <h2>投诉建议处理表</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="述求业主">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="述求事项">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
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
      <el-form-item label="处理结果">
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
  name: 'Form1',
  data() {
    return {
      form: {
        name: '贾海凌',
        tel: '123456790',
        result: '感谢您的反馈，我们会在三天之内处理好本情况',
        people: '闫菲',
        desc: '希望每天都有清洁人员来打扫楼道，有时候垃圾排的有点多，冬天还好，夏天异味大'
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

