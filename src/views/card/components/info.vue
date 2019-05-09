<template>
  <div id="add-info" style="margin-left: 50px">
    <h2 style="text-align: center">收费项目信息表</h2>
    <el-form ref="addInfo" :rules="rules" :model="data" label-width="120px">
      <el-form-item label= "项目编码" prop="roles">
        <el-input v-model="data.id" style="width:200px"/>
      </el-form-item>
      <el-form-item label="收费项目" prop="signName">
        <el-input v-model="data.signName" style="width:200px"/>
      </el-form-item>
      <el-form-item label="单价" prop="signName">
        <el-input v-model="data.signName" style="width:200px"/>
      </el-form-item>
      <el-form-item label="单位" prop="realName">
        <el-input v-model="data.realName" style="width:200px"/>
      </el-form-item>
      <el-form-item label="周期" prop="password">
        <el-input v-model="data.password" style="width:200px"/>
      </el-form-item>
      <el-form-item label="创建人" prop="mobile">
        <el-input v-model="data.mobile" style="width:200px"/>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="saveTeacher">提交</el-button>
        <el-button type="primary" @click="updateTeacher">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import areaSelect from './areaSelect'
// import teacherApi from '@/api/mathsgo/teacher-msg'
export default {
  name: 'Info',
  data() {
    return {
      data: {
        roles: [],
        signName: '',
        password: '',
        mobile: '',
        teacher: {},
        type: 3
      },
      value1: '',
      isEdit: '',
      value: '',
      province: '',
      city: '',
      country: '',
      options1: [],
      provinces: [],
      cities: [],
      countries: [],
      schools: [],
      classes: [],
      props: {
        id: '',
        value: 'label',
        label: 'name',
        children: 'children',
        disabled: false
      },
      selectedOptions: '',
      rules: {
        roles: [{ required: true, message: '角色不能为空', trigger: 'change' }],
        signName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        mobile: [{ required: true, message: '联系方式必填', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  mounted() {
  },
  created() {
    // this.getProvince()
    // this.getRoles()
  },
  methods: {
    dataClear() {
      this.isEdit = 0
      this.data = {
        roles: [],
        signName: '',
        password: '',
        mobile: '',
        teacher: {},
        type: 3
      }
      this.province = ''
      this.city = ''
      this.country = ''
      this.options1 = []
      this.provinces = []
      this.cities = []
      this.countries = []
      this.schools = []
      this.classes = []
    },
    editTeacher(id) {
      this.isEdit = 1
      this.data = {
        roles: [],
        signName: '',
        password: '',
        mobile: '',
        teacher: {},
        type: 3
      }
      //     teacherApi.editTeacher(id).then(data => {
      //       this.data = Object.assign(this.data, data.obj)
      //       var areaArray = this.data.teacher.areaId.split(',')
      //       var areaArray1 = this.data.teacher.area.split('/')
      //       console.log(areaArray1[0])
      //       this.getArea(areaArray[0])
      //       this.getArea(areaArray[1])
      //       this.getSchool(areaArray[2])
      //       this.getClass(this.data.teacher.schoolId)
      //       this.province = areaArray1[0]
      //       this.city = areaArray1[1]
      //       this.country = areaArray1[2]
      //     }).catch(err => {
      //       console.log(err)
      //     })
      //   },
      //   getProvince() {
      //     var _this = this
      //     teacherApi.dataPermission(0)
      //       .then(data => {
      //         _this.provinces = data.obj
      //         return _this.provinces
      //       }, err => {
      //         console.log(err)
      //         _this.$message.error(err.msg)
      //       })
      //   },
      //   getArea(value) {
      //     if (value !== '') {
      //       console.log(value)
      //       teacherApi.dataPermission(value)
      //         .then(data => {
      //           if (value.toString().length === 2) {
      //             this.cities = data.obj
      //           } else {
      //             this.countries = data.obj
      //           }
      //         }, err => {
      //           console.log(err)
      //           this.$message.error(err.msg)
      //         })
      //     }
      //   },
      //   getSchool(value) {
      //     console.log(value)
      //     if (value !== '') {
      //       teacherApi.getSchool(value)
      //         .then(data => {
      //           this.schools = data.obj
      //         }, err => {
      //           console.log(err)
      //           this.$message.error(err.msg)
      //         })
      //     }
      //   },
      //   getClass(value) {
      //     if (value !== '') {
      //       teacherApi.getClass(value)
      //         .then(data => {
      //           this.classes = data.obj
      //         }, err => {
      //           console.log(err)
      //           this.$message.error(err.msg)
      //         })
      //     }
      //   },
      //   saveTeacher() {
      //     const obj = this.data
      //     console.log(obj)
      //     this.$refs.addTeacher.validate((valid) => {
      //       if (valid) {
      //         teacherApi.saveTeacher(obj).then(data => {
      //           this.$message.success('保存成功')
      //           this.$emit('close')
      //         }).catch(err => {
      //           console.log(err)
      //           this.$message.error(err.msg)
      //         })
      //       } else {
      //         this.$alert('数据格式不完整')
      //       }
      //     })
      //   },
      //   updateTeacher() {
      //     const obj = this.data
      //     this.$refs.addTeacher.validate((valid) => {
      //       if (valid) {
      //         teacherApi.updateTeacher(obj).then(data => {
      //           this.$message.success('保存成功')
      //           this.$emit('close')
      //         }).catch(err => {
      //           console.log(err)
      //           this.$message.error(err.msg)
      //         })
      //       } else {
      //         this.$alert('数据格式不完整')
      //       }
      //     })
      //   },
      //   getRoles() {
      //     const type = this.data.type
      //     teacherApi.getRoles(type).then(data => {
      //       this.roles = data.obj
      //     }).catch(error => {
      //       console.log(error)
      //       this.$message.error('保存失败')
      //     })
    }
  }
}
</script>

<style scoped>

</style>

