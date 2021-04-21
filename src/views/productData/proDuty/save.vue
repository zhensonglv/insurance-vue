<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="责任号" prop="proDuty" label-width="120px">
        <el-input v-model="form.proDuty" placeholder="请输入责任号" />
      </el-form-item>
      <el-form-item label="责任名称" prop="proDutyNme" label-width="120px">
        <el-input v-model="form.proDutyNme" placeholder="请输入责任名称" />
      </el-form-item>
      <el-form-item label="责任生效日" prop="proDutyEffectiveTm" label-width="120px">
        <el-date-picker
          v-model="form.proDutyEffectiveTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="责任终止日" prop="proDutyExpiryTm" label-width="120px">
        <el-date-picker
          v-model="form.proDutyExpiryTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="责任类型" prop="proDutyTyp" label-width="120px">
        <el-select v-model="form.proDutyTyp" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.CProDutyTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊类型" prop="vistDoctor" label-width="120px">
        <el-select v-model="form.vistDoctor" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.CProDutyDesc"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否意外" prop="isAcciddent" label-width="120px">
        <el-select v-model="form.isAcciddent" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.CIsAcciddent"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否生育" prop="isBirth" label-width="120px">
        <el-select v-model="form.isBirth" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否齿科" prop="isDentidtry" label-width="120px">
        <el-select v-model="form.isDentidtry" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否重疾" prop="isStricken" label-width="120px">
        <el-select v-model="form.isStricken" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否急诊" prop="isEmergTreat" label-width="120px">
        <el-select v-model="form.isEmergTreat" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否缺材料" prop="isLackMaterial" label-width="120px">
        <el-select v-model="form.isLackMaterial" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否既往病史" prop="isMedicalHistory" label-width="120px">
        <el-select v-model="form.isMedicalHistory" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否工伤" prop="isInjuryJob" label-width="120px">
        <el-select v-model="form.isInjuryJob" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="门诊特殊" prop="specialOutPatient" label-width="120px">
        <el-select v-model="form.specialOutPatient" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      basePath: 'proDuty',
      form: {
        id: '',
        proDuty: '',
        proDutyTyp: '',
        proDutyDesc: '',
        proDutyEffectiveTm: '',
        proDutyExpiryTm: '',
        proDutyNme: '',
        vistDoctor: '',
        isAcciddent: '',
        isEmergTreat: '',
        isLackMaterial: '',
        isMedicalHistory: '',
        isBirth: '',
        isInjuryJob: '',
        isStricken: '',
        specialOutPatient: '',
        isDentidtry: ''
      },
      rules: {
        proDutyNme: [{ required: true, trigger: 'blur', message: '请输入责任名称' }],
        proDuty: [{ required: true, trigger: 'blur', message: '请输入责任号' }]

      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.imgURL = this.form.avatar
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
      this.form.proDuty = null
      this.form.proDutyTyp = null
      this.form.proDutyDesc = null
      this.form.proDutyEffectiveTm = null
      this.form.proDutyExpiryTm = null
      this.form.proDutyNme = null
      this.form.vistDoctor = null
      this.form.isAcciddent = null
      this.form.isEmergTreat = null
      this.form.isLackMaterial = null
      this.form.isMedicalHistory = null
      this.form.isBirth = null
      this.form.isInjuryJob = null
      this.form.isStricken = null
      this.form.specialOutPatient = null
      this.form.isDentidtry = null
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

