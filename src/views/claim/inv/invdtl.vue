<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogInvVisible" width="80%">
    <el-form ref="invdtlForm" :inline="true" :rules="rules" :model="invdtlForm" status-icon label-position="right" label-width="80px">
      <div>
        <ul class="tab-tilte">
          <li>发票信息</li>
          <div class="right-part">
            <i v-if="show1" @click="handlerThe1">折叠</i>
            <i v-else-if="!show1" @click="handlerThe1">展开</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show1">

            <el-form-item label="医院号" prop="hospitalNo" label-width="120px">
              <el-input v-model="invdtlForm.hospitalNo" placeholder="请输入医院号" />
            </el-form-item>

            <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
              <el-input v-model="invdtlForm.hospitalNme" placeholder="请输入医院名称" />
            </el-form-item>

            <el-form-item label="医院科室" prop="hospitalDepart" label-width="120px">
              <el-input v-model="invdtlForm.hospitalDepart" placeholder="请输入医院科室" />
            </el-form-item>

            <el-form-item label="诊断码" prop="diagCde" label-width="120px">
              <el-input v-model="invdtlForm.diagCde" placeholder="请输入诊断码" />
            </el-form-item>

            <el-form-item label="诊断描述" prop="diagDesc" label-width="120px">
              <el-input v-model="invdtlForm.diagDesc" placeholder="请输入诊断描述" />
            </el-form-item>

            <el-form-item label="次诊断码1" prop="secdiagCdeOne" label-width="120px">
              <el-input v-model="invdtlForm.secdiagCdeOne" placeholder="请输入次诊断码1" />
            </el-form-item>

            <el-form-item label="次诊断码2" prop="secdiagCdeTwo" label-width="120px">
              <el-input v-model="invdtlForm.secdiagCdeTwo" placeholder="请输入次诊断码2" />
            </el-form-item>

            <el-form-item label="次诊断描述1" prop="secdiagDescOne" label-width="120px">
              <el-input v-model="invdtlForm.secdiagDescOne" placeholder="请输入次诊断描述1" />
            </el-form-item>

            <el-form-item label="次诊断描述2" prop="secdiagDescTwo" label-width="120px">
              <el-input v-model="invdtlForm.secdiagDescTwo" placeholder="请输入次诊断描述2" />
            </el-form-item>

            <el-form-item label="就诊类型" prop="docTyp" label-width="100px">
              <el-select v-model="invdtlForm.docTyp" placeholder="请选择就诊类型">
                <el-option
                  v-for="item in businessData.ClinicType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票号" prop="invNo" label-width="100px">
              <el-input v-model="invdtlForm.invNo" placeholder="请输入发票号" />
            </el-form-item>

            <el-form-item label="就诊起始日" prop="docBgnTm" label-width="100px">
              <el-date-picker
                v-model="invdtlForm.visitBgnTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="就诊终止日" prop="docEndTm" label-width="100px">
              <el-date-picker
                v-model="invdtlForm.visitEndTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="发票类型" prop="invTyp" label-width="100px">
              <el-select v-model="invdtlForm.invTyp" placeholder="请选择">
                <el-option
                  v-for="item in businessData.CInvoiceTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票地区" prop="invArea" label-width="100px">
              <el-select v-model="invdtlForm.invArea" placeholder="请选择">
                <el-option
                  v-for="item in businessData.InInvoice"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="是否原始发票" prop="isOriginalInv" label-width="100px">
              <el-select v-model="invdtlForm.isOriginalInv" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesorNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="就诊对应发票" prop="isVisInv" label-width="100px">
              <el-select v-model="invdtlForm.isVisInv" placeholder="请选择">
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
                v-model="invdtlForm.accidentTm"
                type="datetime"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              />
            </el-form-item>

            <el-form-item label="账单类型" prop="billtyp" label-width="100px">
              <el-select v-model="invdtlForm.billTyp" placeholder="请选择">
                <el-option
                  v-for="item in businessData.CiRateBillTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="发票总金额" prop="sumAmt" label-width="120px">
              <el-input v-model="invdtlForm.sumAmt" placeholder="请输入发票总金额" @change="changeInvSumAmt(this.invdtlForm.sumAmt)" />
            </el-form-item>

            <el-form-item label="统筹金额" prop="overallAmt" label-width="120px">
              <el-input v-model="invdtlForm.overallAmt" placeholder="请输入统筹金额" />
            </el-form-item>

            <el-form-item label="分类自付" prop="categSelfPay" label-width="120px">
              <el-input v-model="invdtlForm.categSelfPay" placeholder="请输入分类自付" @change="changeCategSelfpayAmt" />
            </el-form-item>

            <el-form-item label="自付" prop="selfPay" label-width="120px">
              <el-input v-model="invdtlForm.selfPay" placeholder="请输入自付" />
            </el-form-item>

            <el-form-item label="自费" prop="selfExpense" label-width="120px">
              <el-input v-model="invdtlForm.selfExpense" placeholder="请输入自费" @change="changSelfAmt" />
            </el-form-item>

            <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
              <el-input v-model="invdtlForm.reasonableAmt" placeholder="请输入可理算金额" />
            </el-form-item>

            <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
              <el-input v-model="invdtlForm.deductAmt" placeholder="请输入扣除金额" />
            </el-form-item>

            <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
              <el-input v-model="invdtlForm.compensateAmt" placeholder="请输入赔付金额" />
            </el-form-item>

            <el-form-item label="当年账户余额" prop="currAcctAmt" label-width="120px">
              <el-input v-model="invdtlForm.currAcctAmt" placeholder="请输入当年账户余额" />
            </el-form-item>

            <el-form-item label="历年账户余额" prop="hisAcctAmt" label-width="120px">
              <el-input v-model="invdtlForm.hisAcctAmt" placeholder="请输入历年账户余额" />
            </el-form-item>

            <el-form-item label="影像序号" prop="imageIndexNo" label-width="120px">
              <el-input v-model="invdtlForm.imageIndexNo" placeholder="请输入影像序号" />
            </el-form-item>

            <el-form-item label="原件影像" prop="orignImage" label-width="120px">
              <el-input v-model="invdtlForm.orignImage" placeholder="请输入原件影像" />
            </el-form-item>

            <el-form-item label="备注" prop="description" label-width="120px">
              <el-input v-model="invdtlForm.description" placeholder="请输入备注" />
            </el-form-item>

            <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
              <el-input v-model="invdtlForm.auditInformation" placeholder="请输入校验审核信息" />
            </el-form-item>

            <el-form-item label="其它社保类型1" prop="otherSecuTypOne" label-width="120px">
              <el-input v-model="invdtlForm.otherSecuTypOne" placeholder="请输入其它社保类型1" />
            </el-form-item>

            <el-form-item label="其它社保金额1" prop="otherSecuAmtOne" label-width="120px">
              <el-input v-model="invdtlForm.otherSecuAmtOne" placeholder="请输入其它社保金额1" />
            </el-form-item>

            <el-form-item label="其它社保类型2" prop="otherSecuTypTwo" label-width="120px">
              <el-input v-model="invdtlForm.otherSecuTypTwo" placeholder="请输入其它社保类型2" />
            </el-form-item>

            <el-form-item label="其它社保金额2" prop="otherSecuAmtTwo" label-width="120px">
              <el-input v-model="invdtlForm.otherSecuAmtTwo" placeholder="请输入其它社保金额2" />
            </el-form-item>

            <el-form-item label="第三方赔付1" prop="thirdCompenOne" label-width="120px">
              <el-select v-model="invdtlForm.thirdCompenOne" placeholder="请选择">
                <!--<el-option
                  v-for="item in businessData.CPubCoverTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />-->
              </el-select>
            </el-form-item>

            <el-form-item label="第三方赔付金额1" prop="thirdCompenamtOne" label-width="120px">
              <el-input v-model="invdtlForm.thirdCompenamtOne" placeholder="请输入第三方赔付金额1" />
            </el-form-item>

            <el-form-item label="第三方赔付2" prop="thirdCompenTwo" label-width="120px">
              <el-select v-model="invdtlForm.thirdCompenTwo" placeholder="请选择">
                <!--<el-option
                  v-for="item in businessData.CPubCoverTyp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />-->
              </el-select>
            </el-form-item>

            <el-form-item label="第三方赔付金额2" prop="thirdCompenamtTwo" label-width="120px">
              <el-input v-model="invdtlForm.thirdCompenamtTwo" placeholder="请输入第三方赔付金额2" />
            </el-form-item>

            <el-form-item label="自付金额" prop="selfAmt" label-width="120px">
              <el-input v-model="invdtlForm.selfAmt" placeholder="请输入自付金额" />
            </el-form-item>

            <el-form-item label="大额支付" prop="largePay" label-width="120px">
              <el-input v-model="invdtlForm.largePay" placeholder="请输入大额支付" />
            </el-form-item>

            <el-form-item label="补充支付" prop="supplePay" label-width="120px">
              <el-input v-model="invdtlForm.supplePay" placeholder="请输入补充支付" />
            </el-form-item>

            <el-form-item label="起付线" prop="deductible" label-width="120px">
              <el-input v-model="invdtlForm.deductible" placeholder="请输入起付线" />
            </el-form-item>

            <el-form-item label="超大额封顶金额" prop="suplargeAmt" label-width="120px">
              <el-input v-model="invdtlForm.suplargeAmt" placeholder="请输入超大额封顶金额" />
            </el-form-item>

            <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
              <el-input v-model="invdtlForm.adjustAmt" placeholder="请输入调整金额" />
            </el-form-item>
            <el-form-item label="赔付结论" prop="compensateResult" label-width="100px">
              <el-select v-model="invdtlForm.compensateResult" placeholder="请选择">
                <el-option
                  v-for="item in businessData.AdjustmentType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="结论描述" prop="conclusionDesc" label-width="100px">
                <el-input v-model="invdtlForm.conclusionDesc" type="textarea" style="width: 800px;" :autosize="{ minRows: 2, maxRows: 20}" placeholder="请输入结论描述" clearable />
              </el-form-item>
            </el-row>
          </div>
        </el-collapse-transition>
      </div>
    </el-form>
    <div align="center">
      <el-button style="margin-left: 10px;" type="primary" @click="save('invdtlForm')">保存</el-button>
    </div>

    <el-form ref="calcForm" :inline="true" :model="calcForm" status-icon label-position="right" label-width="80px">

      <el-form-item label="分类药品" prop="categDrug" label-width="120px">
        <el-input v-model="calcForm.categDrug" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="分类诊疗" prop="categTreat" label-width="120px">
        <el-input v-model="calcForm.categTreat" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="分类合计" prop="dtlCategSelfpayAmt" label-width="120px">
        <el-input v-model="calcForm.dtlCategSelfpayAmt" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="分类自付差值" prop="dtlCategDeduct" :class="{redTip: redCategColor}" label-width="120px">
        <el-input v-model="calcForm.dtlCategDeduct" placeholder="请输入分类自付差值" />
      </el-form-item>

      <el-form-item label="自费药品" prop="selfDrug" label-width="120px">
        <el-input v-model="calcForm.selfDrug" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="自费诊疗" prop="selfTreat" label-width="120px">
        <el-input v-model="calcForm.selfTreat" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="自费合计" prop="dtlSelfAmt" label-width="120px">
        <el-input v-model="calcForm.dtlSelfAmt" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="自费差值" prop="dtlSelfDeduct" :class="{redTip: redSelfColor}" label-width="120px">
        <el-input v-model="calcForm.dtlSelfDeduct" placeholder="请输入分类自付差值" />
      </el-form-item>
      <el-form-item label="总金额差值" prop="dtlSumAmtDeduct" :class="{redTip: redColor}" label-width="120px">
        <el-input v-model="calcForm.dtlSumAmtDeduct" placeholder="请输入总金额差值" />
      </el-form-item>

    </el-form>

    <div align="center">
      <el-button style="margin-left: 10px;" type="primary" @click="batchSave">批量保存</el-button>
      <el-button style="margin-left: 10px;" type="primary" @click="batchDel">批量删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelect"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column align="center" label="序号" width="70">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="诊疗码" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.treatCde">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(scope.$index)" />
          </el-input>
          <match v-model="matchVisable" :index="index" @matchConfirm="matchConfirm" />
        </template>
      </el-table-column>

      <el-table-column align="center" :show-overflow-tooltip="true" label="诊疗描述" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.treatDesc" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="社保类型" width="140">
        <template slot-scope="scope">
          <el-select v-model="scope.row.secuTyp" placeholder="请选择" @change="changeSecuTyp(scope.row)">
            <el-option
              v-for="item in dtlBusinessdata.CSocialinsuTyp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!--  {{ CSocialinsuTyp[scope.row.secuTyp] }}-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="总金额" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sumAmt" @change="changSumAmt(scope.row.sumAmt)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类自付比例" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.categSelfpayRate" :disabled="scope.row.secuTyp!='B'" @change="changeRate(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类自付金额" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.categSelfpayAmt" :disabled="scope.row.secuTyp!='B'" @change="changeCategSelfpayAmt" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="自费金额" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.selfAmt" :disabled="scope.row.secuTyp!='C'" @change="changSelfAmt" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="赔付结论" width="135">
        <template slot-scope="scope">
          <el-select v-model="scope.row.compensateResult" placeholder="请选择">
            <el-option
              v-for="item in businessData.AdjustmentType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope.row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { edit } from '@/api/claim/inv'
import { getList, update, del, batchDel, batchSave } from '@/api/claim/treat'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Match from './match'
export default {
  components: { Pagination, Match },
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonInvData', 'businessData'],
  data() {
    return {
      dialogInvVisible: false,
      dialogTitle: '账单明细信息',
      invdtlForm: {
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
        auditIninvdtlFormation: '',
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
      calcForm: {
        categDrug: null,
        categTreat: null,
        dtlCategSelfpayAmt: null,
        dtlCategDeduct: null,
        selfDrug: null,
        selfTreat: null,
        dtlSelfAmt: null,
        dtlSelfDeduct: null,
        dtlSumAmtDeduct: null
      },
      show1: true,
      show2: true,
      show3: true,
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
      },

      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 100,
        invId: '',
        sort: '+id'
      },
      total: 0,
      CSocialinsuTyp: {},
      AdjustmentType: {},
      selected: [],
      dtlBusinessdata: null,
      matchVisable: false,
      index: null,
      drugArr: ['01', '02', '03'], // 药品大项号
      redColor: false,
      redCategColor: false,
      redSelfColor: false
    }
  },

  watch: {
    'sonInvData': function(newVal, oldVal) {
      this.invdtlForm = newVal
      this.dialogInvVisible = true
      if (newVal.id != null) {
        this.dialogTitle = '账单明细信息'
        this.fetchTypeData()
      }
    }
  },

  created() {

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
    clearCalcForm() {
      this.calcForm.categDrug = null
      this.calcForm.categTreat = null
      this.calcForm.dtlCategSelfpayAmt = null
      this.calcForm.dtlCategDeduct = null
      this.calcForm.selfDrug = null
      this.calcForm.selfTreat = null
      this.calcForm.dtlSelfAmt = null
      this.calcForm.dtlSelfDeduct = null
      this.calcForm.dtlSumAmtDeduct = null
    },
    clearForm() {
      this.invdtlForm.id = null
      this.invdtlForm.visitId = null
      this.invdtlForm.batchNo = null
      this.invdtlForm.customAppNo = null
      this.invdtlForm.plyPartNo = null
      this.invdtlForm.riskNo = null
      this.invdtlForm.hospitalNo = null
      this.invdtlForm.hospitalNme = null
      this.invdtlForm.hospitalDepart = null
      this.invdtlForm.diagCde = null
      this.invdtlForm.diagDesc = null
      this.invdtlForm.secdiagCdeOne = null
      this.invdtlForm.secdiagCdeTwo = null
      this.invdtlForm.secdiagDescOne = null
      this.invdtlForm.secdiagDescTwo = null
      this.invdtlForm.docTyp = null
      this.invdtlForm.docBgnTm = null
      this.invdtlForm.docEndTm = null
      this.invdtlForm.isAccident = null
      this.invdtlForm.isEmergTreat = null
      this.invdtlForm.isLackMaterial = null
      this.invdtlForm.isMedicalHistory = null
      this.invdtlForm.isBirth = null
      this.invdtlForm.isInjuryJob = null
      this.invdtlForm.isStricken = null
      this.invdtlForm.isHasMedical = null
      this.invdtlForm.isUseMedical = null
      this.invdtlForm.invNo = null
      this.invdtlForm.invTyp = null
      this.invdtlForm.invArea = null
      this.invdtlForm.invBgnTm = null
      this.invdtlForm.invEndTm = null
      this.invdtlForm.sumAmt = null
      this.invdtlForm.overallAmt = null
      this.invdtlForm.categSelfPay = null
      this.invdtlForm.selfPay = null
      this.invdtlForm.selfExpense = null
      this.invdtlForm.reasonableAmt = null
      this.invdtlForm.deductAmt = null
      this.invdtlForm.compensateAmt = null
      this.invdtlForm.currAcctAmt = null
      this.invdtlForm.hisAcctAmt = null
      this.invdtlForm.imageIndexNo = null
      this.invdtlForm.orignImage = null
      this.invdtlForm.description = null
      this.invdtlForm.isOriginalInv = null
      this.invdtlForm.isVisInv = null
      this.invdtlForm.auditIninvdtlFormation = null
      this.invdtlForm.accidentTm = null
      this.invdtlForm.cash = null
      this.invdtlForm.billTyp = null
      this.invdtlForm.otherSecuTypOne = null
      this.invdtlForm.otherSecuAmtOne = null
      this.invdtlForm.otherSecuTypTwo = null
      this.invdtlForm.otherSecuAmtTwo = null
      this.invdtlForm.thirdCompenOne = null
      this.invdtlForm.thirdCompenamtOne = null
      this.invdtlForm.thirdCompenTwo = null
      this.invdtlForm.thirdCompenamtTwo = null
      this.invdtlForm.selfAmt = null
      this.invdtlForm.largePay = null
      this.invdtlForm.supplePay = null
      this.invdtlForm.deductible = null
      this.invdtlForm.suplargeAmt = null
      this.invdtlForm.isMust = null
      this.invdtlForm.adjustAmt = null
      this.invdtlForm.adjustInterpCde = null
      this.invdtlForm.interpDesc = null
      this.invdtlForm.endCasetm = null
      this.invdtlForm.conclusionDesc = null
      this.invdtlForm.compensateResult = null
      this.invdtlForm.isDentidtry = null
      this.invdtlForm.isignExcelusion = null
      this.invdtlForm.isignUseCardRule = null
      this.invdtlForm.isignWait = null
      this.invdtlForm.isRehabiliation = null
      this.clearCalcForm()
    },
    handleClose() {
      this.clearForm()
      this.clearFlag()
      this.$emit('sonStatus', true)
    },
    clearFlag() {
      this.dialogInvVisible = false
      this.show1 = true
      this.show2 = true
      this.show3 = true
    },
    save(invdtlForm) {
      this.$refs[invdtlForm].validate((valid) => {
        if (valid) {
          if (this.invdtlForm.id !== null) {
            edit(this.invdtlForm).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
              } else {
                this._notify(response.msg, 'error')
              }
            })
          }
        } else {
          this.$message('error submit!!')
        }
      })
    },
    // ------------------------合计信息js function-------------------------------------------
    /**
     * 校验数字格式
     * @param data
     * @returns {boolean|boolean}
     */
    checkFloat(data) {
      return isNaN(parseFloat(data)) || !/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(data)
    },
    changeInvSumAmt(data) {
      if (data && this.checkFloat(data)) {
        this._notify('你输入正确的数值格式', 'warning')
        return
      }
      var sum = 0.0
      this.list.forEach((val, i) => {
        sum = sum + parseFloat(val.sumAmt)
      })
      var deduct = sum - parseFloat(this.invdtlForm.sumAmt)
      this.calcForm.dtlSumAmtDeduct = deduct.toFixed(2)
      if (parseFloat(this.calcForm.dtlSumAmtDeduct) !== 0.0) {
        this.redColor = true
      } else {
        this.redColor = false
      }
    },

    changSumAmt(data) {
      if (data && this.checkFloat(data)) {
        this._notify('你输入正确的数值格式', 'warning')
        return
      }
      var sum = 0.0
      this.list.forEach((val, i) => {
        sum = sum + parseFloat(val.sumAmt)
        if (val.secuTyp === 'B') {
          val.categSelfpayAmt = (parseFloat(val.sumAmt) * parseFloat(val.categSelfpayRate)).toFixed(2)
        } else if (val.secuTyp === 'C') {
          val.selfAmt = (parseFloat(val.sumAmt) * parseFloat(val.categSelfpayRate)).toFixed(2)
        }
      })
      var deduct = sum - parseFloat(this.invdtlForm.sumAmt)
      this.calcForm.dtlSumAmtDeduct = deduct.toFixed(2)
      if (parseFloat(this.calcForm.dtlSumAmtDeduct) !== 0.0) {
        this.redColor = true
      } else {
        this.redColor = false
      }
      this.changeCategSelfpayAmt()
      this.changSelfAmt()
    },
    changeCategSelfpayAmt() {
      var sum = 0.0
      var categDrug = 0.0 // 分类药品
      var categTreat = 0.0// 分类诊疗
      this.list.forEach((val, i) => {
        if (val.secuTyp === 'B') {
          sum = sum + parseFloat(val.categSelfpayAmt)
          if (this.drugArr.includes(val.maxtermNo)) { // 药品
            categDrug = categDrug + parseFloat(val.categSelfpayAmt)
          } else {
            categTreat = categTreat + parseFloat(val.categSelfpayAmt)
          }
        }
      })
      var deduct = sum - parseFloat(this.invdtlForm.categSelfPay)
      this.calcForm.dtlCategSelfpayAmt = sum.toFixed(2)
      this.calcForm.dtlCategDeduct = deduct.toFixed(2)
      this.calcForm.categDrug = categDrug.toFixed(2)
      this.calcForm.categTreat = categTreat.toFixed(2)

      if (parseFloat(this.calcForm.dtlCategDeduct) !== 0.0) {
        this.redCategColor = true
      } else {
        this.redCategColor = false
      }
    },
    changSelfAmt() {
      var sum = 0.0
      var selfDrug = 0.0
      var selfTreat = 0.0
      this.list.forEach((val, i) => {
        if (val.secuTyp === 'C') {
          sum = sum + parseFloat(val.selfAmt)
          if (this.drugArr.includes(val.maxtermNo)) { // 药品
            selfDrug = selfDrug + parseFloat(val.selfAmt)
          } else {
            selfTreat = selfTreat + parseFloat(val.selfAmt)
          }
        }
      })
      var deduct = sum - parseFloat(this.invdtlForm.selfExpense)
      this.calcForm.dtlSelfAmt = sum.toFixed(2) // 自费合计
      this.calcForm.dtlSelfDeduct = deduct.toFixed(2)// 自费差值
      this.calcForm.selfDrug = selfDrug.toFixed(2)// 自费药品
      this.calcForm.selfTreat = selfTreat.toFixed(2)// 自费诊疗

      if (parseFloat(this.calcForm.dtlSelfDeduct) !== 0.0) {
        this.redSelfColor = true
      } else {
        this.redSelfColor = false
      }
    },
    // -----------------------明细js function----------------------------------------------
    handleSelect(data) {
      this.selected = data
    },
    hanldeMatch(index) {
      this.matchVisable = true
      this.index = index
    },

    matchConfirm(data) {
      this.list[data.index].treatCde = data.value.treatNo
      this.list[data.index].treatDesc = data.value.treatDesc
    },

    changeRate(row) {
      if (this.checkFloat(row.categSelfpayRate)) {
        this._notify('你输入正确的数值格式', 'warning')
        return
      }

      if (!(parseFloat(row.categSelfpayRate) > 0.0 && parseFloat(row.categSelfpayRate) < 1.0)) {
        this._notify('请修改分类自付比例区间(0 , 1)', 'warning')
      }
      row.selfAmt = 0.0
      row.categSelfpayAmt = (parseFloat(row.sumAmt) * parseFloat(row.categSelfpayRate)).toFixed(2)
      this.changeCategSelfpayAmt()
    },
    changeSecuTyp(row) {
      if (row.secuTyp === 'B') {
        if (!(parseFloat(row.categSelfpayRate) > 0.0 && parseFloat(row.categSelfpayRate) < 1.0)) {
          this._notify('请修改分类自付比例区间(0 , 1)', 'warning')
        }
        row.selfAmt = 0.0
        row.categSelfpayAmt = (parseFloat(row.sumAmt) * parseFloat(row.categSelfpayRate)).toFixed(2)
        this.changeCategSelfpayAmt()
        this.changSelfAmt()
      } else if (row.secuTyp === 'C') {
        row.categSelfpayRate = 1.0
        row.categSelfpayAmt = 0.0
        row.selfAmt = (parseFloat(row.sumAmt) * parseFloat(row.categSelfpayRate)).toFixed(2)
        this.changeCategSelfpayAmt()
        this.changSelfAmt()
      } else {
        row.categSelfpayRate = 0.0
        row.selfAmt = 0.0
        row.categSelfpayAmt = 0.0
        this.changeCategSelfpayAmt()
        this.changSelfAmt()
      }
    },

    fetchData() {
      this.listLoading = true
      getList(this.listQuery, this.invdtlForm.id).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.changSumAmt()
        this.listLoading = false
      })
    },

    update(row) {
      update(row).then(response => {
        if (response.code === 200) {
          this._notify(response.msg, 'success')
        } else {
          this._notify(response.msg, 'error')
        }
      })
    },
    batchSave() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.$confirm('是否批量保存数据？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchSave(this.selected).then(res => {
            if (res.code === 200) {
              this._notify('保存成功', 'success')
            } else {
              this._notify(res.msg, 'error')
            }
            this.fetchData()
          })
        }).catch(() => {
          this._notify('已取消', 'info')
        })
      }
    },
    batchDel() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.$confirm('是否删除数据？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDel(this.selected).then(res => {
            if (res.code === 200) {
              this._notify('删除成功', 'success')
            } else {
              this._notify(res.msg, 'error')
            }
            this.fetchData()
          })
        }).catch(() => {
          this._notify('已取消', 'info')
        })
      }
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CSocialinsuTyp', 'AdjustmentType'] }).then(res => {
        // 组装table 的map
        this.dtlBusinessdata = res.data
        for (const key in res.data) {
          this.dtlBusinessdata[key].forEach(item => {
            !this[key] && (this[key] = {})
            this[key][item.value] = item.label
          })
        }
        this.fetchData()
      })
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
          this.fetchData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    }

  }
}
</script>

<style lang="css" scoped>

  .el-form >>> .redTip .el-input__inner {
    color: red
  }

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

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
