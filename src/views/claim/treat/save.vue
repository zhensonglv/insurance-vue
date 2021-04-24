<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="客户申请号" prop="customAppNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="发票号" prop="invNo" label-width="120px">
        <el-input v-model="form.invNo" placeholder="请输入发票号" />
      </el-form-item>

      <el-form-item label="诊断码" prop="diagCde" label-width="120px">
        <el-input v-model="form.diagCde" placeholder="请输入诊断码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeDiag" />
        </el-input>
      </el-form-item>
      <diag v-model="diagVisable" :inv-id="invId" @matchConfirmDiag="matchConfirmDiag" />

      <el-form-item label="诊断描述" prop="diagDesc" label-width="120px">
        <el-input v-model="form.diagDesc" placeholder="请输入诊断码" />
      </el-form-item>

      <el-form-item label="起始诊疗日" prop="treatBgnTm" label-width="120px">
        <el-date-picker
          v-model="form.treatBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="终止诊疗日" prop="treatEndTm" label-width="120px">
        <el-date-picker
          v-model="form.treatEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="服务类型" prop="serviceTyp" label-width="120px">
        <el-input v-model="form.serviceTyp" placeholder="请输入服务类型" />
      </el-form-item>

      <el-form-item label="总金额" prop="sumAmt" label-width="120px">
        <el-input v-model="form.sumAmt" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="既往病史" prop="isMedicalHistory" label-width="120px">
        <el-select v-model="form.isMedicalHistory" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="社保类型" prop="secuTyp" label-width="120px">
        <el-select v-model="form.secuTyp" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CSocialinsuTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="分类自付百分比" prop="categSelfpayRate" label-width="120px">
        <el-input v-model="form.categSelfpayRate" placeholder="请输入分类自付百分比" />
      </el-form-item>

      <el-form-item label="分类自付金额" prop="categSelfpayAmt" label-width="120px">
        <el-input v-model="form.categSelfpayAmt" placeholder="请输入分类自付金额" />
      </el-form-item>

      <el-form-item label="自费金额" prop="selfAmt" label-width="120px">
        <el-input v-model="form.selfAmt" placeholder="请输入自费金额" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
      </el-form-item>

      <el-form-item label="其它社保类型1" prop="otherSecuTypOne" label-width="120px">
        <el-select v-model="form.otherSecuTypOne" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.OtherCSocialinsuTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="其它社保金额1" prop="otherSecuAmtOne" label-width="120px">
        <el-input v-model="form.otherSecuAmtOne" placeholder="请输入其它社保金额1" />
      </el-form-item>

      <el-form-item label="其它社保类型2" prop="otherSecuTypTwo" label-width="120px">
        <el-select v-model="form.otherSecuTypTwo" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.OtherCSocialinsuTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="其它社保金额2" prop="otherSecuAmtTwo" label-width="120px">
        <el-input v-model="form.otherSecuAmtTwo" placeholder="请输入其它社保金额2" />
      </el-form-item>

      <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
        <el-input v-model="form.reasonableAmt" placeholder="请输入可理算金额" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
      </el-form-item>

      <el-form-item label="基金赔付金额" prop="fundCompenAmt" label-width="120px">
        <el-input v-model="form.fundCompenAmt" placeholder="请输入基金赔付金额" />
      </el-form-item>

      <el-form-item label="最终赔付" prop="finalPay" label-width="120px">
        <el-input v-model="form.finalPay" placeholder="请输入最终赔付" />
      </el-form-item>

      <el-form-item label="调整解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="form.adjustInterpCde" placeholder="请选择调整解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="form.interpDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="form.description" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="费用名称" prop="payName" label-width="120px">
        <el-input v-model="form.payName" placeholder="请输入费用名称" />
      </el-form-item>

      <el-form-item label="剂型" prop="drug" label-width="120px">
        <el-input v-model="form.drug" placeholder="请输入剂型" />
      </el-form-item>

      <el-form-item label="数量" prop="num" label-width="120px">
        <el-input v-model="form.num" placeholder="请输入数量" />
      </el-form-item>

      <el-form-item label="诊疗码" prop="treatCde" label-width="120px">
        <el-input v-model="form.treatCde" placeholder="请选择诊疗码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="诊疗描述" prop="treatDesc" label-width="120px">
        <el-input v-model="form.treatDesc" placeholder="请输入诊疗描述" />
      </el-form-item>

      <el-form-item label="大型号" prop="maxtermNo" label-width="120px">
        <el-input v-model="form.maxtermNo" placeholder="请输入大型号" />
      </el-form-item>

      <el-form-item label="赔付结论" prop="compensateResult" label-width="120px">
        <el-select v-model="form.compensateResult" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.AdjustmentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="单位" prop="company" label-width="120px">
        <el-input v-model="form.company" placeholder="请输入单位" />
      </el-form-item>

      <el-form-item label="结论描述" prop="conclusionDesc" label-width="120px">
        <el-input v-model="form.conclusionDesc" placeholder="请输入结论描述" />
      </el-form-item>

      <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
        <el-input v-model="form.auditInformation" placeholder="请输入校验审核信息" />
      </el-form-item>
      <!--      <el-form-item label="账单层id" prop="invId" label-width="120px">
        <el-input v-model="form.invId" placeholder="请输入账单层id" />
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
import { save, edit } from '@/api/claim/treat'
import Match from './match'
import Diag from './diag'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  components: {
    Match, Diag
  },
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        invId: '',
        batchNo: '',
        plyPartNo: '',
        customAppNo: '',
        invNo: '',
        treatBgnTm: '',
        treatEndTm: '',
        diagCde: '',
        diagDesc: '',
        treatDesc: '',
        serviceTyp: '',
        sumAmt: '',
        isMedicalHistory: '',
        secuTyp: '',
        categSelfpayRate: '',
        categSelfpayAmt: '',
        compensateAmt: '',
        otherSecuTypOne: '',
        otherSecuAmtOne: '',
        otherSecuTypTwo: '',
        otherSecuAmtTwo: '',
        reasonableAmt: '',
        deductAmt: '',
        fundCompenAmt: '',
        finalPay: '',
        adjustInterpCde: '',
        interpDesc: '',
        description: '',
        payName: '',
        drug: '',
        num: '',
        treatCde: '',
        maxtermNo: '',
        compensateResult: '',
        company: '',
        conclusionDesc: '',
        auditInformation: '',
        selfAmt: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
      },
      invId: null,
      diagVisable: false
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.invId = newVal.invId
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
      this.form.invId = null
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.customAppNo = null
      this.form.invNo = null
      this.form.treatBgnTm = null
      this.form.treatEndTm = null
      this.form.diagCde = null
      this.form.diagDesc = null
      this.form.treatDesc = null
      this.form.serviceTyp = null
      this.form.sumAmt = null
      this.form.isMedicalHistory = null
      this.form.secuTyp = null
      this.form.categSelfpayRate = null
      this.form.categSelfpayAmt = null
      this.form.otherSecuTypOne = null
      this.form.otherSecuAmtOne = null
      this.form.otherSecuTypTwo = null
      this.form.otherSecuAmtTwo = null
      this.form.reasonableAmt = null
      this.form.deductAmt = null
      this.form.fundCompenAmt = null
      this.form.finalPay = null
      this.form.adjustInterpCde = null
      this.form.interpDesc = null
      this.form.description = null
      this.form.payName = null
      this.form.drug = null
      this.form.num = null
      this.form.treatCde = null
      this.form.maxtermNo = null
      this.form.compensateResult = null
      this.form.company = null
      this.form.conclusionDesc = null
      this.form.auditInformation = null
      this.form.selfAmt = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeDiag() {
      this.diagVisable = true
    },
    matchConfirmDiag(data) {
      if (data.diagCde) {
        this.form.diagCde = data.diagCde
        this.form.diagDesc = data.diagDesc
      }
    },

    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.treatNo) { // 诊疗码
        this.form.treatCde = data.treatNo
        this.form.maxtermNo = data.cateGoryNo
      }
      if (data.explCde) { // 解释码
        this.form.adjustInterpCde = data.explCde
        this.form.interpDesc = data.explCdeDesc
      }
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

