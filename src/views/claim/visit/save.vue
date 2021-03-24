<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="意外" prop="isAccident" label-width="120px">
        <el-select v-model="form.isAccident" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="急诊" prop="isEmergTreat" label-width="120px">
        <el-select v-model="form.isEmergTreat" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="缺材料" prop="isLackMaterial" label-width="120px">
        <el-select v-model="form.isLackMaterial" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="既往病史" prop="isMedicalHistory" label-width="120px">
        <el-select v-model="form.isMedicalHistory" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="生育" prop="isBirth" label-width="120px">
        <el-select v-model="form.isBirth" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="工伤" prop="isInjuryJob" label-width="120px">
        <el-select v-model="form.isInjuryJob" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="重疾" prop="stricken" label-width="120px">
        <el-select v-model="form.stricken" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否特需" prop="isMust" label-width="120px">
        <el-select v-model="form.isMust" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="小项描述" prop="xresponseMme" label-width="120px">
        <el-input v-model="form.xresponseMme" placeholder="请输入小项描述" />
      </el-form-item>

      <el-form-item label="指定医院" prop="isDesignHospital" label-width="120px">
        <el-select v-model="form.isDesignHospital" placeholder="请选择指定医院">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否忽略等待期" prop="isignWait" label-width="120px">
        <el-select v-model="form.isignWait" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否医保投保" prop="isHasMedical" label-width="120px">
        <el-select v-model="form.isHasMedical" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否使用医保卡" prop="isUseMedical" label-width="120px">
        <el-select v-model="form.isUseMedical" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="齿科" prop="dentidtry" label-width="120px">
        <el-select v-model="form.dentidtry" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="客户申请号" prop="customAppNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="出险人号" prop="riskNo" label-width="120px">
        <el-input v-model="form.riskNo" placeholder="请输入出险人号" />
      </el-form-item>
      <el-form-item label="医院号" prop="hospitalNo" label-width="120px">
        <el-input v-model="form.hospitalNo" placeholder="请输入医院号" />
      </el-form-item>

      <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
        <el-input v-model="form.hospitalNme" placeholder="请输入医院名称" />
      </el-form-item>

      <el-form-item label="医院科室" prop="hospitalDepart" label-width="120px">
        <el-input v-model="form.hospitalDepart" placeholder="请输入医院科室" />
      </el-form-item>

      <el-form-item label="诊断医生" prop="doctor" label-width="120px">
        <el-input v-model="form.doctor" placeholder="请输入诊断医生" />
      </el-form-item>

      <el-form-item label="就诊日" prop="docTm" label-width="120px">
        <el-date-picker
          v-model="form.docTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="诊断码" prop="diagCde" label-width="120px">
        <el-input v-model="form.diagCde" placeholder="请输入诊断码" />
      </el-form-item>

      <el-form-item label="诊断描述" prop="diagDesc" label-width="120px">
        <el-input v-model="form.diagDesc" placeholder="请输入诊断描述" />
      </el-form-item>

      <el-form-item label="次诊断码1" prop="secdiagCdeOne" label-width="120px">
        <el-input v-model="form.secdiagCdeOne" placeholder="请输入次诊断码1" />
      </el-form-item>

      <el-form-item label="次诊断描述1" prop="secdiagDescOne" label-width="120px">
        <el-input v-model="form.secdiagDescOne" placeholder="请输入次诊断描述1" />
      </el-form-item>

      <el-form-item label="次诊断码2" prop="secdiagCdeTwo" label-width="120px">
        <el-input v-model="form.secdiagCdeTwo" placeholder="请输入次诊断码2" />
      </el-form-item>

      <el-form-item label="次诊断描述2" prop="secdiagDescTwo" label-width="120px">
        <el-input v-model="form.secdiagDescTwo" placeholder="请输入次诊断描述2" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="docTyp" label-width="120px">
        <el-select v-model="form.docTyp" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="就诊起始日" prop="docBgnTm" label-width="120px">
        <el-date-picker
          v-model="form.docBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="就诊终止日" prop="docEndTm" label-width="120px">
        <el-date-picker
          v-model="form.docEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="津贴类型" prop="hospTyp" label-width="120px">
        <el-select v-model="form.hospTyp" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="日津贴" prop="hospDayAmt" label-width="120px">
        <el-input v-model="form.hospDayAmt" placeholder="请输入日津贴" />
      </el-form-item>

      <el-form-item label="住院天数" prop="inhospDays" label-width="120px">
        <el-input v-model="form.inhospDays" placeholder="请输入住院天数" />
      </el-form-item>

      <el-form-item label="务工天数" prop="workingDays" label-width="120px">
        <el-input v-model="form.workingDays" placeholder="请输入务工天数" />
      </el-form-item>

      <el-form-item label="免赔天数" prop="deductleDays" label-width="120px">
        <el-input v-model="form.deductleDays" placeholder="请输入免赔天数" />
      </el-form-item>

      <el-form-item label="超限额天数" prop="exclimitQuotaDays" label-width="120px">
        <el-input v-model="form.exclimitQuotaDays" placeholder="请输入超限额天数" />
      </el-form-item>

      <el-form-item label="就诊序号" prop="clmVisitId" label-width="120px">
        <el-input v-model="form.clmVisitId" placeholder="请输入就诊序号" />
      </el-form-item>

      <el-form-item label="是否原始就诊" prop="isOriginalVis" label-width="120px">
        <el-select v-model="form.isOriginalVis" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="出险时间" prop="dangerOutTime" label-width="120px">
        <el-date-picker
          v-model="form.dangerOutTime"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="事故日期" prop="accidentTm" label-width="120px">
        <el-date-picker
          v-model="form.accidentTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="结案日" prop="settleTm" label-width="120px">
        <el-date-picker
          v-model="form.settleTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="客户理赔号" prop="customClmNo" label-width="120px">
        <el-input v-model="form.customClmNo" placeholder="请输入客户理赔号" />
      </el-form-item>

      <el-form-item label="历史理赔号" prop="historyClmNo" label-width="120px">
        <el-input v-model="form.historyClmNo" placeholder="请输入历史理赔号" />
      </el-form-item>

      <el-form-item label="历史赔付金额" prop="historyClmSum" label-width="120px">
        <el-input v-model="form.historyClmSum" placeholder="请输入历史赔付金额" />
      </el-form-item>

      <el-form-item label="发票张数" prop="invoiceNum" label-width="120px">
        <el-input v-model="form.invoiceNum" placeholder="请输入发票张数" />
      </el-form-item>

      <el-form-item label="就诊总金额" prop="invoiceSum" label-width="120px">
        <el-input v-model="form.invoiceSum" placeholder="请输入就诊总金额" />
      </el-form-item>

      <el-form-item label="社保支付金额" prop="overallAmt" label-width="120px">
        <el-input v-model="form.overallAmt" placeholder="请输入社保支付金额" />
      </el-form-item>

      <el-form-item label="分类自付金额" prop="categSelfAmt" label-width="120px">
        <el-input v-model="form.categSelfAmt" placeholder="请输入分类自付金额" />
      </el-form-item>

      <el-form-item label="自费金额" prop="selfAmt" label-width="120px">
        <el-input v-model="form.selfAmt" placeholder="请输入自费金额" />
      </el-form-item>

      <el-form-item label="不合理金额" prop="unreasonableAmt" label-width="120px">
        <el-input v-model="form.unreasonableAmt" placeholder="请输入不合理金额" />
      </el-form-item>

      <el-form-item label="公共保额给付金额" prop="commonPrestaAmt" label-width="120px">
        <el-input v-model="form.commonPrestaAmt" placeholder="请输入公共保额给付金额" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
      </el-form-item>

      <el-form-item label="可理算金额" prop="clacAmt" label-width="120px">
        <el-input v-model="form.clacAmt" placeholder="请输入可理算金额" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
      </el-form-item>

      <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
        <el-input v-model="form.adjustAmt" placeholder="请输入调整金额" />
      </el-form-item>

      <el-form-item label="金额调整原因" prop="adjustDesc" label-width="120px">
        <el-input v-model="form.adjustDesc" placeholder="请输入金额调整原因" />
      </el-form-item>

      <el-form-item label="最终赔付" prop="finalPay" label-width="120px">
        <el-input v-model="form.finalPay" placeholder="请输入最终赔付" />
      </el-form-item>

      <el-form-item label="被保险人支付" prop="insuredPay" label-width="120px">
        <el-input v-model="form.insuredPay" placeholder="请输入被保险人支付" />
      </el-form-item>

      <el-form-item label="账单赔付" prop="billPay" label-width="120px">
        <el-input v-model="form.billPay" placeholder="请输入账单赔付" />
      </el-form-item>

      <!--<el-form-item label="就诊序号" prop="clmVisitId" label-width="120px">
        <el-input v-model="form.clmVisitId" placeholder="请输入批次号" />
      </el-form-item>-->

      <!--<el-form-item label="解释码" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>-->

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="form.interpDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="基金账户支取方式" prop="fundacctTyp" label-width="120px">
        <el-input v-model="form.fundacctTyp" placeholder="请输入基金账户支取方式" />
      </el-form-item>

      <el-form-item label="基金" prop="fund" label-width="120px">
        <el-input v-model="form.fund" placeholder="请输入基金" />
      </el-form-item>

      <el-form-item label="原件影像" prop="orignImage" label-width="120px">
        <el-input v-model="form.orignImage" placeholder="请输入原件影像" />
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="form.description" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="赔付结论" prop="compensateResult" label-width="120px">
        <el-select v-model="form.compensateResult" placeholder="请选择">
          <el-option
            v-for="item in businessData.AdjustmentType"
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
      <el-form-item label="责任层id" prop="dutyId" label-width="120px">
        <el-input v-model="form.dutyId" placeholder="请输入责任层id" />
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
import { save, edit } from '@/api/claim/visit'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        dutyId: '',
        isAccident: '',
        isEmergTreat: '',
        isLackMaterial: '',
        isMedicalHistory: '',
        isBirth: '',
        isInjuryJob: '',
        stricken: '',
        isMust: '',
        xresponseMme: '',
        isDesignHospital: '',
        isignWait: '',
        isHasMedical: '',
        isUseMedical: '',
        dentidtry: '',
        batchNo: '',
        plyPartNo: '',
        customAppNo: '',
        riskNo: '',
        hospitalNo: '',
        hospitalNme: '',
        hospitalDepart: '',
        doctor: '',
        docTm: '',
        diagCde: '',
        diagDesc: '',
        secdiagCdeOne: '',
        secdiagDescOne: '',
        secdiagCdeTwo: '',
        secdiagDescTwo: '',
        docTyp: '',
        docBgnTm: '',
        docEndTm: '',
        hospTyp: '',
        hospDayAmt: '',
        inhospDays: '',
        workingDays: '',
        deductleDays: '',
        exclimitQuotaDays: '',
        // clmVisitId: '',
        isOriginalVis: '',
        dangerOutTime: '',
        accidentTm: '',
        settleTm: '',
        customClmNo: '',
        historyClmNo: '',
        historyClmSum: '',
        invoiceNum: '',
        invoiceSum: '',
        overallAmt: '',
        categSelfAmt: '',
        selfAmt: '',
        unreasonableAmt: '',
        commonPrestaAmt: '',
        deductAmt: '',
        clacAmt: '',
        compensateAmt: '',
        adjustAmt: '',
        adjustDesc: '',
        finalPay: '',
        insuredPay: '',
        billPay: '',
        clmVisitId: '',
        interpDesc: '',
        fundacctTyp: '',
        fund: '',
        orignImage: '',
        description: '',
        compensateResult: '',
        conclusionDesc: '',
        auditInformation: ''
      },

      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
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
      this.form.dutyId = null
      this.form.isAccident = null
      this.form.isEmergTreat = null
      this.form.isLackMaterial = null
      this.form.isMedicalHistory = null
      this.form.isBirth = null
      this.form.isInjuryJob = null
      this.form.stricken = null
      this.form.isMust = null
      this.form.xresponseMme = null
      this.form.isDesignHospital = null
      this.form.isignWait = null
      this.form.isHasMedical = null
      this.form.isUseMedical = null
      this.form.dentidtry = null
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.customAppNo = null
      this.form.riskNo = null
      this.form.hospitalNo = null
      this.form.hospitalNme = null
      this.form.hospitalDepart = null
      this.form.doctor = null
      this.form.docTm = null
      this.form.diagCde = null
      this.form.diagDesc = null
      this.form.secdiagCdeOne = null
      this.form.secdiagDescOne = null
      this.form.secdiagCdeTwo = null
      this.form.secdiagDescTwo = null
      this.form.docTyp = null
      this.form.docBgnTm = null
      this.form.docEndTm = null
      this.form.hospTyp = null
      this.form.hospDayAmt = null
      this.form.inhospDays = null
      this.form.workingDays = null
      this.form.deductleDays = null
      this.form.exclimitQuotaDays = null
      // this.form.clmVisitId = null
      this.form.isOriginalVis = null
      this.form.dangerOutTime = null
      this.form.accidentTm = null
      this.form.settleTm = null
      this.form.customClmNo = null
      this.form.historyClmNo = null
      this.form.historyClmSum = null
      this.form.invoiceNum = null
      this.form.invoiceSum = null
      this.form.overallAmt = null
      this.form.categSelfAmt = null
      this.form.selfAmt = null
      this.form.unreasonableAmt = null
      this.form.commonPrestaAmt = null
      this.form.deductAmt = null
      this.form.clacAmt = null
      this.form.compensateAmt = null
      this.form.adjustAmt = null
      this.form.adjustDesc = null
      this.form.finalPay = null
      this.form.insuredPay = null
      this.form.billPay = null
      this.form.clmVisitId = null
      this.form.interpDesc = null
      this.form.fundacctTyp = null
      this.form.fund = null
      this.form.orignImage = null
      this.form.description = null
      this.form.compensateResult = null
      this.form.conclusionDesc = null
      this.form.auditInformation = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
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

