<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="诊疗匹配参数码" prop="diaMatParameterCde" label-width="120px">
        <el-input v-model="form.diaTreatCde" placeholder="诊疗匹配参数码" disabled="disabled" />
      </el-form-item>

      <el-form-item label="起始码" prop="bgnCde" label-width="120px">
        <el-input v-model="form.bgnCde" placeholder="请输入起始码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />
      <el-form-item label="起始码描述" prop="bgnCdeDesc" label-width="120px">
        <el-input v-model="form.bgnCdeDesc" placeholder="请输入起始码描述" />
      </el-form-item>

      <el-form-item label="终止码" prop="endCde" label-width="120px">
        <el-input v-model="form.endCde" placeholder="请输入终止码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>

      <el-form-item label="起始码描述" prop="endCdeDesc" label-width="120px">
        <el-input v-model="form.endCdeDesc" placeholder="请输入终止码描述" />
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
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'treatMatchDetail',
      form: {
        id: '',
        diaTreatCde: '',
        bgnCde: '',
        bgnCdeDesc: '',
        endCde: '',
        endCdeDesc: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        bgnCde: [{ required: true, trigger: 'blur', message: '请输入起始码' }],
        endCde: [{ required: true, trigger: 'blur', message: '请输入终止码' }]
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
      this.form.diaTreatCde = null
      this.form.bgnCde = null
      this.form.bgnCdeDesc = null
      this.form.endCde = null
      this.form.endCdeDesc = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (this.matchTyp === 1) {
        this.$set(this.form, 'bgnCde', data.treatNo)
        this.$set(this.form, 'bgnCdeDesc', data.treatDesc)
      }
      if (this.matchTyp === 2) {
        this.$set(this.form, 'endCde', data.treatNo)
        this.$set(this.form, 'endCdeDesc', data.treatDesc)
      }
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

