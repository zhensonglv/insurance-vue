<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="限额码" prop="quotaCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入限额码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="限额说明" prop="quotaDesc" label-width="120px">
        <el-input v-model="form.paramDesc" placeholder="请输入限额说明" />
      </el-form-item>

      <el-form-item label="起始次数/天数" prop="starNumbDaily" label-width="120px">
        <el-input v-model="form.starNumbDaily" placeholder="请输入起始次数/天数" />
      </el-form-item>

      <el-form-item label="终止次数/天数" prop="endNumbDaily" label-width="120px">
        <el-input v-model="form.endNumbDaily" placeholder="请输入终止次数/天数" />
      </el-form-item>

      <el-form-item label="额度" prop="amount" label-width="120px">
        <el-input v-model="form.amount" placeholder="请输入限额" />
      </el-form-item>
      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explainCdeDesc" label-width="120px">
        <el-input v-model="form.explainCdeDesc" placeholder="请输入解释码描述" />
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
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  components: {
    Match
  },
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'ladderDetail',
      form: {
        id: '',
        paramCde: '',
        paramDesc: '',
        linkId: '',
        starNumbDaily: '',
        endNumbDaily: '',
        amount: '',
        explainCde: '',
        explainCdeDesc: ''

      },
      matchVisable: false,
      rules: {
        paramCde: [{ required: true, trigger: 'blur', message: '请输入参数码' }],
        paramDesc: [{ required: true, trigger: 'blur', message: '请输入说明' }],
        starNumbDaily: [{ required: true, trigger: 'blur', message: '请输入起始次数/天数' }],
        endNumbDaily: [{ required: true, trigger: 'blur', message: '请输入终止次数/天数' }],
        amount: [{ required: true, trigger: 'blur', message: '请输入额度' }]
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
      this.form.paramCde = null
      this.form.paramDesc = null
      this.form.starNumbDaily = null
      this.form.endNumbDaily = null
      this.form.amount = null
      this.form.explainCde = null
      this.form.explainCdeDesc = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      this.form.explainCde = data.explCde
      this.form.explainCdeDesc = data.explCdeDesc
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

