<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="理赔审核规则码" prop="claimSpecialMatchNo" label-width="120px">
        <el-input v-model="form.claimSpecialMatchNo" placeholder="请输入理赔审核规则码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="特殊审核要求码" prop="specialAuditsCde" label-width="120px">
        <el-input v-model="form.specialAuditsCde" placeholder="请输入特殊审核要求码" />
      </el-form-item>

      <el-form-item label="类型" prop="typ" label-width="120px">
        <el-select v-model="form.typ" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.CSpecialTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="悬挂层级" prop="suspendLevel" label-width="120px">
        <el-select v-model="form.suspendLevel" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.CSpecialLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="理赔审核规则定义" prop="auditsRule" label-width="120px">
        <el-input v-model="form.auditsRule" placeholder="请输入理赔审核规则定义" />
      </el-form-item>

      <el-form-item label="悬挂条件" prop="suspendCondition" label-width="120px">
        <el-input v-model="form.suspendCondition" placeholder="请输入悬挂条件" />
      </el-form-item>

      <el-form-item label="人工操作" prop="manualOperation" label-width="120px">
        <el-input v-model="form.manualOperation" placeholder="请输入人工操作" />
      </el-form-item>

      <el-form-item label="悬挂解释" prop="specialDesc" label-width="120px">
        <el-input v-model="form.specialDesc" placeholder="请输入悬挂解释" />
      </el-form-item>

      <el-form-item label="保单特殊人工操作" prop="speicalManualOperation" label-width="120px">
        <el-input v-model="form.speicalManualOperation" placeholder="请输入保单特殊人工操作" />
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
      basePath: 'claimSpecialMatch',
      form: {
        id: '',
        claimSpecialMatchNo: '',
        specialAuditsCde: '',
        typ: '',
        suspendLevel: '',
        auditsRule: '',
        suspendCondition: '',
        manualOperation: '',
        speicalManualOperation: '',
        specialDesc: ''
      },
      rules: {
        claimSpecialMatchNo: [{ required: true, trigger: 'blur', message: '请输入理赔审核规则码' }],
        specialAuditsCde: [{ required: true, trigger: 'blur', message: '请输入特殊审核要求码' }]
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
      this.form.claimSpecialMatchNo = null
      this.form.specialAuditsCde = null
      this.form.typ = null
      this.form.suspendLevel = null
      this.form.auditsRule = null
      this.form.suspendCondition = null
      this.form.manualOperation = null
      this.form.speicalManualOperation = null
      this.form.specialDesc = null
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

