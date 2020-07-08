<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="就诊天数" prop="consultDays" label-width="120px">
        <el-input v-model="form.consultDays" placeholder="请输入就诊天数" />
      </el-form-item>
      <el-form-item label="诊断码" prop="isDiagnoseCde" label-width="120px">
        <el-select v-model="form.isDiagnoseCde" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊医院" prop="isDiagnoseHospital" label-width="120px">
        <el-select v-model="form.isDiagnoseHospital" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊科室" prop="isDiagnoseDepartment" label-width="120px">
        <el-select v-model="form.isDiagnoseDepartment" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
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
      <el-form-item label="是否合并门诊" prop="isCombineClinic" label-width="120px">
        <el-select v-model="form.isCombineClinic" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="descCrible" label-width="120px">
        <el-input v-model="form.descCrible" placeholder="请输入参数描述" />
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
      basePath: 'consultDefi',
      form: {
        id: '',
        paramCde: '',
        consultDays: '',
        isDiagnoseCde: '',
        isDiagnoseHospital: '',
        isDiagnoseDepartment: '',
        suitlevel: '',
        docTyp: '',
        isCombineClinic: '',
        bgnDays: '',
        afterDays: '',
        hbcode: '',
        descCrible: ''
      },
      rules: {
        consultDays: [{ required: true, trigger: 'blur', message: '请输入就诊天数' }],
        docTyp: [{ required: true, trigger: 'blur', message: '请输入就诊类型' }]
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
      this.form.consultDays = null
      this.form.isDiagnoseCde = null
      this.form.isDiagnoseHospital = null
      this.form.isDiagnoseDepartment = null
      this.form.suitlevel = null
      this.form.docTyp = null
      this.form.isCombineClinic = null
      this.form.bgnDays = null
      this.form.afterDays = null
      this.form.hbcode = null
      this.form.descCrible = null
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

