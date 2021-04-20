<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>
      <el-form-item label="被保人ID" prop="insuredNo" label-width="120px">
        <el-input v-model="form.insuredNo" placeholder="请输入被保人ID" />
      </el-form-item>
      <el-form-item label="承诺N天赔付" prop="payoutAfterDay" label-width="120px">
        <el-input v-model="form.payoutAfterDay" placeholder="请输入承诺N天赔付" />
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
      <el-form-item label="疾病范围选择" prop="herttyp" label-width="120px">
        <el-select v-model="form.herttyp" placeholder="请选择" onchange="changecodeTyp">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="byPass" prop="ByPass" label-width="120px">
        <el-select v-model="form.byPass" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.herttyp=='1'" label="起始代码" prop="sickbgnCde" label-width="120px">
        <el-input v-model="form.sickbgnCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.herttyp=='1'" label="起始代码描述" prop="sickbgnDesc" label-width="120px">
        <el-input v-model="form.sickbgnDesc" placeholder="请输入起始代码描述" />
      </el-form-item>

      <el-form-item v-if="form.herttyp=='1'" label="终止代码" prop="sickendCde" label-width="120px">
        <el-input v-model="form.sickendCde" placeholder="请选择终止代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.herttyp=='1'" label="终止代码描述" prop="sickendDesc" label-width="120px">
        <el-input v-model="form.sickendDesc" placeholder="请输入终止代码描述" />
      </el-form-item>

      <el-form-item v-if="form.herttyp=='2'" label="诊断转换码" prop="diamatparameterCde" label-width="120px">
        <el-input v-model="form.diamatparameterCde" placeholder="请选择诊断转换码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(3)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item v-if="form.herttyp=='2'" label="诊断转换码描述" prop="diamatdesc" label-width="120px">
        <el-input v-model="form.diamatdesc" placeholder="请输入诊断转换码描述" />
      </el-form-item>
      <el-form-item label="起始日" prop="startTm">
        <el-date-picker
          v-model="form.startTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="终止日" prop="endTm">
        <el-date-picker
          v-model="form.endTm"
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

      <el-form-item label="责任转换" prop="dutyConvert" label-width="120px">
        <el-select v-model="form.dutyConvert" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="起始诊疗码" prop="startCde" label-width="120px">
        <el-input v-model="form.startCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(5)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="起始诊疗码描述" prop="startCodeDesc" label-width="120px">
        <el-input v-model="form.startCodeDesc" placeholder="请输入起始代码描述" />
      </el-form-item>

      <el-form-item label="终止诊疗码" prop="endCde" label-width="120px">
        <el-input v-model="form.endCde" placeholder="请选择终止代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(6)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="终止诊疗码描述" prop="endCodeDesc" label-width="120px">
        <el-input v-model="form.endCodeDesc" placeholder="请输入终止代码描述" />
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
      basePath: 'clientAnamnesis',
      form: {
        id: '',
        anamnesisNo: '',
        principalInsuredClientN: '',
        insuredNo: '',
        anamnesisTyp: '',
        payoutAfterDay: '',
        byPass: '',
        startTm: '',
        endTm: '',
        explanationCde: '',
        codeTyp: '',
        dutyConvert: '',
        startCde: '',
        startCodeDesc: '',
        endCde: '',
        endCodeDesc: '',
        desc: '',
        hertParamCde: '',
        explainCde: '',
        explainCdeDesc: '',
        sickbgnCde: '',
        sickbgnDesc: '',
        sickendCde: '',
        sickendDesc: '',
        diamatparameterCde: '',
        diamatdesc: '',
        herttyp: '',
        plyNo: '',
        plyPartNo: ''

      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        paramCde: [{ required: true, trigger: 'blur', message: '请输入参数码' }],
        cdeType: [{ required: true, trigger: 'blur', message: '请选择代码类型' }]
        /*    sickBgnCde: [{ required: true, trigger: 'blur', message: '请选择起始代码' }],
        sickendCde: [{ required: true, trigger: 'blur', message: '请选择终止代码' }],
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
      this.form.diaMatParameterCde = null
      this.form.diaMatDesc = null
      this.form.cdeType = null
      this.form.sickegnCde = null
      this.form.sickendCde = null
      this.form.sickbgnDesc = null
      this.form.sickendDesc = null
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
        this.form.sickbgnCde = data.diaCde
        this.form.sickbgnDesc = data.diaDesc
      }
      if (this.matchTyp === 2) {
        this.form.sickendCde = data.diaCde
        this.form.sickendDesc = data.diaDesc
      }
      if (this.matchTyp === 3) {
        this.form.diamatparameterCde = data.diaMatParameterCde
        this.form.diamatdesc = data.explCategort
      }
      if (this.matchTyp === 4) {
        this.form.explainCde = data.explCde
        this.form.explainCdeDesc = data.explCdeDesc
      }
      if (this.matchTyp === 5) {
        this.form.startCde = data.treatNo
        this.form.startCodeDesc = data.treatDesc
      }
      if (this.matchTyp === 6) {
        this.form.endCde = data.treatNo
        this.form.endCodeDesc = data.treatDesc
      }
    },
    changecodeTyp() {
      this.form.sickBgnCde = null
      this.form.sickBgnDesc = null
      this.form.sickendCde = null
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

