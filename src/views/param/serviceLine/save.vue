<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="业务线号" prop="serviceLineNo" label-width="120px">
        <el-input v-model="form.serviceLineNo" placeholder="请输入业务线号" />
      </el-form-item>
      <el-form-item label="公司" prop="company" label-width="120px">
        <el-input v-model="form.company" placeholder="请输入公司" />
      </el-form-item>
      <el-form-item label="起始日" prop="bgnTm" label-width="120px">
        <el-date-picker
          v-model="form.bgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="终止日" prop="endTm" label-width="120px">
        <el-date-picker
          v-model="form.endTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="客户业务线号" prop="cusSerLineNo" label-width="120px">
        <el-input v-model="form.cusSerLineNo" placeholder="请输入客户业务线号" />
      </el-form-item>
      <el-form-item label="业务线简称" prop="servLineForshort" label-width="120px">
        <el-input v-model="form.servLineForshort" placeholder="请输入业务线简称" />
      </el-form-item>
      <el-form-item label="业务线全称" prop="servLineFullname" label-width="120px">
        <el-input v-model="form.servLineFullname" placeholder="请输入业务线全称" />
      </el-form-item>
      <el-form-item label="备注" prop="servLineDesc" label-width="120px">
        <el-input v-model="form.servLineDesc" placeholder="请输入备注" />
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
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'serviceLine',
      form: {
        id: '',
        serviceLineNo: '',
        company: '',
        bgnTm: '',
        endTm: '',
        cusSerLineNo: '',
        servLineForshort: '',
        servLineFullname: '',
        servLineDesc: ''
      },
      rules: {
        serviceLineNo: [{ required: true, trigger: 'blur', message: '请输入业务线号' }],
        company: [{ required: true, trigger: 'blur', message: '请输入公司' }]
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
      this.form.serviceLineNo = null
      this.form.company = null
      this.form.bgnTm = null
      this.form.endTm = null
      this.form.cusSerLineNo = null
      this.form.servLineForshort = null
      this.form.servLineFullname = null
      this.form.servLineDesc = null
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

