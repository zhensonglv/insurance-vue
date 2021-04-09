<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <div>
        <ul class="tab-tilte">
          <li>案件属性</li>
          <div class="right-part">
            <i @click="handlerThe1">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show1">
            <el-form-item label="意外" prop="isAccident" label-width="100px">
              <el-select v-model="form.isAccident" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="生育" prop="isBirth" label-width="100px">
              <el-select v-model="form.isBirth" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="齿科" prop="isDentidtry" label-width="100px">
              <el-select v-model="form.isDentidtry" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="工伤" prop="isInjuryJob" label-width="100px">
              <el-select v-model="form.isInjuryJob" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="重疾" prop="isStricken" label-width="100px">
              <el-select v-model="form.isStricken" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="医保投保" prop="isHasMedical" label-width="100px">
              <el-select v-model="form.isHasMedical" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="使用医保卡" prop="isUseMedical" label-width="100px">
              <el-select v-model="form.isUseMedical" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="是否特需" prop="isMust" label-width="100px">
              <el-select v-model="form.isMust" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesOrNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="急诊" prop="isEmergTreat" label-width="100px">
              <el-select v-model="form.isEmergTreat" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="康复" prop="isRehabiliation" label-width="100px">
              <el-select v-model="form.isRehabiliation" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesOrNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="缺材料" prop="isLackMaterial" label-width="100px">
              <el-select v-model="form.isLackMaterial" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="指定医院" prop="isDesignHospital" label-width="100px">
              <el-select v-model="form.isDesignHospital" placeholder="请选择指定医院">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="既往病史" prop="isMedicalHistory" label-width="100px">
              <el-select v-model="form.isMedicalHistory" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略等待期" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignWait" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略除外责任" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignExcelusion" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略医保卡使用规则" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignUseCardRule" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

          </div>
        </el-collapse-transition>
      </div>
      <div>
        <ul class="tab-tilte">
          <li>就诊信息</li>
          <div class="right-part">
            <i @click="handlerThe2">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show2">
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

            <el-form-item label="就诊类型" prop="docTyp" label-width="100px">
              <el-select v-model="form.docTyp" placeholder="请选择">
                <el-option
                  v-for="item in businessData.ClinicType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="就诊起始日" prop="docBgnTm" label-width="100px">
              <el-date-picker
                v-model="form.docBgnTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="就诊终止日" prop="docEndTm" label-width="100px">
              <el-date-picker
                v-model="form.docEndTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>
            <el-form-item label="就诊序号" prop="clmVisitId" label-width="100px">
              <el-input v-model="form.clmVisitId" placeholder="请输入就诊序号" />
            </el-form-item>

            <el-form-item label="是否原始就诊" prop="isOriginalVis" label-width="100px">
              <el-select v-model="form.isOriginalVis" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="出险时间" prop="dangerOutTime" label-width="100px">
              <el-date-picker
                v-model="form.dangerOutTime"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="事故日期" prop="accidentTm" label-width="100px">
              <el-date-picker
                v-model="form.accidentTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="结案日" prop="settleTm" label-width="100px">
              <el-date-picker
                v-model="form.settleTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="客户理赔号" prop="customClmNo" label-width="100px">
              <el-input v-model="form.customClmNo" placeholder="请输入客户理赔号" />
            </el-form-item>

            <el-form-item label="发票张数" prop="invoiceNum" label-width="100px">
              <el-input v-model="form.invoiceNum" placeholder="请输入发票张数" />
            </el-form-item>
            <el-form-item label="务工天数" prop="workingDays" label-width="100px">
              <el-input v-model="form.workingDays" placeholder="请输入务工天数" />
            </el-form-item>
          </div>
        </el-collapse-transition>
      </div>

      <div>
        <ul class="tab-tilte">
          <li>赔付信息</li>
          <div class="right-part">
            <i @click="handlerThe3">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show3">
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

            <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
              <el-input v-model="form.auditInformation" placeholder="请输入校验审核信息" />
            </el-form-item>

            <!--   <el-form-item label="责任层id" hidden="hidden" prop="dutyId" label-width="120px">
              <el-input v-model="form.dutyId" placeholder="请输入责任层id" />
            </el-form-item>-->

            <el-row>
              <el-form-item label="结论描述" prop="conclusionDesc" label-width="100px">
                <el-input v-model="form.conclusionDesc" type="textarea" style="width: 800px;" :autosize="{ minRows: 2, maxRows: 20}" placeholder="请输入结论描述" clearable />
              </el-form-item>
            </el-row>
          </div>
        </el-collapse-transition>
      </div>
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
import { initVistData, save, edit } from '@/api/claim/visit'

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
        isStricken: '',
        isMust: '',
        isDesignHospital: '',
        isignWait: '',
        isHasMedical: '',
        isUseMedical: '',
        isDentidtry: '',
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
        workingDays: '',
        isOriginalVis: '',
        dangerOutTime: '',
        accidentTm: '',
        settleTm: '',
        customClmNo: '',
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
        auditInformation: '',
        isignUseCardRule: '',
        isignExcelusion: '',
        isRehabiliation: ''
      },
      show1: true,
      show2: true,
      show3: true,
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
      },
      oldForm: {}
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.exeOldForm(newVal)
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

    handlerThe1() {
      this.show1 = !this.show1
    },
    handlerThe2() {
      this.show2 = !this.show2
    },
    handlerThe3() {
      this.show3 = !this.show3
    },
    exeOldForm(newVal) {
      this.oldForm.isAccident = newVal.isAccident// 是否意外
      this.oldForm.isEmergTreat = newVal.isEmergTreat// 是否急诊
      this.oldForm.isLackMaterial = newVal.isLackMaterial// 缺材料
      this.oldForm.isBirth = newVal.isBirth// 生育
      this.oldForm.isInjuryJob = newVal.isInjuryJob// 工伤
      this.oldForm.isStricken = newVal.isStricken// 重疾
      this.oldForm.isHasMedical = newVal.isHasMedical// 医保投保
      this.oldForm.isUseMedical = newVal.isUseMedical// 是否使用医保卡
      this.oldForm.isDentidtry = newVal.isDentidtry// 齿科
      this.oldForm.isMust = newVal.isMust// 是否特需
      this.oldForm.isDesignHospital = newVal.isDesignHospital// 指定医院
      this.oldForm.isMedicalHistory = newVal.isMedicalHistory// 既往病史
      this.oldForm.isignWait = newVal.isignWait// 忽略等待期
      this.oldForm.isignUseCardRule = newVal.isignUseCardRule// 忽略医保卡使用规则
      this.oldForm.isignExcelusion = newVal.isignExcelusion// 忽略除外责任
      this.oldForm.isRehabiliation = newVal.isRehabiliation// 是否康复
    },
    checkOldForm() {
      var flag = false
      if (this.form.isAccident !== this.oldForm.isAccident) {
        flag = true
      }
      if (this.form.isDentidtry !== this.oldForm.isDentidtry) {
        flag = true
      }
      if (this.form.isBirth !== this.oldForm.isBirth) {
        flag = true
      }
      if (this.form.isDesignHospital !== this.oldForm.isDesignHospital) {
        flag = true
      }
      if (this.form.isignExcelusion !== this.oldForm.isignExcelusion) {
        flag = true
      }
      if (this.form.isignWait !== this.oldForm.isignWait) {
        flag = true
      }
      if (this.form.isMedicalHistory !== this.oldForm.isMedicalHistory) {
        flag = true
      }
      if (this.form.isignUseCardRule !== this.oldForm.isignUseCardRule) {
        flag = true
      }

      return flag
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
      this.form.isStricken = null
      this.form.isMust = null
      this.form.isDesignHospital = null
      this.form.isignWait = null
      this.form.isHasMedical = null
      this.form.isUseMedical = null
      this.form.isDentidtry = null
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
      this.form.workingDays = null
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
      this.form.isignUseCardRule = null
      this.form.isignExcelusion = null
      this.form.isRehabiliation = null
    },
    handleClose() {
      this.clearForm()
      this.clearFlag()
    },
    clearFlag() {
      this.dialogVisible = false
      this.show1 = true
      this.show2 = true
      this.show3 = true
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
                this.clearFlag()
              } else {
                this._notify(response.msg, 'error')
              }
            })
          } else {
            if (this.checkOldForm()) {
              this.$confirm('是否初始化理赔数据？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                initVistData(this.form).then(response => {
                  if (response.code === 200) {
                    this._notify(response.msg, 'success')
                    this.clearForm()
                    this.$emit('sonStatus', true)
                    this.clearFlag()
                  } else {
                    this._notify(response.msg, 'error')
                  }
                })
              }).catch(() => {
                edit(this.form).then(response => {
                  if (response.code === 200) {
                    this._notify(response.msg, 'success')
                    this.clearForm()
                    this.$emit('sonStatus', true)
                    this.clearFlag()
                  } else {
                    this._notify(response.msg, 'error')
                  }
                })
              })
            } else {
              edit(this.form).then(response => {
                if (response.code === 200) {
                  this._notify(response.msg, 'success')
                  this.clearForm()
                  this.$emit('sonStatus', true)
                  this.clearFlag()
                } else {
                  this._notify(response.msg, 'error')
                }
              })
            }
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

  .tab-tilte {
    background-color: #99a9bf;
    color: #1f2d3d;
    font-weight:bold;
    display: flex;
    height: 56px;
    align-items: center;
    padding-left: 24px;
  }

  .right-part {
    flex: 1;
    text-align: right;
    padding-right: 20px;
  }

</style>

