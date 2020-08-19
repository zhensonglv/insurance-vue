<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="公共保额码" prop="amtCde" label-width="120px">
        <el-input v-model="form.amtCde" placeholder="请输入公共保额码" />
      </el-form-item>
      <el-form-item label="公共保额类型" prop="amtTyp" label-width="120px">
        <el-input v-model="form.amtTyp" placeholder="请输入公共保额类型" />
      </el-form-item>
      <el-form-item label="起始日" prop="plyBgnTm" label-width="120px">
        <el-input v-model="form.plyBgnTm" placeholder="请输入起始日" />
      </el-form-item>

      <el-form-item label="终止日" prop="plyEndTm" label-width="120px">
        <el-input v-model="form.plyEndTm" placeholder="请输入终止日" />
      </el-form-item>

      <el-form-item label="说明" prop="amtDesc" label-width="120px">
        <el-input v-model="form.amtDesc" placeholder="请输入说明" />
      </el-form-item>

      <el-form-item label="公共保额额度" prop="amtConfigQuota" label-width="120px">
        <el-input v-model="form.amtConfigQuota" placeholder="请输入公共保额额度" />
      </el-form-item>

      <el-form-item label="额度类型" prop="quotaTyp" label-width="120px">
        <el-input v-model="form.quotaTyp" placeholder="请输入额度类型" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="clineCtype" label-width="120px">
        <el-input v-model="form.clineCtype" placeholder="请输入就诊类型" />
      </el-form-item>

      <el-form-item label="单位申请" prop="companyApply" label-width="120px">
        <el-input v-model="form.companyApply" placeholder="请输入单位申请" />
      </el-form-item>

      <el-form-item label="医院网络码" prop="medicalnetworkdeta" label-width="120px">
        <el-input v-model="form.medicalnetworkdeta" placeholder="请输入医院网络码" />
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
      basePath: 'amtConfig',
      form: {
        id: '',
        amtCde: '',
        amtTyp: '',
        plyBgnTm: '',
        plyEndTm: '',
        amtDesc: '',
        amtConfigQuota: '',
        quotaTyp: '',
        clineCtype: '',
        companyApply: '',
        medicalnetworkdeta: ''
      },
      rules: {
        amtCde: [{ required: true, trigger: 'blur', message: '请输入公共保额码' }],
        amtTyp: [{ required: true, trigger: 'blur', message: '请输入公共保额类型' }],
        plyBgnTm: [{ required: true, trigger: 'blur', message: '请输入起始日' }],
        plyEndTm: [{ required: true, trigger: 'blur', message: '请输入终止日' }],
        amtDesc: [{ required: true, trigger: 'blur', message: '请输入说明' }],
        clineCtype: [{ required: true, trigger: 'blur', message: '请输入就诊类型' }],
        companyApply: [{ required: true, trigger: 'blur', message: '请输入单位申请' }],
        medicalnetworkdeta: [{ required: true, trigger: 'blur', message: '请输入医院网络码' }]
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
      this.form.amtCde = null
      this.form.amtTyp = null
      this.form.plyBgnTm = null
      this.form.plyEndTm = null
      this.form.amtDesc = null
      this.form.amtConfigQuota = null
      this.form.quotaTyp = null
      this.form.clineCtype = null
      this.form.companyApply = null
      this.form.medicalnetworkdeta = null
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

