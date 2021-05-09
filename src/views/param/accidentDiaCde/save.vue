<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="意外诊断码" prop="accidentDiaCde" label-width="120px">
        <el-input v-model="form.accidentDiaCde" placeholder="请输入意外诊断码" disabled="disabled" />
      </el-form-item>

      <el-form-item label="代码类型" prop="codeTyp" label-width="120px">
        <el-select v-model="form.codeTyp" placeholder="请选择" clearable @change="changecodeTyp()">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-row v-show="form.codeTyp=='1'">
        <el-form-item label="起始代码" prop="bgnCde" label-width="120px">
          <el-input v-model="form.bgnCde" placeholder="请选择起始代码">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
          </el-input>
        </el-form-item>
        <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

        <el-form-item label="起始代码描述" prop="bgnCodeDesc" label-width="120px">
          <el-input v-model="form.bgnCodeDesc" placeholder="请输入起始代码描述" />
        </el-form-item>

        <el-form-item label="终止代码" prop="endCde" label-width="120px">
          <el-input v-model="form.endCde" placeholder="请选择终止代码">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
          </el-input>
        </el-form-item>
        <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

        <el-form-item label="终止代码描述" prop="endCodeDesc" label-width="120px">
          <el-input v-model="form.endCodeDesc" placeholder="请输入终止代码描述" />
        </el-form-item>
      </el-row>
      <el-row v-show="form.codeTyp=='2'">
        <el-form-item label="诊断匹配码" prop="diaMatParameterCde" label-width="120px">
          <el-input v-model="form.diaMatParameterCde" placeholder="请输入就诊匹配码" />
        </el-form-item>

        <el-form-item label="诊断匹配描述" prop="diaMatDesc" label-width="120px">
          <el-input v-model="form.diaMatDesc" placeholder="请输入就诊匹配描述" />
        </el-form-item>
      </el-row>
      <el-form-item label="意外诊断说明" prop="accidentDiaExp" label-width="120px">
        <el-input v-model="form.accidentDiaExp" placeholder="请输入意外诊断说明" />
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
      basePath: 'accidentDiaCde',
      form: {
        id: '',
        accidentDiaCde: '',
        codeTyp: '',
        bgnCde: '',
        bgnCodeDesc: '',
        endCde: '',
        endCodeDesc: '',
        diaMatDesc: '',
        diaMatParameterCde: '',
        accidentDiaExp: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        accidentDiaCde: [{ required: true, trigger: 'blur', message: '请输入意外诊断码' }]
        // codeTyp: [{ required: true, trigger: 'blur', message: '请输入代码类型' }],
        // bgnCde: [{ required: true, trigger: 'blur', message: '请输入起始代码' }],
        // endCde: [{ required: true, trigger: 'blur', message: '请输入终止代码' }]
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
      this.form.accidentDiaCde = null
      this.form.codeTyp = null
      this.form.bgnCde = null
      this.form.bgnCodeDesc = null
      this.form.endCde = null
      this.form.endCodeDesc = null
      this.form.diaMatDesc = null
      this.form.diaMatParameterCde = null
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
        this.form.bgnCde = data.diaCde
        this.form.bgnCodeDesc = data.diaDesc
      }
      if (this.matchTyp === 2) {
        this.form.endCde = data.diaCde
        this.form.endCodeDesc = data.diaDesc
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
    },
    changecodeTyp() {
      if (this.form.bgnCde !== null && this.form.bgnCde !== '' && this.form.bgnCde !== undefined) {
        this.form.bgnCde = ''
      }
      if (this.form.bgnCodeDesc !== null && this.form.bgnCodeDesc !== '' && this.form.bgnCodeDesc !== undefined) {
        this.form.bgnCodeDesc = ''
      }
      if (this.form.endCde !== null && this.form.endCde !== '' && this.form.endCde !== undefined) {
        this.form.endCde = ''
      }
      if (this.form.endCodeDesc !== null && this.form.endCodeDesc !== '' && this.form.endCodeDesc !== undefined) {
        this.form.endCodeDesc = ''
      }
      if (this.form.diaMatParameterCde !== null && this.form.diaMatParameterCde !== '' && this.form.diaMatParameterCde !== undefined) {
        this.form.diaMatParameterCde = ''
      }
      if (this.form.diaMatDesc !== null && this.form.diaMatDesc !== '' && this.form.diaMatDesc !== undefined) {
        this.form.diaMatDesc = ''
      }
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

