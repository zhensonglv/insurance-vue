<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="赔付比例码" prop="ciRateCde" label-width="120px">
        <el-input v-model="form.ciRateCde" placeholder="请输入赔付比例码" disabled="disabled" />
      </el-form-item>

      <el-form-item label="适用条件" prop="conditionCde" label-width="120px">
        <el-select v-model="form.conditionCde" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CiRateCondition"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="赔付比例说明" prop="ciRateExplain" label-width="120px">
        <el-input v-model="form.ciRateExplain" placeholder="请输入赔付比例说明" />
      </el-form-item>

      <el-form-item label="阶梯" prop="ladderCde" label-width="120px">
        <el-select v-model="form.ladderCde" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="赔付比例" prop="ciRate" label-width="120px">
        <el-input v-model="form.ciRate" placeholder="请输入赔付比例" />
      </el-form-item>

      <el-form-item label="赔付比例类型" prop="ciRateTyp" label-width="120px">
        <el-select v-model="form.ciRateTyp" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CiRateTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医院网络码" prop="medicalNetwork" label-width="120px">
        <el-input v-model="form.medicalNetwork" placeholder="请选择医院网络码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="就诊原因" prop="visitReson" label-width="120px">
        <el-select v-model="form.visitReson" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaVisitReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="账单类型" prop="billTyp" label-width="120px">
        <el-select v-model="form.billTyp" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CiRateBillTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="就诊类型" prop="visitTyp" label-width="120px">
        <el-select v-model="form.visitTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explainCdeDesc" label-width="120px">
        <el-input v-model="form.explainCdeDesc" placeholder="请输入解释码描述" />
      </el-form-item>
      <el-form-item label="是否医保投保" prop="ismedicalIns" label-width="120px">
        <el-select v-model="form.ismedicalIns" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-row>
        <el-form-item label="治疗类型" prop="treatmentTyp" label-width="120px">
          <div class="check">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin-left: 20px" />
            <el-checkbox-group v-model="treatmentTyp" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="item in businessData.CiTreatmentTyp"
                :key="item.value"
                :label="item.value"
              >{{ item.value+"-"+item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-row>
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
  components: {
    Match
  },
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'ciRate',
      form: {
        id: '',
        conditionCde: '',
        ciRateCde: '',
        ciRateExplain: '',
        ladderCde: '',
        ciRate: '',
        ciRateTyp: '',
        medicalNetwork: '',
        visitReson: '',
        billTyp: '',
        visitTyp: '',
        explainCde: '',
        explainCdeDesc: '',
        treatmentTyp: [],
        ismedicalIns: ''
      },
      matchVisable: false,
      matchTyp: null,
      treatmentTyp: [],
      treatmentTypArr: ['1', '2', '3', '4'],
      checkAll: false,
      isIndeterminate: true,
      rules: {
        ciRateCde: [{ required: true, trigger: 'blur', message: '请输入赔付比例码' }],
        ladderCde: [{ required: true, trigger: 'blur', message: '请选择是否阶梯' }],
        visitTyp: [{ required: true, trigger: 'blur', message: '请选择就诊类型' }],
        ciRate: [{ required: true, trigger: 'blur', message: '请输入赔付比例' }],
        conditionCde: [{ required: true, trigger: 'blur', message: '请选择适用条件' }],
        ciRateTyp: [{ required: true, trigger: 'blur', message: '请选择赔付类型' }]

      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (this.form.treatmentTyp) {
        this.treatmentTyp = this.form.treatmentTyp
      }
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
      this.form.conditionCde = null
      this.form.ciRateCde = null
      this.form.ciRateExplain = null
      this.form.ladderCde = null
      this.form.ciRate = null
      this.form.ciRateTyp = null
      this.form.medicalNetwork = null
      this.form.visitReson = null
      this.form.billTyp = null
      this.form.visitTyp = null
      this.form.explainCde = null
      this.form.explainCdeDesc = null
      this.form.treatmentTyp = null
      this.form.ismedicalIns = null
      this.treatmentTyp = []
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.prodCde) { // 医院网络码
        this.$set(this.form, 'medicalNetwork', data.prodCde)
      }
      if (data.explCde) { // 解释码
        this.$set(this.form, 'explainCde', data.explCde)
        this.$set(this.form, 'explainCdeDesc', data.explCdeDesc)
      }
    },
    handleCheckAllChange(val) {
      this.treatmentTyp = val ? this.treatmentTypArr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.businessData.CiTreatmentTyp.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.businessData.CiTreatmentTyp.length
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.treatmentTyp = this.treatmentTyp
          if (this.form.id === null) {
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
  .check {
    display: flex;
    justify-content: flex-start;
  }
</style>

