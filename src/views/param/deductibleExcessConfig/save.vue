<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="免赔额类型" prop="deductibleExcessTyp" label-width="120px">
        <el-select v-model="form.deductibleExcessTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CDeductibleExcessTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊类型" prop="docTyp" label-width="120px">
        <el-select v-model="form.docTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊原因" prop="visitReason" label-width="120px">
        <el-select v-model="form.visitReason" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaVisitReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="适用条件" prop="applyCondition" label-width="120px">
        <el-select v-model="form.applyCondition" placeholder="请选择">
          <el-option
            v-for="item in businessData.CiRateCondition"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账单类型" prop="billTyp" label-width="120px">
        <el-select v-model="form.billTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CiRateBillTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="阶梯" prop="isLadder" label-width="120px">
        <el-select v-model="form.isLadder" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否医保投保" prop="isMedical" label-width="120px">
        <el-select v-model="form.isMedical" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医院网络码" prop="medicalNetworkCde" label-width="120px">
        <el-input v-model="form.medicalNetworkCde" placeholder="请选择医院网络码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

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
      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述	" prop="explainDesc" label-width="120px">
        <el-input v-model="form.explainDesc" placeholder="请输入解释码描述" />
      </el-form-item>
      <el-form-item label="免赔额" prop="deductibleExcessAmt" label-width="120px">
        <el-input v-model="form.deductibleExcessAmt" placeholder="请输入参免赔额" />
      </el-form-item>
      <el-form-item label="免赔额说明" prop="deductibleExcessDesc" label-width="120px">
        <el-input v-model="form.deductibleExcessDesc" placeholder="请输入免赔额说明" />
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
      basePath: 'deductibleExcessConfig',
      form: {
        id: '',
        paramCde: '',
        deductibleExcessDesc: '',
        deductibleExcessTyp: '',
        deductibleExcessAmt: '',
        medicalNetworkCde: '',
        visitReason: '',
        explainCde: '',
        explainDesc: '',
        treatmentTyp: '',
        treatmentDesc: '',
        applyCondition: '',
        billTyp: '',
        docTyp: '',
        isMedical: '',
        isLadder: ''
      },
      matchVisable: false,
      matchTyp: null,
      treatmentTyp: [],
      treatmentTypArr: ['1', '2', '3', '4'],
      checkAll: false,
      isIndeterminate: true,
      rules: {
        deductibleExcessTyp: [{ required: true, trigger: 'blur', message: '请输入免赔额类型' }],
        deductibleExcessDesc: [{ required: true, trigger: 'blur', message: '请输入免赔额说明' }],
        deductibleExcessAmt: [{ required: true, trigger: 'blur', message: '请输入免赔额' }],
        isLadder: [{ required: true, trigger: 'blur', message: '请选择阶梯' }],
        docTyp: [{ required: true, trigger: 'blur', message: '请选择就诊类型' }]
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
      this.form.paramCde = null
      this.form.deductibleExcessDesc = null
      this.form.deductibleExcessTyp = null
      this.form.deductibleExcessAmt = null
      this.form.medicalNetworkCde = null
      this.form.visitReason = null
      this.form.explainCde = null
      this.form.explainDesc = null
      this.form.treatmentTyp = null
      this.form.treatmentDesc = null
      this.form.applyCondition = null
      this.form.billTyp = null
      this.form.docTyp = null
      this.form.isMedical = null
      this.form.isLadder = null
      this.treatmentTyp = []
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.prodCde) { // 参数码
        this.form.medicalNetworkCde = data.prodCde
      }
      if (data.explCde) { // 解释码
        this.form.explainCde = data.explCde
        this.form.explainDesc = data.explCdeDesc
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

