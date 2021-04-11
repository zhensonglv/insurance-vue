<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <div>
        <ul class="tab-tilte">
          <li>发票信息</li>
          <div class="right-part">
            <i @click="handlerThe1">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show1">
            <el-form-item label="批次号" prop="batchNo" label-width="120px">
              <el-input v-model="form.batchNo" placeholder="请输入批次号" />
            </el-form-item>

            <el-form-item label="客户申请号" prop="customAppNo" label-width="120px">
              <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
            </el-form-item>

            <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
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

            <el-form-item label="诊断码" prop="diagCde" label-width="120px">
              <el-input v-model="form.diagCde" placeholder="请输入诊断码" />
            </el-form-item>

            <el-form-item label="诊断描述" prop="diagDesc" label-width="120px">
              <el-input v-model="form.diagDesc" placeholder="请输入诊断描述" />
            </el-form-item>

            <el-form-item label="次诊断码1" prop="secdiagCdeOne" label-width="120px">
              <el-input v-model="form.secdiagCdeOne" placeholder="请输入次诊断码1" />
            </el-form-item>

            <el-form-item label="次诊断码2" prop="secdiagCdeTwo" label-width="120px">
              <el-input v-model="form.secdiagCdeTwo" placeholder="请输入次诊断码2" />
            </el-form-item>

            <el-form-item label="次诊断描述1" prop="secdiagDescOne" label-width="120px">
              <el-input v-model="form.secdiagDescOne" placeholder="请输入次诊断描述1" />
            </el-form-item>

            <el-form-item label="次诊断描述2" prop="secdiagDescTwo" label-width="120px">
              <el-input v-model="form.secdiagDescTwo" placeholder="请输入次诊断描述2" />
            </el-form-item>

            <el-form-item label="就诊类型" prop="docTyp" label-width="100px">
              <el-select v-model="form.docTyp" placeholder="请选择就诊类型">
                <el-option
                  v-for="item in businessData.ClinicType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票号" prop="invNo" label-width="100px">
              <el-input v-model="form.invNo" placeholder="请输入发票号" />
            </el-form-item>

            <el-form-item label="就诊起始日" prop="docBgnTm" label-width="100px">
              <el-date-picker
                v-model="form.visitBgnTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="就诊终止日" prop="docEndTm" label-width="100px">
              <el-date-picker
                v-model="form.visitEndTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="发票类型" prop="invTyp" label-width="100px">
              <el-select v-model="form.invTyp" placeholder="请选择">
                <el-option
                  v-for="item in businessData.CInvoiceTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票地区" prop="invArea" label-width="100px">
              <el-select v-model="form.invArea" placeholder="请选择">
                <el-option
                  v-for="item in businessData.InInvoice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票起始日" prop="invBgnTm" label-width="100px">
              <el-date-picker
                v-model="form.invBgnTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="发票终止日" prop="invEndTm" label-width="100px">
              <el-date-picker
                v-model="form.invEndTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>
            <el-form-item label="是否原始发票" prop="isOriginalInv" label-width="100px">
              <el-select v-model="form.isOriginalInv" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesorNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="就诊对应发票" prop="isVisInv" label-width="100px">
              <el-select v-model="form.isVisInv" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="事故日期" prop="accidentTm" label-width="100px">
              <el-date-picker
                v-model="form.accidentTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="现金" prop="cash" label-width="100px">
              <el-input v-model="form.cash" placeholder="请输入现金" />
            </el-form-item>

            <el-form-item label="账单类型" prop="billtyp" label-width="100px">
              <el-select v-model="form.billTyp" placeholder="请选择">
                <el-option
                  v-for="item in businessData.CiRateBillTyp"
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
          <li>案件属性</li>
          <div class="right-part">
            <i @click="handlerThe2">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show2">
            <el-form-item label="意外" prop="isAccident" label-width="100px">
              <el-select v-model="form.isAccident" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="生育" prop="isBirth" label-width="100px">
              <el-select v-model="form.isBirth" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="齿科" prop="isDentidtry" label-width="100px">
              <el-select v-model="form.isDentidtry" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="工伤" prop="isInjuryJob" label-width="100px">
              <el-select v-model="form.isInjuryJob" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="重疾" prop="isStricken" label-width="100px">
              <el-select v-model="form.isStricken" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="医保投保" prop="isHasMedical" label-width="100px">
              <el-select v-model="form.isHasMedical" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="使用医保卡" prop="isUseMedical" label-width="100px">
              <el-select v-model="form.isUseMedical" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="是否特需" prop="isMust" label-width="100px">
              <el-select v-model="form.isMust" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.YesorNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="急诊" prop="isEmergTreat" label-width="100px">
              <el-select v-model="form.isEmergTreat" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="康复" prop="isRehabiliation" label-width="100px">
              <el-select v-model="form.isRehabiliation" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.YesorNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="缺材料" prop="isLackMaterial" label-width="100px">
              <el-select v-model="form.isLackMaterial" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="指定医院" prop="isDesignHospital" label-width="100px">
              <el-select v-model="form.isDesignHospital" placeholder="请选择指定医院" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="既往病史" prop="isMedicalHistory" label-width="100px">
              <el-select v-model="form.isMedicalHistory" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略等待期" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignWait" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="忽略除外责任" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignExcelusion" placeholder="请选择" clearable>
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略医保卡使用规则" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignUseCardRule" placeholder="请选择" clearable>
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
          <li>赔付信息</li>
          <div class="right-part">
            <i @click="handlerThe3">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show3">
            <el-form-item label="发票总金额" prop="sumAmt" label-width="120px">
              <el-input v-model="form.sumAmt" placeholder="请输入发票总金额" />
            </el-form-item>

            <el-form-item label="统筹金额" prop="overallAmt" label-width="120px">
              <el-input v-model="form.overallAmt" placeholder="请输入统筹金额" />
            </el-form-item>

            <el-form-item label="分类自付" prop="categSelfPay" label-width="120px">
              <el-input v-model="form.categSelfPay" placeholder="请输入分类自付" />
            </el-form-item>

            <el-form-item label="自付" prop="selfPay" label-width="120px">
              <el-input v-model="form.selfPay" placeholder="请输入自付" />
            </el-form-item>

            <el-form-item label="自费" prop="selfExpense" label-width="120px">
              <el-input v-model="form.selfExpense" placeholder="请输入自费" />
            </el-form-item>

            <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
              <el-input v-model="form.reasonableAmt" placeholder="请输入可理算金额" />
            </el-form-item>

            <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
              <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
            </el-form-item>

            <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
              <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
            </el-form-item>

            <el-form-item label="当年账户余额" prop="currAcctAmt" label-width="120px">
              <el-input v-model="form.currAcctAmt" placeholder="请输入当年账户余额" />
            </el-form-item>

            <el-form-item label="历年账户余额" prop="hisAcctAmt" label-width="120px">
              <el-input v-model="form.hisAcctAmt" placeholder="请输入历年账户余额" />
            </el-form-item>

            <el-form-item label="影像序号" prop="imageIndexNo" label-width="120px">
              <el-input v-model="form.imageIndexNo" placeholder="请输入影像序号" />
            </el-form-item>

            <el-form-item label="原件影像" prop="orignImage" label-width="120px">
              <el-input v-model="form.orignImage" placeholder="请输入原件影像" />
            </el-form-item>

            <el-form-item label="备注" prop="description" label-width="120px">
              <el-input v-model="form.description" placeholder="请输入备注" />
            </el-form-item>

            <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
              <el-input v-model="form.auditInformation" placeholder="请输入校验审核信息" />
            </el-form-item>

            <el-form-item label="其它社保类型1" prop="otherSecuTypOne" label-width="120px">
              <el-input v-model="form.otherSecuTypOne" placeholder="请输入其它社保类型1" />
            </el-form-item>

            <el-form-item label="其它社保金额1" prop="otherSecuAmtOne" label-width="120px">
              <el-input v-model="form.otherSecuAmtOne" placeholder="请输入其它社保金额1" />
            </el-form-item>

            <el-form-item label="其它社保类型2" prop="otherSecuTypTwo" label-width="120px">
              <el-input v-model="form.otherSecuTypTwo" placeholder="请输入其它社保类型2" />
            </el-form-item>

            <el-form-item label="其它社保金额2" prop="otherSecuAmtTwo" label-width="120px">
              <el-input v-model="form.otherSecuAmtTwo" placeholder="请输入其它社保金额2" />
            </el-form-item>

            <el-form-item label="第三方赔付1" prop="thirdCompenOne" label-width="120px">
              <el-select v-model="form.thirdCompenOne" placeholder="请选择">
                <!--<el-option
                  v-for="item in businessData.CPubCoverTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />-->
              </el-select>
            </el-form-item>

            <el-form-item label="第三方赔付金额1" prop="thirdCompenamtOne" label-width="120px">
              <el-input v-model="form.thirdCompenamtOne" placeholder="请输入第三方赔付金额1" />
            </el-form-item>

            <el-form-item label="第三方赔付2" prop="thirdCompenTwo" label-width="120px">
              <el-select v-model="form.thirdCompenTwo" placeholder="请选择">
                <!--<el-option
                  v-for="item in businessData.CPubCoverTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />-->
              </el-select>
            </el-form-item>

            <el-form-item label="第三方赔付金额2" prop="thirdCompenamtTwo" label-width="120px">
              <el-input v-model="form.thirdCompenamtTwo" placeholder="请输入第三方赔付金额2" />
            </el-form-item>

            <el-form-item label="自付金额" prop="selfAmt" label-width="120px">
              <el-input v-model="form.selfAmt" placeholder="请输入自付金额" />
            </el-form-item>

            <el-form-item label="大额支付" prop="largePay" label-width="120px">
              <el-input v-model="form.largePay" placeholder="请输入大额支付" />
            </el-form-item>

            <el-form-item label="补充支付" prop="supplePay" label-width="120px">
              <el-input v-model="form.supplePay" placeholder="请输入补充支付" />
            </el-form-item>

            <el-form-item label="起付线" prop="deductible" label-width="120px">
              <el-input v-model="form.deductible" placeholder="请输入起付线" />
            </el-form-item>

            <el-form-item label="超大额封顶金额" prop="suplargeAmt" label-width="120px">
              <el-input v-model="form.suplargeAmt" placeholder="请输入超大额封顶金额" />
            </el-form-item>

            <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
              <el-input v-model="form.adjustAmt" placeholder="请输入调整金额" />
            </el-form-item>

            <el-form-item label="解释码" prop="adjustInterpCde" label-width="120px">
              <el-input v-model="form.adjustInterpCde" placeholder="请输入解释码" />
            </el-form-item>

            <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
              <el-input v-model="form.interpDesc" placeholder="请输入解释码描述" />
            </el-form-item>

            <el-form-item label="结案日" prop="endCasetm" label-width="100px">
              <el-date-picker
                v-model="form.endCasetm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="赔付结论" prop="compensateResult" label-width="100px">
              <el-select v-model="form.compensateResult" placeholder="请选择">
                <el-option
                  v-for="item in businessData.AdjustmentType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <!--        <el-form-item label="就诊层id" prop="visitId" label-width="100px">
              <el-input v-model="form.visitId" placeholder="请输入就诊层id" />
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
import { initData, save, edit } from '@/api/claim/inv'

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
        isStricken: '',
        isHasMedical: '',
        isUseMedical: '',
        invNo: '',
        invTyp: '',
        invArea: '',
        invBgnTm: '',
        invEndTm: '',
        sumAmt: '',
        overallAmt: '',
        categSelfPay: '',
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
        isOriginalInv: '',
        isVisInv: '',
        auditInformation: '',
        accidentTm: '',
        cash: '',
        billTyp: '',
        otherSecuTypOne: '',
        otherSecuAmtOne: '',
        otherSecuTypTwo: '',
        otherSecuAmtTwo: '',
        thirdCompenOne: '',
        thirdCompenamtOne: '',
        thirdCompenTwo: '',
        thirdCompenamtTwo: '',
        selfAmt: '',
        largePay: '',
        supplePay: '',
        deductible: '',
        suplargeAmt: '',
        isMust: '',
        adjustAmt: '',
        adjustInterpCde: '',
        interpDesc: '',
        endCasetm: '',
        conclusionDesc: '',
        compensateResult: '',
        isDentidtry: '',
        isignUseCardRule: '',
        isignExcelusion: '',
        isignWait: '',
        isRehabiliation: ''
      },
      show1: true,
      show2: true,
      show3: true,
      checkOrignal: false,
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
      this.form.isStricken = null
      this.form.isHasMedical = null
      this.form.isUseMedical = null
      this.form.invNo = null
      this.form.invTyp = null
      this.form.invArea = null
      this.form.invBgnTm = null
      this.form.invEndTm = null
      this.form.sumAmt = null
      this.form.overallAmt = null
      this.form.categSelfPay = null
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
      this.form.isOriginalInv = null
      this.form.isVisInv = null
      this.form.auditInformation = null
      this.form.accidentTm = null
      this.form.cash = null
      this.form.billTyp = null
      this.form.otherSecuTypOne = null
      this.form.otherSecuAmtOne = null
      this.form.otherSecuTypTwo = null
      this.form.otherSecuAmtTwo = null
      this.form.thirdCompenOne = null
      this.form.thirdCompenamtOne = null
      this.form.thirdCompenTwo = null
      this.form.thirdCompenamtTwo = null
      this.form.selfAmt = null
      this.form.largePay = null
      this.form.supplePay = null
      this.form.deductible = null
      this.form.suplargeAmt = null
      this.form.isMust = null
      this.form.adjustAmt = null
      this.form.adjustInterpCde = null
      this.form.interpDesc = null
      this.form.endCasetm = null
      this.form.conclusionDesc = null
      this.form.compensateResult = null
      this.form.isDentidtry = null
      this.form.isignExcelusion = null
      this.form.isignUseCardRule = null
      this.form.isignWait = null
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
      this.checkOrignal = false
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

      this.oldForm.overallAmt = newVal.overallAmt// 社保支付
      this.oldForm.thirdCompenOne = newVal.thirdCompenOne// 原始第三方支付金额
    },
    checkOldForm() {
      var flag = false
      if (this.form.isAccident !== this.oldForm.isAccident) {
        flag = true
        this.checkOrignal = true
      }
      if (this.form.isDentidtry !== this.oldForm.isDentidtry) {
        flag = true
        this.checkOrignal = true
      }
      if (this.form.isBirth !== this.oldForm.isBirth) {
        flag = true
        this.checkOrignal = true
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
      if (this.form.overallAmt !== this.oldForm.overallAmt) {
        flag = true
        this.checkOrignal = true
      }
      if (this.form.thirdCompenOne !== this.oldForm.thirdCompenOne) {
        flag = true
        this.checkOrignal = true
      }
      return flag
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
              if (this.checkOrignal && this.form.isOriginalInv !== 'Y') {
                this._notify('非原始发票', 'error')
                return
              }
              this.$confirm('是否初始化理赔数据？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                initData(this.form).then(response => {
                  if (response.code === 200) {
                    this._notify(response.msg, 'success')
                    this.clearForm()
                    this.$emit('sonStatus', false)
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

