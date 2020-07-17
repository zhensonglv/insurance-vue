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
        <el-input v-model="form.customAppNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="发票号" prop="invNo" label-width="120px">
        <el-input v-model="form.invNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="起始诊疗日" prop="treatBgnTm" label-width="120px">
        <el-select v-model="form.treatBgnTm" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="终止诊疗日" prop="treatEndTm" label-width="120px">
        <el-date-picker
          v-model="form.treatEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="诊断码" prop="diagCde" label-width="120px">
        <el-input v-model="form.diagCde" placeholder="请输入诊断码" />
      </el-form-item>

      <el-form-item label="产品号" prop="prodNo" label-width="120px">
        <el-input v-model="form.prodNo" placeholder="请输入产品号" />
      </el-form-item>

      <el-form-item label="产品名称" prop="prodNme" label-width="120px">
        <el-input v-model="form.prodNme" placeholder="请输入产品名称" />
      </el-form-item>

      <el-form-item label="责任号" prop="responseNo" label-width="120px">
        <el-input v-model="form.responseNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="责任描述" prop="responseDesc" label-width="120px">
        <el-input v-model="form.responseDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="诊疗描述" prop="treatDesc" label-width="120px">
        <el-input v-model="form.treatDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="服务类型" prop="serviceTyp" label-width="120px">
        <el-input v-model="form.serviceTyp" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="总金额" prop="sumAmt" label-width="120px">
        <el-input v-model="form.sumAmt" placeholder="请输入批次号" />
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

      <el-form-item label="社保类型" prop="secuTyp" label-width="120px">
        <el-select v-model="form.secuTyp" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="分类自付百分比" prop="categSelfpayRate" label-width="120px">
        <el-input v-model="form.categSelfpayRate" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分类自付金额" prop="categSelfpayAmt" label-width="120px">
        <el-input v-model="form.categSelfpayAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入批次号" />
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

      <el-form-item label="可理算金额" prop="reasonableAmt" label-width="120px">
        <el-input v-model="form.reasonableAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="deductAmt" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="免赔金额" prop="deductleAmt" label-width="120px">
        <el-input v-model="form.deductleAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="超限金额" prop="exclimitAmt" label-width="120px">
        <el-input v-model="form.exclimitAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="共保金额" prop="ciAmt" label-width="120px">
        <el-input v-model="form.ciAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="超保额金额" prop="excAmt" label-width="120px">
        <el-input v-model="form.excAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="公共保额" prop="commonAmt" label-width="120px">
        <el-input v-model="form.commonAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="基金赔付金额" prop="fundCompenAmt" label-width="120px">
        <el-input v-model="form.fundCompenAmt" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="最终赔付" prop="finalPay" label-width="120px">
        <el-input v-model="form.finalPay" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="调整解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="form.adjustInterpCde" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="form.interpDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="form.description" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="费用名称" prop="payName" label-width="120px">
        <el-input v-model="form.payName" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="剂型" prop="drug" label-width="120px">
        <el-input v-model="form.drug" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="数量" prop="num" label-width="120px">
        <el-input v-model="form.num" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="诊疗码" prop="treatCde" label-width="120px">
        <el-input v-model="form.treatCde" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="大型号" prop="maxtermNo" label-width="120px">
        <el-input v-model="form.maxtermNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="虚拟诊疗码" prop="virtualTreatCde" label-width="120px">
        <el-input v-model="form.virtualTreatCde" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="赔付结论" prop="compensateResult" label-width="120px">
        <el-select v-model="form.compensateResult" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="单位" prop="company" label-width="120px">
        <el-input v-model="form.company" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="结论描述" prop="conclusionDesc" label-width="120px">
        <el-input v-model="form.conclusionDesc" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
        <el-input v-model="form.auditInformation" placeholder="请输入批次号" />
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
import { save, edit } from '@/api/claim/treat'

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
        batchNo: '',
        plyPartNo: '',
        customAppNo: '',
        invNo: '',
        treatBgnTm: '',
        treatEndTm: '',
        diagCde: '',
        prodNo: '',
        prodNme: '',
        responseNo: '',
        responseDesc: '',
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
        deductleAmt: '',
        exclimitAmt: '',
        ciAmt: '',
        excAmt: '',
        commonAmt: '',
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
        virtualTreatCde: '',
        compensateResult: '',
        company: '',
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
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.customAppNo = null
      this.form.invNo = null
      this.form.treatBgnTm = null
      this.form.treatEndTm = null
      this.form.diagCde = null
      this.form.prodNo = null
      this.form.prodNme = null
      this.form.responseNo = null
      this.form.responseDesc = null
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
      this.form.deductleAmt = null
      this.form.exclimitAmt = null
      this.form.ciAmt = null
      this.form.excAmt = null
      this.form.commonAmt = null
      this.form.fundCompenAmt = null
      this.form.compensateAmt = null
      this.form.finalPay = null
      this.form.adjustInterpCde = null
      this.form.interpDesc = null
      this.form.description = null
      this.form.payName = null
      this.form.drug = null
      this.form.num = null
      this.form.treatCde = null
      this.form.maxtermNo = null
      this.form.virtualTreatCde = null
      this.form.compensateResult = null
      this.form.company = null
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

