<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="40%">
    <el-form ref="form" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item v-if="form.id != null" label="主键id" prop="id" label-width="120px">
        <el-input v-model="form.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="集团号" prop="groupNo" label-width="120px">
        <el-input v-model="form.groupNo" placeholder="请输入集团号" />
      </el-form-item>
      <el-form-item label="集团名称" prop="groupNme" label-width="120px">
        <el-input v-model="form.groupNme" placeholder="请输入集团名称" />
      </el-form-item>
      <el-form-item label="联系人" prop="contactNme" label-width="120px">
        <el-input v-model="form.contactNme" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="邮编" prop="theInsuredPostcode" label-width="120px">
        <el-input v-model="form.theInsuredPostcode" placeholder="请输入邮编" />
      </el-form-item>
      <el-form-item label="集团电话" prop="groupTel" label-width="120px">
        <el-input v-model="form.groupTel" placeholder="请输入集团电话" />
      </el-form-item>
      <el-form-item label="集团手机" prop="groupPhone" label-width="120px">
        <el-input v-model="form.groupPhone" placeholder="请输入集团手机" />
      </el-form-item>
      <el-form-item label="集团传真" prop="groupFax" label-width="120px">
        <el-input v-model="form.groupFax" placeholder="请输入集团传真" />
      </el-form-item>
      <el-form-item label="集团地址" prop="groupAddress" label-width="120px">
        <el-input v-model="form.groupAddress" placeholder="请输入集团地址" />
      </el-form-item>
      <el-form-item label="电子邮件" prop="groupEmail" label-width="120px">
        <el-input v-model="form.groupEmail" placeholder="请输入电子邮件" />
      </el-form-item>
      <el-form-item label="地区代码" prop="groupAreaCde" label-width="120px">
        <el-input v-model="form.groupAreaCde" placeholder="请输入地区代码" />
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
import { save, edit } from '@/api/client/group'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: 'Add',
      form: {
        id: '',
        cGroupNo: '',
        cGroupNme: '',
        cTheInsuredPostcode: '',
        cGroupTel: '',
        cGroupPhone: '',
        cGroupFax: '',
        cGroupAddress: '',
        cGroupEmail: '',
        cGroupAreaCde: ''
      },
      rules: {
        cGroupNme: [{ required: true, trigger: 'blur', message: '请输入集团名称' }],
        cGroupTel: [{ required: true, trigger: 'blur', message: '请输入集团电话' }]
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
      this.form.cGroupNo = null
      this.form.cGroupNme = null
      this.form.cTheInsuredPostcode = null
      this.form.cGroupTel = null
      this.form.cGroupPhone = null
      this.form.cGroupFax = null
      this.form.cGroupAddress = null
      this.form.cGroupEmail = null
      this.form.cGroupAreaCde = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            save(this.form).then(response => {
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
            edit(this.form).then(response => {
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

