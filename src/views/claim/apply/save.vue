<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="申请人姓名" prop="appNme" label-width="120px">
        <el-input v-model="form.appNme" placeholder="请输入申请人姓名" />
      </el-form-item>

      <el-form-item label="申请人证件号" prop="appCertCde" label-width="120px">
        <el-input v-model="form.appCertCde" placeholder="请输入申请人证件号" />
      </el-form-item>

      <el-form-item label="提交发票数" prop="subInvNum" label-width="120px">
        <el-input v-model="form.subInvNum" placeholder="请输入提交发票数" />
      </el-form-item>

      <el-form-item label="是否意外" prop="isAccident" label-width="120px">
        <el-select v-model="form.isAccident" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="意外发生地" prop="accidentPlace" label-width="120px">
        <el-input v-model="form.accidentPlace" placeholder="请输入意外发生地号" />
      </el-form-item>

      <el-form-item label="意外日" prop="accidentTm" label-width="120px">
        <el-date-picker
          v-model="form.accidentTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="意外类型" prop="accidentTyp" label-width="120px">
        <el-select v-model="form.accidentTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.AccidentTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否生育" prop="isBirth" label-width="120px">
        <el-select v-model="form.isBirth" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="确认妊娠日期" prop="prenancyTm" label-width="120px">
        <el-date-picker
          v-model="form.prenancyTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="关联案件信息" prop="relateCase" label-width="120px">
        <el-input v-model="form.relateCase" placeholder="请输入关联案件信息" />
      </el-form-item>

      <el-form-item label="银行名称" prop="bankNme" label-width="120px">
        <el-input v-model="form.bankNme" placeholder="请输入银行名称" />
      </el-form-item>

      <el-form-item label="银行类型" prop="bankTyp" label-width="120px">
        <el-select v-model="form.bankTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CBankTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="账户号" prop="acctNo" label-width="120px">
        <el-input v-model="form.acctNo" placeholder="请输入账户号" />
      </el-form-item>

      <el-form-item label="账户名" prop="acctNme" label-width="120px">
        <el-input v-model="form.acctNme" placeholder="请输入账户名" />
      </el-form-item>

      <el-form-item label="银行所在地区" prop="bankArea" label-width="120px">
        <el-input v-model="form.bankArea" placeholder="请输入银行所在地区" />
      </el-form-item>

      <el-form-item label="客户申请号" prop="customAppNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="公共保额" prop="isCommonAmt" label-width="120px">
        <el-select v-model="form.isCommonAmt" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="死亡证明" prop="isDeathProve" label-width="120px">
        <el-select v-model="form.isDeathProve" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="残疾证明" prop="isDisableProve" label-width="120px">
        <el-select v-model="form.isDisableProve" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="工伤证明" prop="isInjuryJobProve" label-width="120px">
        <el-select v-model="form.isInjuryJobProve" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="申请人电话" prop="appPhone" label-width="120px">
        <el-input v-model="form.appPhone" placeholder="请输入申请人电话" />
      </el-form-item>

      <el-form-item label="申请人电子邮件" prop="appEmail" label-width="120px">
        <el-input v-model="form.appEmail" placeholder="请输入申请人电子邮件" />
      </el-form-item>

      <el-form-item label="退件" prop="isBack" label-width="120px">
        <el-select v-model="form.isBack" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医疗赔付方式" prop="medicalCompensateTyp" label-width="120px">
        <el-select v-model="form.medicalCompensateTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.MedicalRMethod"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="调整解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="form.adjustInterpCde" placeholder="请输入调整解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="form.interpDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="发票张数" prop="invoiceNum" label-width="120px">
        <el-input v-model="form.invoiceNum" placeholder="请输入发票张数" />
      </el-form-item>

      <el-form-item label="收件日" prop="comsignTm" label-width="120px">
        <el-date-picker
          v-model="form.comsignTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="就诊次数" prop="visitNum" label-width="120px">
        <el-input v-model="form.visitNum" placeholder="请输入就诊次数" />
      </el-form-item>

      <el-form-item label="发票总金额" prop="invoiceSum" label-width="120px">
        <el-input v-model="form.invoiceSum" placeholder="请输入发票总金额" />
      </el-form-item>

      <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
        <el-input v-model="form.reasonableAmt" placeholder="请输入可理算金额" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
      </el-form-item>

      <el-form-item label="自付金额" prop="selfAmt" label-width="120px">
        <el-input v-model="form.selfAmt" placeholder="请输入自付金额" />
      </el-form-item>

      <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
        <el-input v-model="form.adjustAmt" placeholder="请输入调整金额" />
      </el-form-item>

      <el-form-item label="金额调整原因" prop="adjustDesc" label-width="120px">
        <el-input v-model="form.adjustDesc" placeholder="请输入调整金额原因" />
      </el-form-item>

      <el-form-item label="公共保额给付金额" prop="commonPrestaAmt" label-width="120px">
        <el-input v-model="form.commonPrestaAmt" placeholder="请输入公共保额给付金额" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
      </el-form-item>

      <el-form-item label="最终赔付金额" prop="finalCompensateAmt" label-width="120px">
        <el-input v-model="form.finalCompensateAmt" placeholder="请输入最终赔付金额" />
      </el-form-item>

      <el-form-item label="账单赔付金额" prop="billCompensateAmt" label-width="120px">
        <el-input v-model="form.billCompensateAmt" placeholder="请输入账单赔付金额" />
      </el-form-item>

      <el-form-item label="理赔结论说明" prop="clmClusion" label-width="120px">
        <el-input v-model="form.clmClusion" placeholder="请输入理赔结论说明" />
      </el-form-item>

      <el-form-item label="理算说明" prop="explanation" label-width="120px">
        <el-input v-model="form.explanation" placeholder="请输入理算说明" />
      </el-form-item>

      <el-form-item label="原件影像" prop="orignImage" label-width="120px">
        <el-input v-model="form.orignImage" placeholder="请输入原件影像" />
      </el-form-item>

      <el-form-item label="结案日期" prop="endCaseTm" label-width="120px">
        <el-date-picker
          v-model="form.endCaseTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="理算优先顺序" prop="priorityOrder" label-width="120px">
        <el-input v-model="form.priorityOrder" placeholder="请输入理算优先顺序" />
      </el-form-item>

      <el-form-item label="状态" prop="status" label-width="120px">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in businessData.CBatchStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="form.description" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="受益人" prop="beneficiary" label-width="120px">
        <el-input v-model="form.beneficiary" placeholder="请输入受益人" />
      </el-form-item>

      <el-form-item label="被保人id" prop="insuresId" label-width="120px">
        <el-input v-model="form.insuresId" placeholder="请输入被保人id" />
      </el-form-item>

      <el-form-item label="案件状态" prop="caseStatus" label-width="120px">
        <el-select v-model="form.caseStatus" placeholder="请选择">
          <el-option
            v-for="item in businessData.CCaseStatuses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="线下调查" prop="investigate" label-width="120px">
        <el-select v-model="form.investigate" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="线下调查备注" prop="investigateRemark" label-width="120px">
        <el-input v-model="form.investigateRemark" placeholder="请输入线下调查备注" />
      </el-form-item>

      <el-form-item label="理算层级" prop="calcLevel" label-width="120px">
        <el-select v-model="form.calcLevel" placeholder="请选择">
          <el-option
            v-for="item in businessData.calcLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="结论描述" prop="conclusionDesc" label-width="120px">
        <el-input v-model="form.conclusionDesc" placeholder="请输入结论描述" />
      </el-form-item>

      <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
        <el-input v-model="form.auditInformation" placeholder="请输入校验审核信息" />
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
import { save, edit } from '@/api/claim/apply'
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
      form: {
        id: '',
        batchNo: '',
        plyPartNo: '',
        appNme: '',
        appCertCde: '',
        subInvNum: '',
        isAccident: '',
        accidentPlace: '',
        accidentTm: '',
        accidentTyp: '',
        isBirth: '',
        prenancyTm: '',
        relateCase: '',
        bankNme: '',
        bankTyp: '',
        acctNo: '',
        acctNme: '',
        bankArea: '',
        customAppNo: '',
        isCommonAmt: '',
        isDeathProve: '',
        isDisableProve: '',
        isInjuryJobProve: '',
        appPhone: '',
        appEmail: '',
        isBack: '',
        medicalCompensateTyp: '',
        adjustInterpCde: '',
        interpDesc: '',
        invoiceNum: '',
        comsignTm: '',
        visitNum: '',
        invoiceSum: '',
        reasonableAmt: '',
        deductAmt: '',
        selfAmt: '',
        adjustAmt: '',
        adjustDesc: '',
        commonPrestaAmt: '',
        compensateAmt: '',
        finalCompensateAmt: '',
        billCompensateAmt: '',
        clmClusion: '',
        explanation: '',
        orignImage: '',
        endCaseTm: '',
        priorityOrder: '',
        status: '',
        description: '',
        beneficiary: '',
        insuresId: '',
        caseStatus: '',
        investigate: '',
        investigateRemark: '',
        conclusionDesc: '',
        auditInformation: '',
        calcLevel: ''
      },
      matchTyp: null,
      matchVisable: false,
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }],
        plyPartNo: [{ required: true, trigger: 'blur', message: '请输入分单号' }],
        appNme: [{ required: true, trigger: 'blur', message: '请输入申请人姓名' }],
        appCertCde: [{ required: true, trigger: 'blur', message: '请输入申请人证件号' }],
        subInvNum: [{ required: true, trigger: 'blur', message: '请输入提交发票数' }],
        customAppNo: [{ required: true, trigger: 'blur', message: '请输入客户申请号' }]
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
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.appNme = null
      this.form.appCertCde = null
      this.form.subInvNum = null
      this.form.isAccident = null
      this.form.accidentPlace = null
      this.form.accidentTm = null
      this.form.accidentTyp = null
      this.form.isBirth = null
      this.form.prenancyTm = null
      this.form.relateCase = null
      this.form.bankNme = null
      this.form.bankTyp = null
      this.form.acctNo = null
      this.form.acctNme = null
      this.form.bankArea = null
      this.form.customAppNo = null
      this.form.isCommonAmt = null
      this.form.isDeathProve = null
      this.form.isDisableProve = null
      this.form.isInjuryJobProve = null
      this.form.appPhone = null
      this.form.appEmail = null
      this.form.isBack = null
      this.form.medicalCompensateTyp = null
      this.form.adjustInterpCde = null
      this.form.interpDesc = null
      this.form.invoiceNum = null
      this.form.comsignTm = null
      this.form.visitNum = null
      this.form.invoiceSum = null
      this.form.reasonableAmt = null
      this.form.deductAmt = null
      this.form.selfAmt = null
      this.form.adjustAmt = null
      this.form.adjustDesc = null
      this.form.commonPrestaAmt = null
      this.form.compensateAmt = null
      this.form.finalCompensateAmt = null
      this.form.billCompensateAmt = null
      this.form.clmClusion = null
      this.form.explanation = null
      this.form.orignImage = null
      this.form.endCaseTm = null
      this.form.priorityOrder = null
      this.form.status = null
      this.form.description = null
      this.form.beneficiary = null
      this.form.insuresId = null
      this.form.caseStatus = null
      this.form.investigate = null
      this.form.investigateRemark = null
      this.form.conclusionDesc = null
      this.form.auditInformation = null
      this.form.calcLevel = null
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
      this.form.adjustInterpCde = data.explCde
      this.form.interpDesc = data.explCdeDesc
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            save(this.form).then(response => {
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
            edit(this.form).then(response => {
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

