<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="承诺N天赔付" prop="PayoutAfterDay" label-width="120px">
        <el-input v-model="form.PayoutAfterDay" placeholder="请输入承诺N天赔付" />
      </el-form-item>

      <!-- <el-form-item label="合计限额额度" prop="amountQuotaLimit" label-width="120px">
        <el-input v-model="form.amountQuotaLimit" placeholder="请输入合计限额额度" />
      </el-form-item>
      <el-form-item label="起始日" prop="plyBgnTm">
        <el-date-picker
          v-model="form.plyBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>-->
      <el-form-item label="疾病范围选择" prop="HertTyp" label-width="120px">
        <el-select v-model="form.HertTyp" placeholder="请选择" onchange="changecodeTyp">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="ByPass" prop="ByPass" label-width="120px">
        <el-select v-model="form.ByPass" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.HertTyp=='1'" label="起始代码" prop="sickBgnCde" label-width="120px">
        <el-input v-model="form.sickBgnCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.HertTyp=='1'" label="起始代码描述" prop="SickBgnCde" label-width="120px">
        <el-input v-model="form.SickBgnDesc" placeholder="请输入起始代码描述" />
      </el-form-item>

      <el-form-item v-if="form.HertTyp=='1'" label="终止代码" prop="SickEndCde" label-width="120px">
        <el-input v-model="form.sickEndCde" placeholder="请选择终止代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.HertTyp=='1'" label="终止代码描述" prop="SickEndDesc" label-width="120px">
        <el-input v-model="form.SickEndDesc" placeholder="请输入终止代码描述" />
      </el-form-item>

      <el-form-item v-if="form.HertTyp=='2'" label="诊断转换码" prop="DiaMatParameterCde" label-width="120px">
        <el-input v-model="form.DiaMatParameterCde" placeholder="请选择诊断转换码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(3)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.HertTyp=='2'" label="诊断转换码描述" prop="DiaMatDesc" label-width="120px">
        <el-input v-model="form.DiaMatDesc" placeholder="请输入诊断转换码描述" />
      </el-form-item>
      <el-form-item label="起始日" prop="StartTm">
        <el-date-picker
          v-model="form.StartTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="终止日" prop="EndTm">
        <el-date-picker
          v-model="form.EndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(4)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explainCdeDesc" label-width="120px">
        <el-input v-model="form.explainCdeDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="责任转换" prop="DutyConvert" label-width="120px">
        <el-select v-model="form.DutyConvert" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="起始诊疗码" prop="StartCde" label-width="120px">
        <el-input v-model="form.StartCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(5)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="起始诊疗码描述" prop="StartCodeDesc" label-width="120px">
        <el-input v-model="form.StartCodeDesc" placeholder="请输入起始代码描述" />
      </el-form-item>

      <el-form-item label="终止诊疗码" prop="EndCde" label-width="120px">
        <el-input v-model="form.EndCde" placeholder="请选择终止代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(6)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="终止诊疗码描述" prop="EndCodeDesc" label-width="120px">
        <el-input v-model="form.EndCodeDesc" placeholder="请输入终止代码描述" />
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
      basePath: 'sicknessScope',
      form: {
        id: '',
        AnamnesisNo: '',
        PrincipalInsuredClientN: '',
        InsuredNo: '',
        AnamnesisTyp: '',
        PayoutAfterDay: '',
        ByPass: '',
        StartTm: '',
        EndTm: '',
        ExplanationCde: '',
        CodeTyp: '',
        DutyConvert: '',
        StartCde: '',
        StartCodeDesc: '',
        EndCde: '',
        EndCodeDesc: '',
        Desc: '',
        HertParamCde: '',
        ExplainCdeDesc: '',
        SickBgnCde: '',
        SickBgnDesc: '',
        SickEndCde: '',
        SickEndDesc: '',
        DiaMatParameterCde: '',
        DiaMatDesc: '',
        HertTyp: '',
        plyPart: ''

      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        paramCde: [{ required: true, trigger: 'blur', message: '请输入参数码' }],
        cdeType: [{ required: true, trigger: 'blur', message: '请选择代码类型' }]
        /*    sickBgnCde: [{ required: true, trigger: 'blur', message: '请选择起始代码' }],
        sickEndCde: [{ required: true, trigger: 'blur', message: '请选择终止代码' }],
        sickBgnDesc: [{ required: true, trigger: 'blur', message: '请选择起始代码描述' }],
        sickEndDesc: [{ required: true, trigger: 'blur', message: '请选择终止代码描述' }]*/
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
      this.form.linkDeductibleId = null
      this.form.diaMatParameterCde = null
      this.form.diaMatDesc = null
      this.form.cdeType = null
      this.form.sickBgnCde = null
      this.form.sickEndCde = null
      this.form.sickBgnDesc = null
      this.form.sickEndDesc = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch(matchTyp) {
      debugger
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      debugger
      if (this.matchTyp === 1) {
        this.form.SickBgnCde = data.diaCde
        this.form.SickBgnDesc = data.diaDesc
      }
      if (this.matchTyp === 2) {
        this.form.SickEndCde = data.diaCde
        this.form.SickEndDesc = data.diaDesc
      }
      if (this.matchTyp === 3) {
        this.form.DiaMatParameterCde = data.diaMatParameterCde
        this.form.DiaMatDesc = data.explCategort
      }
      if (this.matchTyp === 4) {
        this.form.explainCde = data.explCde
        this.form.explainCdeDesc = data.explCdeDesc
      }
      if (this.matchTyp === 5) {
        this.form.StartCde = data.treatNo
        this.form.StartCodeDesc = data.treatDesc
      }
      if (this.matchTyp === 6) {
        this.form.EndCde = data.treatNo
        this.form.EndCodeDesc = data.treatDesc
      }
    },
    changecodeTyp() {
      this.form.sickBgnCde = null
      this.form.sickBgnDesc = null
      this.form.sickEndCde = null
      this.form.sickEndDesc = null
      this.form.diaMatParameterCde = null
      this.form.diaMatDesc = null
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

