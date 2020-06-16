<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="主被保险人客户标识号" prop="principalInsuredClientNo" label-width="160px">
        <el-input v-model="form.principalInsuredClientNo" placeholder="请输入主被保险人客户标识号" />
      </el-form-item>
      <el-form-item label="被保险人客户标识号" prop="insuredNo" label-width="135px">
        <el-input v-model="form.insuredNo" width="135px" placeholder="请输入被保险人客户标识号" />
      </el-form-item>
      <el-form-item label="被保人姓名" prop="insuredName" label-width="120px">
        <el-input v-model="form.insuredNme" placeholder="请输入被保人姓名" />
      </el-form-item>
      <el-form-item label="被保险人证件号" prop="insuredCert" label-width="120px">
        <el-input v-model="form.insuredCert" placeholder="请输入被保险人证件号" />
      </el-form-item>
      <el-form-item label="投保单位" prop="insuranceApplication" label-width="120px">
        <el-input v-model="form.insuranceApplication" placeholder="请输入投保单位" />
      </el-form-item>
      <el-form-item label="别名" prop="aliasNme" label-width="120px">
        <el-input v-model="form.aliasNme" placeholder="请输入别名" />
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
      basePath: 'clientAlias',
      form: {
        id: '',
        principalInsuredClientNo: '',
        insuredNo: '',
        insuredNme: '',
        insuredCert: '',
        insuranceApplication: '',
        aliasNme: ''
      },
      rules: {
        aliasNme: [{ required: true, trigger: 'blur', message: '请输入别名' }]
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
      this.form.principalInsuredClientNo = null
      this.form.insuredNo = null
      this.form.insuredName = null
      this.form.insuredCert = null
      this.form.insuranceApplication = null
      this.form.aliasNme = null
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
