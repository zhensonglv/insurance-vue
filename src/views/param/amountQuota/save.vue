<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="合计限额码" prop="amountCode" label-width="120px">
        <el-input v-model="form.amountCode" />
      </el-form-item>
      <el-form-item label="合计限额额度" prop="amountQuotaLimit" label-width="120px">
        <el-input v-model="form.amountQuotaLimit" placeholder="请输入合计限额额度" />
      </el-form-item>
      <el-form-item label="起始日" prop="plyBgnTm">
        <el-date-picker
          v-model="form.plyBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="终止日" prop="plyEndTm">
        <el-date-picker
          v-model="form.plyEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="关联责任" prop="correlation" label-width="120px">
        <el-input v-model="form.correlation" placeholder="请输入参数描述" />
      </el-form-item>
      <el-form-item label="限额类型" prop="amountType" label-width="120px">
        <el-select v-model="form.amountType" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="重疾" prop="isStricken" label-width="120px">
        <el-select v-model="form.isStricken" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否关联" prop="isRelation" label-width="120px">
        <el-select v-model="form.isRelation" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="amountDesc" label-width="120px">
        <el-input v-model="form.amountDesc" placeholder="请输入说明" />
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
      basePath: 'amountQuuota',
      form: {
        id: '',
        amountCode: '',
        amountQuotaLimit: '',
        amountType: '',
        correlation: '',
        plyEndTm: '',
        plyBgnTm: '',
        isStricken: '',
        isRelation: '',
        amountDesc: ''

      },
      rules: {
        amountQuotaLimit: [{ required: true, trigger: 'blur', message: '请输入合计限额额度' }],
        correlation: [{ required: true, trigger: 'blur', message: '请输入关联责任' }],
        amountType: [{ required: true, trigger: 'blur', message: '请选择限额累心' }]
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
      this.form.amountCode = null
      this.form.amountQuotaLimit = null
      this.form.amountType = null
      this.form.correlation = null
      this.form.plyEndTm = null
      this.form.plyBgnTm = null
      this.form.isStricken = null
      this.form.isRelation = null
      this.form.amountDesc = null
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

