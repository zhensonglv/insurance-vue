<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="服务类型号" prop="servTypNo" label-width="120px">
        <el-input v-model="form.servTypNo" placeholder="请输入服务类型号" />
      </el-form-item>
      <el-form-item label="类别" prop="servCategory" label-width="120px">
        <el-input v-model="form.servCategory" placeholder="请输入类别" />
      </el-form-item>
      <el-form-item label="服务类型描述" prop="servTypDesc" label-width="120px">
        <el-input v-model="form.servTypDesc" placeholder="请输入服务类型描述" />
      </el-form-item>
      <el-form-item label="服务类型英文描述" prop="servTypEngdesc" label-width="120px">
        <el-input v-model="form.servTypEngdesc" placeholder="请输入服务类型英文描述" />
      </el-form-item>
      <el-form-item label="大项号" prop="categoryNo" label-width="120px">
        <el-input v-model="form.categoryNo" placeholder="请输入大项号" />
      </el-form-item>
      <el-form-item label="大项名称" prop="categoryName" label-width="150px">
        <el-input v-model="form.categoryName" placeholder="请输入大项名称" />
      </el-form-item>
      <el-form-item label="适应症号" prop="subcategoryNo" label-width="120px">
        <el-input v-model="form.subcategoryNo" placeholder="请输入适应症号" />
      </el-form-item>
      <el-form-item label="适应症名称" prop="subcategoryName" label-width="120px">
        <el-input v-model="form.subcategoryName" placeholder="请输入适应症名称" />
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
      basePath: 'serviceTypManage',
      form: {
        id: '',
        servTypNo: '',
        servCategory: '',
        servTypDesc: '',
        servTypEngdesc: '',
        categoryNo: '',
        categoryName: '',
        subcategoryNo: '',
        subcategoryName: ''
      },
      rules: {
        explCde: [{ required: true, trigger: 'blur', message: '请输入结论说明码' }]
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
      this.form.servTypNo = null
      this.form.servCategory = null
      this.form.servTypDesc = null
      this.form.servTypEngdesc = null
      this.form.categoryNo = null
      this.form.categoryName = null
      this.form.subcategoryNo = null
      this.form.subcategoryName = null
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

