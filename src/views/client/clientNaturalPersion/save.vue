<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="被保险人号" prop="insuredNo" label-width="160px">
        <el-input v-model="form.insuredNo" placeholder="请输入被保险人号" />
      </el-form-item>
      <el-form-item label="被保险人姓名" prop="insuredNme" label-width="160px">
        <el-input v-model="form.insuredNme" placeholder="请输入被保险人姓名" />
      </el-form-item>
      <el-form-item label="自然人姓名" prop="nme" label-width="135px">
        <el-input v-model="form.nme" width="135px" placeholder="请输入自然人姓名" />
      </el-form-item>
      <el-form-item label="自然人证件类型" prop="certCls" label-width="120px">
        <el-input v-model="form.certCls" placeholder="请输入自然人证件类型" />
      </el-form-item>
      <el-form-item label="自然人证件号" prop="certCde" label-width="120px">
        <el-input v-model="form.certCde" placeholder="请输入自然人证件号" />
      </el-form-item>
      <el-form-item label="自然人性别" prop="sex" label-width="120px">
        <el-input v-model="form.sex" placeholder="请输入自然人性别" />
      </el-form-item>
      <el-form-item label="自然人生日" prop="birthTm" label-width="120px">
        <el-input v-model="form.birthTm" placeholder="请输入自然人生日" />
      </el-form-item>
      <el-form-item label="自然人工作电话" prop="workPhone" label-width="120px">
        <el-input v-model="form.workPhone" placeholder="请输入自然人工作电话" />
      </el-form-item>
      <el-form-item label="自然人电子邮件" prop="email" label-width="120px">
        <el-input v-model="form.email" placeholder="请输入自然人电子邮件" />
      </el-form-item>
      <el-form-item label="自然人电子邮编" prop="postalcode" label-width="120px">
        <el-input v-model="form.postalcode" placeholder="请输入自然人邮编" />
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
      basePath: 'clientNaturalPersion',
      form: {
        id: '',
        insuredNo: '',
        insuredNme: '',
        nme: '',
        certCls: '',
        certCde: '',
        sex: '',
        birthTm: '',
        workPhone: '',
        email: '',
        postalcode: ''
      },
      rules: {
        insuredNo: [{ required: true, trigger: 'blur', message: '请输入被保人号' }],
        insuredNme: [{ required: true, trigger: 'blur', message: '请输入被保人姓名' }]
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
      this.form.insuredNo = null
      this.form.insuredNme = null
      this.form.nme = null
      this.form.certCls = null
      this.form.certCde = null
      this.form.sex = null
      this.form.birthTm = null
      this.form.workPhone = null
      this.form.email = null
      this.form.postalcode = null
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
