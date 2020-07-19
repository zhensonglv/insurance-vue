<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="客户申请号" prop="customAppNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="出险人号" prop="riskNo" label-width="120px">
        <el-input v-model="form.riskNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="医院号" prop="hospitalNo" label-width="120px">
        <el-input v-model="form.hospitalNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
        <el-input v-model="form.hospitalNme" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="医院科室" prop="hospitalDepart" label-width="120px">
        <el-input v-model="form.hospitalDepart" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="诊断码" prop="diagCde" label-width="120px">
        <el-input v-model="form.diagCde" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="诊断描述" prop="diagDesc" label-width="120px">
        <el-input v-model="form.diagDesc" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="次诊断码1" prop="secdiagCdeOne" label-width="120px">
        <el-input v-model="form.secdiagCdeOne" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="次诊断码2" prop="secdiagCdeTwo" label-width="120px">
        <el-input v-model="form.secdiagCdeTwo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="次诊断描述1" prop="secdiagDescOne" label-width="120px">
        <el-input v-model="form.secdiagDescOne" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="次诊断描述2" prop="secdiagDescTwo" label-width="120px">
        <el-input v-model="form.secdiagDescTwo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="就诊类型" prop="docTyp" label-width="120px">
        <el-select v-model="form.docTyp" placeholder="请选择提交对象">
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

      <el-form-item label="意外" prop="isAccident" label-width="120px">
        <el-select v-model="form.isAccident" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="急诊" prop="isEmergTreat" label-width="120px">
        <el-select v-model="form.isEmergTreat" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="缺材料" prop="isLackMaterial" label-width="120px">
        <el-select v-model="form.isLackMaterial" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="既往病史" prop="isMedicalHistory" label-width="120px">
        <el-select v-model="form.isMedicalHistory" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="生育" prop="isBirth" label-width="120px">
        <el-select v-model="form.isBirth" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="工伤" prop="isInjuryJob" label-width="120px">
        <el-select v-model="form.isInjuryJob" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="重疾" prop="stricken" label-width="120px">
        <el-select v-model="form.stricken" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否医保投保" prop="isHasMedical" label-width="120px">
        <el-select v-model="form.isHasMedical" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否使用医保卡" prop="isUseMedical" label-width="120px">
        <el-select v-model="form.isUseMedical" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="发票号" prop="invNo" label-width="120px">
        <el-input v-model="form.invNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="客户发票号" prop="customInvNo" label-width="120px">
        <el-input v-model="form.customInvNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="发票类型" prop="invTyp" label-width="120px">
        <el-select v-model="form.invTyp" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="发票地区" prop="invArea" label-width="120px">
        <el-select v-model="form.invArea" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="发票起始日" prop="invBgnTm" label-width="120px">
        <el-date-picker
          v-model="form.invBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="发票终止日" prop="invEndTm" label-width="120px">
        <el-date-picker
          v-model="form.invEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="发票总金额" prop="sumAmt" label-width="120px">
        <el-input v-model="form.sumAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="统筹金额" prop="overallAmt" label-width="120px">
        <el-input v-model="form.overallAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分类自付" prop="categSelfpay" label-width="120px">
        <el-input v-model="form.categSelfpay" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="自付" prop="selfPay" label-width="120px">
        <el-input v-model="form.selfPay" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="自费" prop="selfExpense" label-width="120px">
        <el-input v-model="form.selfExpense" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
        <el-input v-model="form.reasonableAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="当年账户余额" prop="currAcctAmt" label-width="120px">
        <el-input v-model="form.currAcctAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="历年账户余额" prop="hisAcctAmt" label-width="120px">
        <el-input v-model="form.hisAcctAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="影像序号" prop="imageIndexNo" label-width="120px">
        <el-input v-model="form.imageIndexNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="原件影像" prop="orignImage" label-width="120px">
        <el-input v-model="form.orignImage" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="form.description" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="结论描述" prop="conclusionDesc" label-width="120px">
        <el-input v-model="form.conclusionDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="是否原始发票" prop="isOriginalInv" label-width="120px">
        <el-select v-model="form.isOriginalInv" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否就诊信息对应发票" prop="isVisInv" label-width="120px">
        <el-select v-model="form.isVisInv" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
        <el-input v-model="form.auditInformation" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="事故日期" prop="accidentTm" label-width="120px">
        <el-date-picker
          v-model="form.accidentTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="现金" prop="cash" label-width="120px">
        <el-input v-model="form.cash" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="账单类型" prop="billtyp" label-width="120px">
        <el-select v-model="form.billtyp" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="其它社保类型1" prop="otherSecuTypOne" label-width="120px">
        <el-input v-model="form.otherSecuTypOne" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="其它社保金额1" prop="otherSecuAmtOne" label-width="120px">
        <el-input v-model="form.otherSecuAmtOne" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="其它社保类型2" prop="otherSecuTypTwo" label-width="120px">
        <el-input v-model="form.otherSecuTypTwo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="其它社保金额2" prop="otherSecuAmtTwo" label-width="120px">
        <el-input v-model="form.otherSecuAmtTwo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="第三方赔付1" prop="thirdCompenOne" label-width="120px">
        <el-select v-model="form.thirdCompenOne" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="第三方赔付金额1" prop="thirdCompenamtOne" label-width="120px">
        <el-input v-model="form.thirdCompenamtOne" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="第三方赔付2" prop="thirdCompenTwo" label-width="120px">
        <el-select v-model="form.thirdCompenTwo" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="第三方赔付金额2" prop="thirdCompenamtTwo" label-width="120px">
        <el-input v-model="form.thirdCompenamtTwo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="自付金额" prop="selfAmt" label-width="120px">
        <el-input v-model="form.selfAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="自付金额1" prop="selfAmtOne" label-width="120px">
        <el-input v-model="form.selfAmtOne" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="自付金额2" prop="selfAmtTwo" label-width="120px">
        <el-input v-model="form.selfAmtTwo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="大额支付" prop="largePay" label-width="120px">
        <el-input v-model="form.largePay" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="补充支付" prop="supplePay" label-width="120px">
        <el-input v-model="form.supplePay" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="起付线" prop="deductible" label-width="120px">
        <el-input v-model="form.deductible" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="超大额封顶金额" prop="suplargeAmt" label-width="120px">
        <el-input v-model="form.suplargeAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="社保赔付" prop="socialCompen" label-width="120px">
        <el-input v-model="form.socialCompen" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="发票明细" prop="invDtl" label-width="120px">
        <el-select v-model="form.invDtl" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="忽略医保卡使用规则" prop="ingMedinsureance" label-width="120px">
        <el-select v-model="form.ingMedinsureance" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否特需" prop="isMust" label-width="120px">
        <el-select v-model="form.isMust" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="公共保额给付金额" prop="commonPrestaAmt" label-width="120px">
        <el-input v-model="form.commonPrestaAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
        <el-input v-model="form.adjustAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="form.adjustInterpCde" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="form.interpDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="产品号" prop="prodNo" label-width="120px">
        <el-input v-model="form.prodNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="产品名称" prop="prodNme" label-width="120px">
        <el-input v-model="form.prodNme" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="责任号" prop="responseNo" label-width="120px">
        <el-input v-model="form.responseNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="责任描述" prop="responseDesc" label-width="120px">
        <el-input v-model="form.responseDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="产品类型" prop="prodtyp" label-width="120px">
        <el-input v-model="form.prodtyp" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="结案日" prop="endCasetm" label-width="120px">
        <el-date-picker
          v-model="form.endCasetm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="就诊层id" prop="visitId" label-width="120px">
        <el-input v-model="form.visitId" placeholder="请输入批次号" />
      </el-form-item>

      <!--<el-form-item label="赔付结论" prop="conclusionDesc" label-width="120px">
        <el-date-picker
          v-model="form.conclusionDesc"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>-->

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
import { save, edit } from '@/api/claim/inv'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData'/*, 'businessData'*/],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        visitId: '',
        batchNo: '',
        customAppNo: '',
        plyPartNo: '',
        riskNo: '',
        hospitalNo: '',
        hospitalNme: '',
        hospitalDepart: '',
        diagCde: '',
        diagDesc: '',
        secdiagCdeOne: '',
        secdiagCdeTwo: '',
        secdiagDescOne: '',
        secdiagDescTwo: '',
        docTyp: '',
        docBgnTm: '',
        docEndTm: '',
        isAccident: '',
        isEmergTreat: '',
        isLackMaterial: '',
        isMedicalHistory: '',
        isBirth: '',
        isInjuryJob: '',
        stricken: '',
        isHasMedical: '',
        isUseMedical: '',
        invNo: '',
        customInvNo: '',
        invTyp: '',
        invArea: '',
        invBgnTm: '',
        invEndTm: '',
        sumAmt: '',
        overallAmt: '',
        categSelfpay: '',
        selfPay: '',
        selfExpense: '',
        reasonableAmt: '',
        deductAmt: '',
        compensateAmt: '',
        currAcctAmt: '',
        hisAcctAmt: '',
        imageIndexNo: '',
        orignImage: '',
        description: '',
        // conclusionDesc: '',
        isOriginalInv: '',
        isVisInv: '',
        auditInformation: '',
        accidentTm: '',
        cash: '',
        billtyp: '',
        otherSecuTypOne: '',
        otherSecuAmtOne: '',
        otherSecuTypTwo: '',
        otherSecuAmtTwo: '',
        thirdCompenOne: '',
        thirdCompenamtOne: '',
        thirdCompenTwo: '',
        thirdCompenamtTwo: '',
        selfAmt: '',
        selfAmtOne: '',
        selfAmtTwo: '',
        largePay: '',
        supplePay: '',
        deductible: '',
        suplargeAmt: '',
        socialCompen: '',
        invDtl: '',
        ingMedinsureance: '',
        isMust: '',
        commonPrestaAmt: '',
        adjustAmt: '',
        adjustInterpCde: '',
        interpDesc: '',
        prodNo: '',
        prodNme: '',
        responseNo: '',
        responseDesc: '',
        prodtyp: '',
        endCasetm: '',
        conclusionDesc: ''
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
      this.form.visitId = null
      this.form.batchNo = null
      this.form.customAppNo = null
      this.form.plyPartNo = null
      this.form.riskNo = null
      this.form.hospitalNo = null
      this.form.hospitalNme = null
      this.form.hospitalDepart = null
      this.form.diagCde = null
      this.form.diagDesc = null
      this.form.secdiagCdeOne = null
      this.form.secdiagCdeTwo = null
      this.form.secdiagDescOne = null
      this.form.secdiagDescTwo = null
      this.form.docTyp = null
      this.form.docBgnTm = null
      this.form.docEndTm = null
      this.form.isAccident = null
      this.form.isEmergTreat = null
      this.form.isLackMaterial = null
      this.form.isMedicalHistory = null
      this.form.isBirth = null
      this.form.isInjuryJob = null
      this.form.stricken = null
      this.form.isHasMedical = null
      this.form.isUseMedical = null
      this.form.invNo = null
      this.form.customInvNo = null
      this.form.invTyp = null
      this.form.invArea = null
      this.form.invBgnTm = null
      this.form.invEndTm = null
      this.form.sumAmt = null
      this.form.overallAmt = null
      this.form.categSelfpay = null
      this.form.selfPay = null
      this.form.selfExpense = null
      this.form.reasonableAmt = null
      this.form.deductAmt = null
      this.form.compensateAmt = null
      this.form.currAcctAmt = null
      this.form.hisAcctAmt = null
      this.form.imageIndexNo = null
      this.form.orignImage = null
      this.form.description = null
      // this.form.conclusionDesc = null
      this.form.isOriginalInv = null
      this.form.isVisInv = null
      this.form.auditInformation = null
      this.form.accidentTm = null
      this.form.cash = null
      this.form.billtyp = null
      this.form.otherSecuTypOne = null
      this.form.otherSecuAmtOne = null
      this.form.otherSecuTypTwo = null
      this.form.otherSecuAmtTwo = null
      this.form.thirdCompenOne = null
      this.form.thirdCompenamtOne = null
      this.form.thirdCompenTwo = null
      this.form.thirdCompenamtTwo = null
      this.form.selfAmt = null
      this.form.selfAmtOne = null
      this.form.selfAmtTwo = null
      this.form.largePay = null
      this.form.supplePay = null
      this.form.deductible = null
      this.form.suplargeAmt = null
      this.form.socialCompen = null
      this.form.invDtl = null
      this.form.ingMedinsureance = null
      this.form.isMust = null
      this.form.commonPrestaAmt = null
      this.form.adjustAmt = null
      this.form.adjustInterpCde = null
      this.form.interpDesc = null
      this.form.prodNo = null
      this.form.prodNme = null
      this.form.responseNo = null
      this.form.responseDesc = null
      this.form.prodtyp = null
      this.form.endCasetm = null
      this.form.conclusionDesc = null
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

