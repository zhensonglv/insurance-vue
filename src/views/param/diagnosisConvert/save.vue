<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="责任号" prop="dutyNo" label-width="120px">
        <el-input v-model="form.dutyNo" placeholder="责任号" />
      </el-form-item>

      <el-form-item label="诊断转换描述" prop="dutyDesc" label-width="120px">
        <el-input v-model="form.dutyDesc" placeholder="诊断转换说明" />
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
      <el-form-item label="起始代码" prop="diaBgnCde" label-width="120px">
        <el-input v-model="form.diaBgnCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="起始码描述" prop="diaBgnCdeDesc" label-width="120px">
        <el-input v-model="form.diaBgnCdeDesc" placeholder="请输入起始码描述" />
      </el-form-item>
      <el-form-item label="终止代码" prop="diaEndCde" label-width="120px">
        <el-input v-model="form.diaEndCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="终止码描述" prop="diaEndCdeDesc" label-width="120px">
        <el-input v-model="form.diaEndCdeDesc" placeholder="请输入终止码描述" />
      </el-form-item>
      <el-form-item label="高层诊断码" prop="diaMatParameterCde" label-width="120px">
        <el-input v-model="form.diaMatParameterCde" placeholder="请输入高层诊断码" />
      </el-form-item>
      <el-form-item label="高层诊断码描述" prop="diaMatParameterDesc" label-width="120px">
        <el-input v-model="form.diaMatParameterDesc" placeholder="请输入高层诊断码描述" />
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
      basePath: 'diagnosisConvert',
      form: {
        id: '',
        paramCde: '',
        codeTyp: '',
        diaBgnCde: '',
        diaBgnCdeDesc: '',
        diaEndCde: '',
        diaEndCdeDesc: '',
        diaMatParameterCde: '',
        diaMatParameterDesc: '',
        dutyNo: '',
        dutyDesc: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        dutyNo: [{ required: true, trigger: 'blur', message: '请输入责任号' }],
        dutyDesc: [{ required: true, trigger: 'blur', message: '请输入诊断转换描述' }],
        codeTyp: [{ required: true, trigger: 'blur', message: '请选择代码类型' }]
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
      this.form.codeTyp = null
      this.form.diaBgnCde = null
      this.form.diaBgnCdeDesc = null
      this.form.diaEndCde = null
      this.form.diaEndCdeDesc = null
      this.form.diaMatParameterCde = null
      this.form.diaMatParameterDesc = null
      this.form.dutyNo = null
      this.form.dutyDesc = null
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
        this.form.diaBgnCde = data.diaCde
        this.form.diaBgnCdeDesc = data.diaDesc
      }
      if (this.matchTyp === 2) {
        this.form.diaEndCde = data.diaCde
        this.form.diaEndCdeDesc = data.diaDesc
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

