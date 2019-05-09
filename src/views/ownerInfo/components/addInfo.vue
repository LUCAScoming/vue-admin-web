<template>
  <div id="add-info" style="margin-left: 50px">
    <h2 style="text-align: center">业主信息登记表</h2>
    <el-form ref="addInfo" :model="data" label-width="120px">
      <el-form-item label="业主ID" prop="roles">
        <el-input v-model="data.ownerId" style="width:200px" />
      </el-form-item>
      <el-form-item label="证件类型" prop="class">
        <el-select v-model="data.idtyType" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="data.idtyNum" style="width:200px" />
      </el-form-item>
      <el-form-item label="业主姓名">
        <el-input v-model="data.ownerName" style="width:200px" />
      </el-form-item>
      <el-form-item v-show="isEdit === 1" label="性别">
        {{ data.sex | sexFilter }}
      </el-form-item>
      <el-form-item v-show="isEdit === 0" label="性别" >
        <el-select v-model="data.sex" placeholder="请选择">
          <el-option
            v-for="item in sex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="data.phone" style="width:200px" />
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="data.nativePlace" style="width:200px" />
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="data.national" style="width:200px" />
      </el-form-item>
      <el-form-item label="紧急联系人">
        <el-input v-model="data.emergencyName" style="width:200px" />
      </el-form-item>
      <el-form-item label="紧急联系人电话">
        <el-input v-model="data.emergencyContact" style="width:200px" />
      </el-form-item>
      <el-form-item label="关系" >
        <el-input v-model="data.emergencyRelationship" style="width:200px" />
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="data.phone" style="width:200px" />
      </el-form-item>
      <el-form-item label="家庭成员" >
        <el-input v-model="data.familyId" style="width:200px" />
      </el-form-item>
      <el-form-item label="一卡通号码">
        <el-input v-model="data.cardNum" style="width:200px" />
      </el-form-item>
      <!--<el-form-item label="家庭成员数" >-->
        <!--<el-input v-model="data.mobile" style="width:200px" />-->
      <!--</el-form-item>-->
      <!--<el-form-item label="一卡通余额" >-->
        <!--<el-input v-model="data.mobile" style="width:200px" />-->
      <!--</el-form-item>-->
      <el-form-item label="学历">
        <el-select v-model="data.degree" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="data.politicalLandscape" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="楼层单元">
        <el-input v-model="data.building" style="width:200px" />
      </el-form-item>
      <el-form-item label="房间号码">
        <el-input v-model="data.homeNum" style="width:200px" />
      </el-form-item>
      <p>以下为非必填项</p>
      <el-form-item label="工作单位" prop="signName">
        <el-input v-model="data.familyMembersList.workPosition" style="width:200px" />
      </el-form-item>
      <el-form-item label="工作职务" prop="signName">
        <el-input v-model="data.familyMembersList.workName" style="width:200px" />
      </el-form-item>
      <el-form-item label="工作地址" prop="realName">
        <el-input v-model="data.familyMembersList.workPlace" style="width:200px" />
      </el-form-item>
      <el-form-item label="家庭成员姓名" prop="password">
        <el-input v-model="data.familyMembersList.memberName" style="width:200px" />
      </el-form-item>
      <el-form-item label="关系" prop="mobile">
        <el-input v-model="data.familyMembersList.relation" style="width:200px" />
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="data.familyMembersList.phone" style="width:200px" />
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="updateOwnerInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ownerInfoApi from '@/api/ownerInfo'

export default {
  name: 'AddInfo',
  filters: {
    sexFilter(sex) {
      if (sex === 0) return '男'
      else if (sex === 1) return '女'
      else return '其他'
    }
  },
  data() {
    return {
      isEdit: 1,
      options: [{
        value: 1,
        label: '小学'
      }, {
        value: 2,
        label: '初中'
      }, {
        value: 3,
        label: '高中'
      }, {
        value: 4,
        label: '本科'
      }, {
        value: 5,
        label: '硕士'
      }, {
        value: 6,
        label: '博士'
      }, {
        value: 7,
        label: '博士后'
      }],
      options1: [{
        value: 0,
        label: '群众'
      }, {
        value: 1,
        label: '共青团员'
      }, {
        value: 2,
        label: '预备党员'
      }, {
        value: 3,
        label: '党员'
      }],
      options2: [{
        value: 1,
        label: '身份证'
      }, {
        value: 2,
        label: '军人'
      }, {
        value: 3,
        label: '港澳'
      }, {
        value: 4,
        label: '外籍'
      }],
      sex: [{
        value: 0,
        label: '男'
      }, {
        value: 1,
        label: '女'
      }],
      data: {
        ownerId: null,
        idtyType: '',
        idtyNum: '',
        ownerName: '',
        sex: '',
        nativePlace: '',
        emergencyName: '',
        emergencyContact: '',
        emergencyRelationship: '',
        familyId: '',
        cardNum: '',
        phone: '',
        degree: '',
        politicalLandscape: '',
        building: '',
        homeNum: '',
        national: '',
        familyMembersList: {
          id: '',
          identy: '',
          memberId: '',
          memberName: '',
          ownerId: '',
          pageNum: null,
          pageSize: null,
          phone: '',
          relation: null,
          workName: '',
          workPlace: '',
          workPosition: ''
        }
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
        ownerId: null,
        idtyType: '',
        idtyNum: '',
        ownerName: '',
        sex: '',
        nativePlace: '',
        emergencyContact: '',
        emergencyRelationship: '',
        familyId: '',
        cardNum: '',
        phone: '',
        degree: '',
        politicalLandscape: '',
        building: '',
        homeNum: '',
        familyMembersList: {
          id: '',
          identy: '',
          memberId: '',
          memberName: '',
          ownerId: '',
          pageNum: null,
          pageSize: null,
          phone: '',
          relation: null,
          workName: '',
          workPlace: '',
          workPosition: ''
        }
      }
    },
    editManager(id) {
      this.isEdit = 1
      this.data = {
        ownerId: null,
        idtyType: '',
        idtyNum: '',
        ownerName: '',
        sex: '',
        nativePlace: '',
        emergencyContact: '',
        emergencyRelationship: '',
        familyId: '',
        cardNum: '',
        phone: '',
        degree: '',
        politicalLandscape: '',
        building: null,
        homeNum: '',
        familyMembersList: {
          id: '',
          identy: '',
          memberId: '',
          memberName: '',
          ownerId: '',
          pageNum: null,
          pageSize: null,
          phone: '',
          relation: null,
          workName: '',
          workPlace: '',
          workPosition: ''
        }
      }
      ownerInfoApi.editInfo(id).then(data => {
        this.data = data
        console.log(this.data.building)
      }).catch(err => {
        console.log(err)
      })
    },
    sexFormat(row) {
      if (row.sex === 0) {
        return '男'
      } else if (row.sex === 1) {
        return '女'
      }
    },
    updateOwnerInfo() {
      const obj = this.data
      console.log(obj)
      this.$refs.addInfo.validate((valid) => {
        if (valid) {
          ownerInfoApi.editOwner(obj).then(data => {
            this.$message.success('保存成功')
            this.$emit('close')
          }).catch(err => {
            console.log(err)
            this.$message.error(err.msg)
          })
        } else {
          this.$alert('数据格式不完整')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

