<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="赔付比例码" prop="ciRateCde" label-width="120px">
        <el-input v-model="form.ciRateCde" placeholder="请输入赔付比例码" />
      </el-form-item>
      <el-form-item label="适用条件" prop="condition" label-width="120px">
        <el-input v-model="form.condition" placeholder="请输入适用条件" />
      </el-form-item>
      <el-form-item label="赔付比例说明" prop="ciRateExplain" label-width="120px">
        <el-input v-model="form.ciRateExplain" placeholder="请输入赔付比例说明" />
      </el-form-item>

      <el-form-item label="是否设置阶梯共保比例" prop="ladder" label-width="120px">
        <el-input v-model="form.ladder" placeholder="请输入是否设置阶梯共保比例" />
      </el-form-item>

      <el-form-item label="赔付比例" prop="ciRate" label-width="120px">
        <el-input v-model="form.ciRate" placeholder="请输入赔付比例" />
      </el-form-item>

      <el-form-item label="赔付比例类型" prop="ciRateTyp" label-width="120px">
        <el-input v-model="form.ciRateTyp" placeholder="请输入赔付比例类型" />
      </el-form-item>

      <el-form-item label="医院网络码" prop="medicalNetworkCde" label-width="120px">
        <el-input v-model="form.medicalNetworkCde" placeholder="请输入医院网络码" />
      </el-form-item>

      <el-form-item label="就诊原因" prop="visitReson" label-width="120px">
        <el-input v-model="form.visitReson" placeholder="请输入就诊原因" />
      </el-form-item>

      <el-form-item label="账单类型" prop="billTyp" label-width="120px">
        <el-input v-model="form.billTyp" placeholder="请输入账单类型" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="visitTyp" label-width="120px">
        <el-input v-model="form.visitTyp" placeholder="请输入就诊类型" />
      </el-form-item>

      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请输入解释码" />
      </el-form-item>

      <el-form-item label="解释码描述" prop="explainCdeDesc" label-width="120px">
        <el-input v-model="form.explainCdeDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="治疗类型" prop="treatmentTyp" label-width="120px">
        <el-input v-model="form.treatmentTyp" placeholder="请输入治疗类型" />
      </el-form-item>

      <el-form-item label="是否医保投保" prop="ismedicalIns" label-width="120px">
        <el-input v-model="form.ismedicalIns" placeholder="请输入是否医保投保" />
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

export default {
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
        condition: '',
        ciRateCde: '',
        ciRateExplain: '',
        ladder: '',
        ciRate: '',
        ciRateTyp: '',
        medicalNetworkCde: '',
        visitReson: '',
        billTyp: '',
        visitTyp: '',
        explainCde: '',
        explainCdeDesc: '',
        treatmentTyp: '',
        ismedicalIns: ''
      },
      rules: {
        ciRateCde: [{ required: true, trigger: 'blur', message: '请输入赔付比例码' }]

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
      this.form.condition = null
      this.form.ciRateCde = null
      this.form.ciRateExplain = null
      this.form.ladder = null
      this.form.ciRate = null
      this.form.ciRateTyp = null
      this.form.medicalNetworkCde = null
      this.form.visitReson = null
      this.form.billTyp = null
      this.form.visitTyp = null
      this.form.explainCde = null
      this.form.explainCdeDesc = null
      this.form.treatmentTyp = null
      this.form.ismedicalIns = null
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

