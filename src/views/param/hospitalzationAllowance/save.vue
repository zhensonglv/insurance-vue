<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="津贴码" prop="hospitalizationCde" label-width="120px">
        <el-input v-model="form.hospitalizationCde" placeholder="请输入津贴码" />
      </el-form-item>

      <el-form-item label="住院津贴说明" prop="hospitalizationDesc" label-width="120px">
        <el-input v-model="form.hospitalizationDesc" placeholder="请输入住院津贴说明" />
      </el-form-item>

      <el-form-item label="津贴类型" prop="hospitalizationTyp" label-width="120px">
        <el-select v-model="form.hospitalizationTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CHospitalizationTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="免赔天数" prop="deductionDays" label-width="120px">
        <el-input v-model="form.deductionDays" placeholder="请输入免赔天数" />
      </el-form-item>

      <el-form-item label="限额天数" prop="quotaDays" label-width="120px">
        <el-input v-model="form.quotaDays" placeholder="请输入限额天数" />
      </el-form-item>

      <el-form-item label="津贴" prop="hospitalizationAmount" label-width="120px">
        <el-input v-model="form.hospitalizationAmount" placeholder="请输入津贴" />
      </el-form-item>

      <el-form-item label="医院网络码" prop="medicalNetworkCde" label-width="120px">
        <el-input v-model="form.medicalNetworkCde" placeholder="请选择医院网络码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="医院描述" prop="hospitalDesc" label-width="120px">
        <el-input v-model="form.hospitalDesc" placeholder="请输入医院描述" />
      </el-form-item>

      <el-form-item label="诊疗码" prop="treatmentNo" label-width="120px">
        <el-input v-model="form.treatmentNo" placeholder="请输入诊疗码" />
      </el-form-item>

      <el-form-item label="诊疗码描述" prop="treatmentCodeDesc" label-width="120px">
        <el-input v-model="form.treatmentCodeDesc" placeholder="请输入诊疗码描述" />
      </el-form-item>

      <el-form-item label="诊断码" prop="diaMatParameterCde" label-width="120px">
        <el-input v-model="form.diaMatParameterCde" placeholder="请输入诊断码" />
      </el-form-item>

      <el-form-item label="诊断码描述" prop="diagnoseCodeDesc" label-width="120px">
        <el-input v-model="form.diagnoseCodeDesc" placeholder="请输入诊断码描述" />
      </el-form-item>

      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请输入解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explainCodeDesc" label-width="120px">
        <el-input v-model="form.explainCodeDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="就诊原因" prop="visitReson" label-width="120px">
        <el-select v-model="form.visitReson" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaVisitReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="住院天数调整" prop="inHospitalDays" label-width="120px">
        <el-input v-model="form.inHospitalDays" placeholder="请输入住院天数调整" />
      </el-form-item>

      <el-form-item label="治疗类型" prop="treatmentTyp" label-width="240px">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="form.medicInsureDesc" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="item in businessData.CiTreatmentTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >{{ item.label }}</el-checkbox>

        </el-checkbox-group>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
      <el-button type="primary" @click="onSubmit('form')">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save, edit } from '@/api/base'
import Match from './match'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  components: {
    Match
  },
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'hospitalzationAllowance',
      form: {
        id: '',
        hospitalizationCde: '',
        hospitalizationDesc: '',
        hospitalizationTyp: '',
        deductionDays: '',
        quotaDays: '',
        hospitalizationAmount: '',
        medicalNetworkCde: '',
        hospitalDesc: '',
        treatmentNo: '',
        treatmentCodeDesc: '',
        diagnoseCodeDesc: '',
        explainCde: '',
        explainCodeDesc: '',
        visitReson: '',
        inHospitalDays: '',
        treatmentTyp: '',
        diaMatParameterCde: '',
        medicInsureDesc: []
      },
      medicInsureArr: ['特需就诊', '康复就诊', '一般就诊', '急诊'],
      checkAll: false,
      isIndeterminate: true,
      matchVisable: false,
      matchTyp: null,
      rules: {
        hospitalizationCde: [{ required: true, trigger: 'blur', message: '请输入津贴码' }],
        hospitalizationDesc: [{ required: true, trigger: 'blur', message: '请输入津贴码说明' }],
        hospitalizationTyp: [{ required: true, trigger: 'blur', message: '请输入津贴类型' }],
        deductionDays: [{ required: true, trigger: 'blur', message: '请输入免赔天数' }],
        quotaDays: [{ required: true, trigger: 'blur', message: '请输入限额天数' }],
        diaMatParameterCde: [{ required: true, trigger: 'blur', message: '请输入诊断码' }],
        diagnoseCodeDesc: [{ required: true, trigger: 'blur', message: '请输入诊断码描述' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (newVal.id != null) {
        this.dialogTitle = 'Edit'
      } else {
        this.dialogTitle = 'Add'
      }
    }
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    clearForm() {
      this.form.id = null
      this.form.hospitalizationCde = null
      this.form.hospitalizationDesc = null
      this.form.hospitalizationTyp = null
      this.form.deductionDays = null
      this.form.quotaDays = null
      this.form.hospitalizationAmount = null
      this.form.medicalNetworkCde = null
      this.form.hospitalDesc = null
      this.form.treatmentNo = null
      this.form.treatmentCodeDesc = null
      this.form.diagnoseCodeDesc = null
      this.form.explainCde = null
      this.form.explainCodeDesc = null
      this.form.visitReson = null
      this.form.inHospitalDays = null
      this.form.treatmentTyp = null
      this.form.diaMatParameterCde = null
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.prodCde) { // 参数码
        this.form.medicalNetworkCde = data.prodCde
        this.form.hospitalDesc = data.paramterDesc
      }
      if (data.explCde) { // 解释码
        this.form.explainCde = data.explCde
        this.form.explainCodeDesc = data.explCdeDesc
      }
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    handleCheckAllChange(val) {
      this.form.medicInsureDesc = val ? this.medicInsureArr : []
      console.log(this.form.medicInsureDesc)
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      debugger
      const checkedCount = value.length
      this.checkAll = checkedCount === this.businessData.CiTreatmentTyp.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.businessData.CiTreatmentTyp.length
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            console.log(this.form.medicInsureDesc)
            save(this.basePath, this.form).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('sonStatus', true)
                this.dialogVisible = false
              } else {
                this._notify(response.msg, 'error')
              }
            })
          } else {
            edit(this.basePath, this.form).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('sonStatus', true)
                this.dialogVisible = false
              } else {
                this._notify(response.msg, 'error')
              }
            })
          }
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css">
  .line {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

