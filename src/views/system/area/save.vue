<template>
  <el-dialog :title="dialogTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="40%">
    <el-form ref="form" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="地区编码" prop="areaCode" label-width="120px">
        <el-input v-model="form.areaCode" placeholder="请输入地区编码" />
      </el-form-item>
      <el-form-item label="名称" prop="cnm" label-width="120px">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="父类" prop="parent" label-width="120px">
        <el-input v-model="form.pid" placeholder="请输入父类" />
      </el-form-item>
      <el-form-item label="英文名称" prop="value" label-width="120px">
        <el-input v-model="form.pinyin" placeholder="请输入英文名称" />
      </el-form-item>
      <el-form-item label="类型" prop="value" label-width="120px">
        <el-input v-model="form.level" placeholder="请输入类型" />
      </el-form-item>
      <el-form-item label="邮编" prop="value" label-width="120px">
        <el-input v-model="form.zipCode" placeholder="请输入邮编" />
      </el-form-item>
      <el-form-item label="简称" prop="value" label-width="120px">
        <el-input v-model="form.shortName" placeholder="请输入简称" />
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
      basePath: 'area',
      dialogTitle: 'Add',
      form: {
        id: '',
        areaCode: '',
        name: '',
        pid: '',
        pinyin: '',
        level: '',
        zipCode: '',
        shortName: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        pid: [{ required: true, trigger: 'blur', message: '请输入父类' }],
        pinyin: [{ required: true, trigger: 'blur', message: '请输入英文名称' }]
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
      this.form.areaCode = null
      this.form.name = null
      this.form.pid = null
      this.form.pinyin = null
      this.form.level = null
      this.form.zipCode = null
      this.form.shortName = null
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

