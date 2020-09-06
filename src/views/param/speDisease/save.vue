<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="门诊特殊病码" prop="speDiseaseCde" label-width="120px">
        <el-input v-model="form.speDiseaseCde" placeholder="请输入门诊特殊病码" />
      </el-form-item>
      <el-form-item label="代码类型" prop="codeTyp" label-width="120px">
        <el-input v-model="form.codeTyp" placeholder="请输入代码类型" />
      </el-form-item>
      <el-form-item label="代码类型" prop="codeTyp" label-width="120px">
        <el-select v-model="form.codeTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="终止代码" prop="endCde" label-width="120px">
        <el-input v-model="form.endCde" placeholder="请输入终止代码" />
      </el-form-item>

      <el-form-item label="社保地" prop="socialSecurityErea" label-width="120px">
        <el-input v-model="form.socialSecurityErea" placeholder="请输入社保地" />
      </el-form-item>

      <el-form-item label="门诊类型" prop="mentorTyp" label-width="120px">
        <el-input v-model="form.mentorTyp" placeholder="请输入门诊类型" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="clinicTyp" label-width="120px">
        <el-input v-model="form.clinicTyp" placeholder="请输入就诊类型" />
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
      basePath: 'speDisease',
      form: {
        id: '',
        speDiseaseCde: '',
        codeTyp: '',
        bgnCde: '',
        endCde: '',
        socialSecurityErea: '',
        mentorTyp: '',
        clinicTyp: ''
      },
      rules: {
        speDiseaseCde: [{ required: true, trigger: 'blur', message: '请输入门诊特殊病码' }],
        codeTyp: [{ required: true, trigger: 'blur', message: '请输入代码类型' }],
        bgnCde: [{ required: true, trigger: 'blur', message: '请输入起始代码' }],
        endCde: [{ required: true, trigger: 'blur', message: '请输入终止代码' }],
        socialSecurityErea: [{ required: true, trigger: 'blur', message: '请输入社保地' }],
        mentorTyp: [{ required: true, trigger: 'blur', message: '请输入门诊类型' }],
        clinicTyp: [{ required: true, trigger: 'blur', message: '请输入就诊类型' }]
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
      this.form.speDiseaseCde = null
      this.form.codeTyp = null
      this.form.bgnCde = null
      this.form.endCde = null
      this.form.socialSecurityErea = null
      this.form.mentorTyp = null
      this.form.clinicTyp = null
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

