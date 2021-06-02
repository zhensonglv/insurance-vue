<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="结论说明码" prop="explCde" label-width="120px">
        <el-input v-model="form.explCde" placeholder="请输入结论说明码" />
      </el-form-item>
      <el-form-item label="解释码类别" prop="explCategort" label-width="120px">
        <el-select v-model="form.explCategort" placeholder="请选择">
          <el-option
            v-for="item in businessData.CExplCategort"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="解释码子类别" prop="explCdeSubcategory" label-width="120px">
        <el-select v-model="form.explCdeSubcategory" placeholder="请选择">
          <el-option
            v-for="item in businessData.ConSubcategory"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="解释码状态" prop="explCdeStatus" label-width="120px">
        <el-input v-model="form.explCdeStatus" placeholder="请输入解释码状态" />
      </el-form-item>
      <el-form-item label="解释码描述" prop="explCdeDesc" label-width="120px">
        <el-input v-model="form.explCdeDesc" placeholder="请输入解释码描述" />
      </el-form-item>
      <el-form-item label="解释码英文描述" prop="explCdeEngDesc" label-width="150px">
        <el-input v-model="form.explCdeEngDesc" placeholder="请输入解释码英文描述" />
      </el-form-item>
      <el-form-item label="客户解释码" prop="cusExplainNo" label-width="120px">
        <el-input v-model="form.cusExplainNo" placeholder="请输入客户解释码" />
      </el-form-item>
      <el-form-item label="解释码说明" prop="descCde" label-width="120px">
        <el-input v-model="form.descCde" placeholder="请输入解释码说明" />
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
      basePath: 'explainNo',
      form: {
        id: '',
        explCde: '',
        explCategort: '',
        explCdeSubcategory: '',
        explCdeStatus: '',
        explCdeDesc: '',
        explCdeEngDesc: '',
        cusExplainNo: '',
        descCde: ''
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
      this.form.explCde = null
      this.form.explCategort = null
      this.form.explCdeSubcategory = null
      this.form.explCdeStatus = null
      this.form.explCdeDesc = null
      this.form.explCdeEngDesc = null
      this.form.cusExplainNo = null
      this.form.descCde = null
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

