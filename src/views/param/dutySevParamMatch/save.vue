<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="责任号" prop="dutyNo" label-width="120px">
        <el-input
          v-model="form.dutyNo"
          placeholder="请选择责任号"
        >
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />
      <el-form-item label="责任描述" prop="dutyDesc" label-width="120px">
        <el-input v-model="form.dutyDesc" placeholder="请输入责任描述" />
      </el-form-item>
      <el-form-item label="服务类型起始码" prop="serviceTypBgnCde" label-width="120px">
        <el-input v-model="form.serviceTypBgnCde" placeholder="请输入服务类型起始码" />
      </el-form-item>
      <el-form-item label="服务类型终止码" prop="serviceTypEndCde" label-width="120px">
        <el-input v-model="form.serviceTypEndCde" placeholder="请输入服务类型终止码" />
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
import Match from './match'
export default {

  components: {
    Match
  },
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'dutySevParamMatch',
      form: {
        id: '',
        paramCde: '',
        dutyNo: '',
        dutyDesc: '',
        serviceTypBgnCde: '',
        serviceTypEndCde: ''
      },
      matchVisable: false,
      rules: {
        dutyNo: [{ required: true, trigger: 'blur', message: '请输入责任号' }],
        serviceTypBgnCde: [{ required: true, trigger: 'blur', message: '请输入服务类型起始码' }],
        serviceTypEndCde: [{ required: true, trigger: 'blur', message: '请输入服务类型终止码' }]
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
    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      this.form.dutyNo = data[0].dutyNo
      this.form.dutyDesc = data[0].dutyDesc
      this.form.serviceTypBgnCde = data[0].begSertypCde
      this.form.serviceTypEndCde = data[0].endSertypCde
    },

    clearForm() {
      this.form.id = null
      this.form.paramCde = null
      this.form.dutyNo = null
      this.form.dutyDesc = null
      this.form.serviceTypBgnCde = null
      this.form.serviceTypEndCde = null
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

