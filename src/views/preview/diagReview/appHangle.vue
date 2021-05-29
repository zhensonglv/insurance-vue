<template>
  <el-dialog :title="dialogTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="申请悬挂类型" prop="applyHangType" label-width="120px">
        <el-input v-model="form.applyHangType" placeholder="请输入申请悬挂类型" />
      </el-form-item>

      <el-form-item label="申请悬挂原因" prop="applyHangCause" label-width="120px">
        <el-input v-model="form.applyHangCause" placeholder="请输入原因" />
      </el-form-item>
      <el-form-item label="备注" prop="applyHangRemark" label-width="120px">
        <el-input v-model="form.applyHangRemark" placeholder="请输入备注" />
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
import { edit } from '@/api/preview/base'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['appForm', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '申请悬挂',
      basePath: 'inputAppInfo',
      form: {
        id: '',
        applyHangType: '',
        applyHangCause: '',
        applyHangRemark: ''
      },
      rules: {
        applyHangType: [{ required: true, trigger: 'blur', message: '请选择悬挂类型' }]
      }
    }
  },
  watch: {
    'appForm': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
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
      this.form.applyHangCause = null
      this.form.applyHangType = null
      this.form.applyHangRemark = null
    },
    handleClose() {
      this.clearForm()
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          edit(this.basePath, this.form).then(response => {
            if (response.code === 200) {
              this._notify(response.msg, 'success')
              this.$emit('appSonstatus', true)
              this.clearForm()
              this.dialogVisible = false
            } else {
              this._notify(response.msg, 'error')
            }
          })
        } else {
          this.$message('error submit!!')
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

