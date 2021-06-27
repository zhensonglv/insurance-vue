<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="付款方式" prop="payWay" label-width="160px">
        <el-input v-model="form.payWay" placeholder="请输入付款方式" />
      </el-form-item>
      <el-form-item label="付款银行类型" prop="payBankTyp" label-width="160px">
        <el-input v-model="form.payBankTyp" placeholder="请输入付款银行类型" />
      </el-form-item>
      <el-form-item label="付款银行号" prop="payBankNo" label-width="135px">
        <el-input v-model="form.payBankNo" width="135px" placeholder="请输入付款银行号" />
      </el-form-item>
      <el-form-item label="付款银行账号" prop="payBankAcctNo" label-width="120px">
        <el-input v-model="form.payBankAcctNo" placeholder="请输入付款银行账号" />
      </el-form-item>
      <el-form-item label="付款银行姓名" prop="payBankAcctNme" label-width="120px">
        <el-input v-model="form.payBankAcctNme" placeholder="请输入付款银行姓名" />
      </el-form-item>
      <el-form-item label="收款银行类型" prop="collectBankTyp" label-width="120px">
        <el-input v-model="form.collectBankTyp" placeholder="请输入收款银行类型" />
      </el-form-item>
      <el-form-item label="收款银行号" prop="collectBankNo" label-width="120px">
        <el-input v-model="form.collectBankNo" placeholder="请输入收款银行号" />
      </el-form-item>
      <el-form-item label="收款银行账号" prop="collectBankAcctNo" label-width="120px">
        <el-input v-model="form.collectBankAcctNo" placeholder="请输入收款银行账号" />
      </el-form-item>
      <el-form-item label="收款银行姓名" prop="collectBankAcctNme" label-width="120px">
        <el-input v-model="form.collectBankAcctNme" placeholder="请输入收款银行姓名" />
      </el-form-item>
      <el-form-item label="团体号" prop="deptNo" label-width="120px">
        <el-input v-model="form.deptNo" placeholder="请输入团体号" />
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
      basePath: 'clientBankAcctInfo',
      form: {
        id: '',
        payWay: '',
        payBankTyp: '',
        payBankNo: '',
        payBankAcctNo: '',
        payBankAcctNme: '',
        collectBankTyp: '',
        collectBankNo: '',
        collectBankAcctNo: '',
        collectBankAcctNme: '',
        deptNo: ''

      },
      rules: {
        payBankNo: [{ required: true, trigger: 'blur', message: '请输入付款银行号' }],
        payBankAcctNo: [{ required: true, trigger: 'blur', message: '请输入付款银行账号' }]
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
      this.form.payWay = null
      this.form.payBankTyp = null
      this.form.payBankNo = null
      this.form.payBankAcctNo = null
      this.form.payBankAcctNme = null
      this.form.collectBankTyp = null
      this.form.collectBankNo = null
      this.form.collectBankAcctNo = null
      this.form.deptNo = null
      this.form.collectBankAcctNme = null
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
