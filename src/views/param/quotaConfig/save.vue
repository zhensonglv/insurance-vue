<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="限额类型" prop="quotaTyp" label-width="120px">
        <el-select v-model="form.quotaTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaTyp"
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
      <el-form-item label="金额类型" prop="amountTyp" label-width="120px">
        <el-select v-model="form.amountTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaAmountTyp"
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
      <el-form-item label="限额次数类型" prop="timesTyp" label-width="120px">
        <el-select v-model="form.timesTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaTimesTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="限额次数" prop="qoutaTimes" label-width="120px">
        <el-input v-model="form.qoutaTimes" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="累计次数" prop="sumTimes" label-width="120px">
        <el-input v-model="form.sumTimes" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="累计限额" prop="aggregateLimitDesc" label-width="120px">
        <el-input v-model="form.aggregateLimitDesc" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="治疗类型" prop="treatmentDesc" label-width="120px">
        <el-input v-model="form.treatmentDesc" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="医院网络码" prop="medicalNetworkCde" label-width="120px">
        <el-input v-model="form.medicalNetworkCde" placeholder="请输入参数描述">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="解释码描述" prop="explainDesc" label-width="120px">
        <el-input v-model="form.explainDesc" placeholder="请输入参数描述" />
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
      <el-form-item label="限额" prop="quotaAmt" label-width="120px">
        <el-input v-model="form.quotaAmt" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="限额描述" prop="quotaDesc" label-width="120px">
        <el-input v-model="form.quotaDesc" placeholder="请输入参数描述" />
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
      basePath: 'quotaConfig',
      form: {
        id: '',
        paramCde: '',
        quotaDesc: '',
        medicalNetworkCde: '',
        quotaTyp: '',
        visitReason: '',
        explainCde: '',
        explainDesc: '',
        quotaAmt: '',
        amountTyp: '',
        billTyp: '',
        applyCondition: '',
        aggregateLimitDesc: '',
        timesTyp: '',
        qoutaTimes: '',
        sumTimes: '',
        docTyp: '',
        isMedical: '',
        treatmentDesc: '',
        isLadder: ''

      },
      matchVisable: false,
      rules: {
        quotaDesc: [{ required: true, trigger: 'blur', message: '请输入限额描述' }],
        quotaTyp: [{ required: true, trigger: 'blur', message: '请选择限额类型' }],
        visitReason: [{ required: true, trigger: 'blur', message: '请选择就诊原因' }],
        amountTyp: [{ required: true, trigger: 'blur', message: '请选择金额类型' }],
        quotaAmt: [{ required: true, trigger: 'blur', message: '请输入限额' }],
        isLadder: [{ required: true, trigger: 'blur', message: '请选择阶梯' }]
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
      this.form.paramCde = null
      this.form.quotaDesc = null
      this.form.medicalNetworkCde = null
      this.form.quotaTyp = null
      this.form.visitReason = null
      this.form.explainCde = null
      this.form.explainDesc = null
      this.form.quotaAmt = null
      this.form.amountTyp = null
      this.form.billTyp = null
      this.form.applyCondition = null
      this.form.aggregateLimitDesc = null
      this.form.timesTyp = null
      this.form.qoutaTimes = null
      this.form.sumTimes = null
      this.form.docTyp = null
      this.form.isMedical = null
      this.form.treatmentDesc = null
      this.form.isLadder = null
    },

    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      debugger
      this.form.medicalNetworkCde = data[0].prodCde
    },

    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
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
</style>

