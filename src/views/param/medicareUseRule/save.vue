<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="医保规则参数码" prop="medicareParamCde" label-width="120px">
        <el-input v-model="form.medicareParamCde" placeholder="请输入医保规则参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="社保地" prop="medicareAddress" label-width="120px">
        <el-input v-model="form.medicareAddress" placeholder="请输入社保地">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <el-form-item label="医院网络码" prop="hospitalCde" label-width="120px">
        <el-input v-model="form.hospitalCde" placeholder="请选择医院网络码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="是否使用医保卡" prop="isUseMedicare" label-width="120px">
        <el-select v-model="form.isUseMedicare" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="人员类别" prop="suitLevel" label-width="120px">
        <el-input v-model="form.suitLevel" placeholder="请输入人员类别" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="visitTyp" label-width="120px">
        <el-select v-model="form.visitTyp" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="事故类型" prop="accidentTyp" label-width="120px">
        <el-select v-model="form.accidentTyp" placeholder="请选择" clearable>
          <el-option
            v-for="item in businessData.AccidentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="medicareRemark" label-width="120px">
        <el-input v-model="form.medicareRemark" placeholder="请输入备注" />
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
      basePath: 'medicareUseRule',
      form: {
        id: '',
        medicareParamCde: '',
        medicareAddress: '',
        hospitalCde: '',
        isUseMedicare: '',
        accidentTyp: '',
        suitLevel: '',
        visitTyp: '',
        userTyp: '',
        medicareRemark: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        medicareParamCde: [{ required: true, trigger: 'blur', message: '请输入医保规则参数码' }],
        medicareAddress: [{ required: true, trigger: 'blur', message: '请输入社保地' }],
        isUseMedicare: [{ required: true, trigger: 'blur', message: '请输入是否使用医保卡' }]
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
      this.form.medicareParamCde = null
      this.form.medicareAddress = null
      this.form.hospitalCde = null
      this.form.isUseMedicare = null
      this.form.accidentTyp = null
      this.form.suitLevel = null
      this.form.visitTyp = null
      this.form.userTyp = null
      this.form.medicareRemark = null
    },
    hanldeMatch(matchTyp) {
      this.matchTyp = matchTyp
      this.matchVisable = true
    },
    matchConfirm(data) {
      if (this.matchTyp === 1) {
        this.form.hospitalCde = data.prodCde
      } else if (this.matchTyp === 2) {
        this.form.medicareAddress = data.areaCode
      }
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

