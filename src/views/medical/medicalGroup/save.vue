<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="医疗集团号" prop="mediGroupNo">
        <el-input v-model="form.mediGroupNo" placeholder="请输入医疗集团号" />
      </el-form-item>
      <el-form-item label="集团名称" prop="mediGroupName">
        <el-input v-model="form.mediGroupName" placeholder="请输入集团名称" />
      </el-form-item>
      <el-form-item label="联系人" prop="mediGroupLinkman">
        <el-input v-model="form.mediGroupLinkman" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="集团电话" prop="mediGroupPhone">
        <el-input v-model="form.mediGroupPhone" placeholder="请输入集团电话" />
      </el-form-item>
      <el-form-item label="集团手机" prop="mediGroupTel">
        <el-input v-model="form.mediGroupTel" placeholder="请输入集团手机" />
      </el-form-item>
      <el-form-item label="集团传真" prop="mediGroupFax">
        <el-input v-model="form.mediGroupFax" placeholder="请输入集团传真" />
      </el-form-item>
      <el-form-item label="电子邮件" prop="mediGroupEmail">
        <el-input v-model="form.mediGroupEmail" placeholder="请输入电子邮件" />
      </el-form-item>
      <el-form-item label="邮政编码" prop="mediGroupZipcode">
        <el-input v-model="form.mediGroupZipcode" placeholder="请输入邮政编码" />
      </el-form-item>
      <el-form-item label="地区代码" prop="areaNo">
        <el-input v-model="form.areaNo" placeholder="请输入地区代码" />
      </el-form-item>
      <el-form-item label="集团详细地址" prop="mediGroupAddr">
        <el-input v-model="form.mediGroupAddr" placeholder="请输入集团详细地址" />
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
      basePath: 'medicalGroup',
      form: {
        id: '',
        mediGroupNo: '',
        mediGroupName: '',
        mediGroupLinkman: '',
        mediGroupPhone: '',
        mediGroupTel: '',
        mediGroupFax: '',
        mediGroupEmail: '',
        mediGroupZipcode: '',
        areaNo: '',
        mediGroupAddr: ''
      },
      rules: {
        mediGroupNo: [{ required: true, trigger: 'blur', message: '请输入医疗集团号' }]
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
      this.form.mediGroupNo = null
      this.form.mediGroupName = null
      this.form.mediGroupLinkman = null
      this.form.mediGroupPhone = null
      this.form.mediGroupTel = null
      this.form.mediGroupFax = null
      this.form.mediGroupEmail = null
      this.form.mediGroupZipcode = null
      this.form.areaNo = null
      this.form.mediGroupAddr = null
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

