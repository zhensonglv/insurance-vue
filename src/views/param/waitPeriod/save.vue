<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="等待期码" prop="waitPeriodCde" label-width="120px">
        <el-input v-model="form.waitPeriodCde" placeholder="请输入等待期码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="等待期说明" prop="waitPeriodDesc" label-width="120px">
        <el-input v-model="form.waitPeriodDesc" placeholder="请输入等待期说明" />
      </el-form-item>

      <el-form-item label="就诊原因" prop="visitReason" label-width="120px">
        <el-select v-model="form.visitReason" placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaVisitReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="等待天数" prop="waitDays" label-width="120px">
        <el-input v-model="form.waitDays" placeholder="请输入等待天数" />
      </el-form-item>

      <el-form-item label="等待期起算期" prop="nwaitDaysStart" label-width="120px">
        <el-select v-model="form.nwaitDaysStart" placeholder="请选择">
          <el-option
            v-for="item in businessData.CNWaitDaysStart"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="解释码" prop="explCde" label-width="120px">
        <el-input v-model="form.explCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码说明" prop="explCdeDesc" label-width="120px">
        <el-input v-model="form.explCdeDesc" placeholder="请输入解释码说明" />
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
      basePath: 'waitPeriod',
      form: {
        id: '',
        waitPeriodCde: '',
        explCdeDesc: '',
        explCde: '',
        waitDays: '',
        visitReason: '',
        nwaitDaysStart: '',
        waitPeriodDesc: ''
      },
      matchVisable: false,
      rules: {
        waitPeriodCde: [{ required: true, trigger: 'blur', message: '请输入等待期码' }],
        waitPeriodDesc: [{ required: true, trigger: 'blur', message: '请输入等待期说明' }],
        visitReason: [{ required: true, trigger: 'blur', message: '请输入就诊原因' }],
        waitDays: [{ required: true, trigger: 'blur', message: '请输入等待天数' }],
        nwaitDaysStart: [{ required: true, trigger: 'blur', message: '请输入等待期起算期' }],
        explCde: [{ required: true, trigger: 'blur', message: '请输入解释码' }],
        explCdeDesc: [{ required: true, trigger: 'blur', message: '请输入解释码说明' }]
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
      this.form.waitPeriodCde = null
      this.form.waitPeriodDesc = null
      this.form.visitReason = null
      this.form.waitDays = null
      this.form.nwaitDaysStart = null
      this.form.explCde = null
      this.form.explCdeDesc = null
    },
    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      this.form.explCde = data.explCde
      this.form.explCdeDesc = data.explCdeDesc
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

