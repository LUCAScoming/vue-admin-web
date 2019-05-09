<template>
  <div id="details" style="margin-left: 50px">
    <h2 style="text-align: center">房产信息变更表</h2>
    <el-form ref="details" :model="data" label-width="120px">
      <el-form-item label="业主ID" prop="roles">
        <el-input v-model="data.ownerId" style="width:200px" />
      </el-form-item>
      <el-form-item label="业主姓名">
        <el-input v-model="data.ownerName" style="width:200px" />
      </el-form-item>
      <!--<el-form-item v-show="isEdit === 1" label="性别">-->
        <!--{{ data.sex | sexFilter }}-->
      <!--</el-form-item>-->
      <el-form-item label="性别">
        <el-select v-model="data.sex" placeholder="请选择">
          <el-option
            v-for="item in sex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="楼栋单元">
        <el-input v-model="data.building" style="width:200px" />
      </el-form-item>
      <el-form-item label="房间号码">
        <el-input v-model="data.homeNum" style="width:200px" />
      </el-form-item>
      <el-form-item label="房屋面积">
        <el-input v-model="data.houseArea" style="width:200px" />
      </el-form-item>
      <el-form-item label="房型">
        <el-input v-model="data.houseStructure" style="width:200px" />
      </el-form-item>
      <el-form-item label="房屋属性">
        <el-select v-model="data.houseType" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
    </el-form-item>
      <el-form-item label="购房日期">
        <el-date-picker
          v-model="data.buyhouseDate"
          type="date"
          placeholder="选择日期"
          style="width:200px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="data.phone" style="width:200px" />
      </el-form-item>
      <el-form-item label="变更信息">
        <el-input v-model="data.comment" type="textarea" ></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="updateOwnerInfo">提交</el-button>
        <el-button type="primary">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import houseInfoApi from '@/api/houseInfo'

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
      sex: [{
        value: 0,
        label: '男'
      }, {
        value: 1,
        label: '女'
      }],
      types: [{
        value: 0,
        label: '商品房'
      }, {
        value: 1,
        label: '房改房'
      }, {
        value: 2,
        label: '存量房'
      }, {
        value: 3,
        label: '集资房'
      }, {
        value: 4,
        label: '安居工程住房'
      }, {
        value: 5,
        label: '经济适用住房'
      }],
      data: {
        ownerId: null,
        ownerName: '',
        sex: null,
        phone: '',
        building: '',
        homeNum: null,
        houseArea: null,
        houseType: null,
        houseStructure: '',
        comment: '',
        buyhouseDate: ''
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
        ownerName: '',
        sex: null,
        phone: '',
        building: '',
        homeNum: null,
        houseArea: null,
        houseType: null,
        houseStructure: '',
        comment: '',
        buyhouseDate: ''
      }
    },
    editManager(id) {
      this.isEdit = 1
      this.data = {
        ownerId: null,
        ownerName: '',
        sex: '',
        phone: '',
        building: '',
        homeNum: null,
        houseArea: null,
        houseType: null,
        houseStructure: '',
        comment: '',
        buyhouseDate: ''
      }
      houseInfoApi.editInfo(id).then(data => {
        this.data = data
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
      debugger
      this.$refs.details.validate((valid) => {
        if (valid) {
          houseInfoApi.editHouse(obj).then(data => {
            this.$message.success('保存成功')
            this.$emit('close')
            debugger
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

