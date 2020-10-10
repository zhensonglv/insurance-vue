<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="诊断ICD主码" prop="diaCde" label-width="120px">
        <el-input v-model="form.diaCde" placeholder="请输入诊断ICD主码" />
      </el-form-item>
      <el-form-item label="诊断描述" prop="diaDesc" label-width="120px">
        <el-input v-model="form.diaDesc" placeholder="请输入诊断描述" />
      </el-form-item>
      <el-form-item label="对应事故原因" prop="accidentReason" label-width="120px">
        <el-input v-model="form.accidentReason" placeholder="请输入事故原因" />
      </el-form-item>
      <el-form-item label="ICD主码分类" prop="diaTyp" label-width="120px">
        <el-input v-model="form.diaTyp" placeholder="请输入ICD主码分类" />
      </el-form-item>
      <el-form-item label="ICD主码分类名称" prop="icdTypNme" label-width="120px">
        <el-input v-model="form.icdTypNme" placeholder="请输入ICD主码分类名称" />
      </el-form-item>
      <el-form-item label="是否慢性病" prop="isSlowlyDise" label-width="120px">
        <el-input v-model="form.isSlowlyDise" placeholder="请输入是否慢性病" />
      </el-form-item>
      <el-form-item label="易发年龄起始" prop="diaBgnSex" label-width="120px">
        <el-input v-model="form.diaBgnSex" placeholder="请输入易发年龄起始" />
      </el-form-item>
      <el-form-item label="易发年龄结束" prop="diaEndSex" label-width="120px">
        <el-input v-model="form.diaEndSex" placeholder="请输入易发年龄结束" />
      </el-form-item>
      <el-form-item label="易发性别" prop="diaSex" label-width="120px">
        <el-input v-model="form.diaSex" placeholder="请输入易发性别" />
      </el-form-item>
      <el-form-item label="是否外包" prop="isOut" label-width="120px">
        <el-input v-model="form.isOut" placeholder="请输入是否外包" />
      </el-form-item>
      <el-form-item label="临床诊断" prop="clinicDia" label-width="120px">
        <el-input v-model="form.clinicDia" placeholder="请输入临床诊断" />
      </el-form-item>
      <el-form-item label="严重程度" prop="diaSeverityLevel" label-width="120px">
        <el-input v-model="form.diaSeverityLevel" placeholder="请输入严重程度" />
      </el-form-item>
      <el-form-item label="发病率" prop="diaSeverityRate" label-width="120px">
        <el-input v-model="form.diaSeverityRate" placeholder="请输入发病率" />
      </el-form-item>
      <el-form-item label="每次住院费用" prop="diaOnceHospitalCost" label-width="120px">
        <el-input v-model="form.diaOnceHospitalCost" placeholder="请输入每次住院费用" />
      </el-form-item>
      <el-form-item label="每次门诊费用" prop="diaOnceClinicCost" label-width="120px">
        <el-input v-model="form.diaOnceClinicCost" placeholder="请输入每次门诊费用" />
      </el-form-item>
      <el-form-item label="平均年就诊次数" prop="diaYeareClinicTime" label-width="120px">
        <el-input v-model="form.diaYeareClinicTime" placeholder="请输入平均年就诊次数" />
      </el-form-item>

      <el-form-item label="解释码" prop="explCde" label-width="120px">
        <el-input v-model="form.explCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explCdeDesc" label-width="120px">
        <el-input v-model="form.explCdeDesc" placeholder="请输入解释码描述" />
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
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'diagnosisManage',
      form: {
        id: '',
        diaCde: '',
        diaDesc: '',
        accidentReason: '',
        diaTyp: '',
        icdTypNme: '',
        isSlowlyDise: '',
        diaBgnSex: '',
        diaEndSex: '',
        diaSex: '',
        isOut: '',
        clinicDia: '',
        diaSeverityLevel: '',
        diaSeverityRate: '',
        diaOnceHospitalCost: '',
        diaOnceClinicCost: '',
        diaYeareClinicTime: '',
        explCde: '',
        explCdeDesc: ''
      },
      matchVisable: false,
      rules: {
        diaCde: [{ required: true, trigger: 'blur', message: '请输入诊断ICD主码' }],
        diaDesc: [{ required: true, trigger: 'blur', message: '请输入诊断描述' }]
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
      this.form.diaCde = null
      this.form.diaDesc = null
      this.form.accidentReason = null
      this.form.diaTyp = null
      this.form.icdTypNme = null
      this.form.isSlowlyDise = null
      this.form.diaBgnSex = null
      this.form.diaEndSex = null
      this.form.diaSex = null
      this.form.isOut = null
      this.form.clinicDia = null
      this.form.diaSeverityLevel = null
      this.form.diaSeverityRate = null
      this.form.diaOnceHospitalCost = null
      this.form.diaOnceClinicCost = null
      this.form.diaYeareClinicTime = null
      this.form.explCde = null
      this.form.explCdeDesc = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      this.form.explCde = data.explCde
      this.form.explCdeDesc = data.explCdeDesc
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

