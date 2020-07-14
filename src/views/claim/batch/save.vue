<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入客户批次号" />
      </el-form-item>
      <el-form-item label="客户批次号" prop="customBatchNo" label-width="120px">
        <el-input v-model="form.customBatchNo" placeholder="请输入客户批次号" />
      </el-form-item>

      <el-form-item label="行政助理" prop="adminAssist" label-width="120px">
        <el-input v-model="form.adminAssist" placeholder="请输入客户批次号" />
      </el-form-item>

      <el-form-item label="公司" prop="company" label-width="120px">
        <el-input v-model="form.company" placeholder="请输入公司" />
      </el-form-item>

      <el-form-item label="提交对象" prop="subjObj" label-width="120px">
        <el-select v-model="form.subjObj" placeholder="请选择提交对象">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="团体号" prop="croupNo" label-width="120px">
        <el-input v-model="form.croupNo" placeholder="请输入团体号" />
      </el-form-item>

      <el-form-item label="团体名称" prop="groupNme" label-width="120px">
        <el-input v-model="form.groupNme" placeholder="请输入团体名称" />
      </el-form-item>

      <el-form-item label="保单号" prop="plyNo" label-width="120px">
        <el-input v-model="form.plyNo" placeholder="请输入保单号" />
      </el-form-item>

      <el-form-item label="批次来源" prop="batchOrigin" label-width="120px">
        <el-select v-model="form.batchOrigin" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="赔付对象" prop="compensateObj" label-width="120px">
        <el-select v-model="form.compensateObj" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="提交申请数" prop="subNum" label-width="120px">
        <el-input v-model="form.subNum" placeholder="请输入提交申请数" />
      </el-form-item>

      <el-form-item label="实际申请数" prop="actualSubNum" label-width="120px">
        <el-input v-model="form.actualSubNum" placeholder="请输入实际申请数" />
      </el-form-item>

      <el-form-item label="提交发票数" prop="subInvNum" label-width="120px">
        <el-input v-model="form.subInvNum" placeholder="请输入提交发票数" />
      </el-form-item>

      <el-form-item label="实际发票数" prop="actualsubInvNum" label-width="120px">
        <el-input v-model="form.actualsubInvNum" placeholder="请输入实际发票数" />
      </el-form-item>

      <el-form-item label="实际发票总金额" prop="actualInvAmt" label-width="120px">
        <el-input v-model="form.actualInvAmt" placeholder="请输入实际发票金额" />
      </el-form-item>

      <el-form-item label="申请日" prop="appTm" label-width="120px">
        <el-date-picker
          v-model="form.appTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="生成日" prop="confirmTm" label-width="120px">
        <el-date-picker
          v-model="form.confirmTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="申请人数" prop="appPerNum" label-width="120px">
        <el-input v-model="form.appPerNum" placeholder="请输入申请人数" />
      </el-form-item>

      <el-form-item label="收件日" prop="comsignTm" label-width="120px">
        <el-date-picker
          v-model="form.comsignTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="影像日" prop="imageTm" label-width="120px">
        <el-date-picker
          v-model="form.imageTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="客户收件日" prop="cusConsignTm" label-width="120px">
        <el-date-picker
          v-model="form.cusConsignTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="录入日" prop="enterTm" label-width="120px">
        <el-date-picker
          v-model="form.enterTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="客户审核日" prop="cusUndrTm" label-width="120px">
        <el-date-picker
          v-model="form.cusUndrTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="结案日" prop="endCaseTm" label-width="120px">
        <el-date-picker
          v-model="form.endCaseTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="数据日" prop="dataTm" label-width="120px">
        <el-date-picker
          v-model="form.dataTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="电子转账日" prop="electrTransferTm" label-width="120px">
        <el-date-picker
          v-model="form.electrTransferTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="银行号" prop="bankNo" label-width="120px">
        <el-input v-model="form.bankNo" placeholder="请输入申请人数" />
      </el-form-item>

      <el-form-item label="银行类型" prop="bankTyp" label-width="120px">
        <el-select v-model="form.bankTyp" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="转账号" prop="converNo" label-width="120px">
        <el-input v-model="form.converNo" placeholder="请输入转账号" />
      </el-form-item>

      <el-form-item label="账户名" prop="acctNme" label-width="120px">
        <el-input v-model="form.acctNme" placeholder="请输入账户名" />
      </el-form-item>

      <el-form-item label="特殊理算提示" prop="specCalcHint" label-width="120px">
        <el-select v-model="form.specCalcHint" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="是否绿色通道" prop="isGreenChannel" label-width="120px">
        <el-select v-model="form.isGreenChannel" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="诊断复核人" prop="diagReviewer" label-width="120px">
        <el-input v-model="form.diagReviewer" placeholder="请输入诊断复核人" />
      </el-form-item>

      <el-form-item label="医疗审核人员" prop="medicalAuditor" label-width="120px">
        <el-input v-model="form.medicalAuditor" placeholder="请输入医疗审核人员" />
      </el-form-item>

      <el-form-item label="签批人员" prop="singedStaff" label-width="120px">
        <el-input v-model="form.singedStaff" placeholder="请输入签批人员" />
      </el-form-item>

      <el-form-item label="完成时限" prop="copleteTlimt" label-width="120px">
        <el-input v-model="form.copleteTlimt" placeholder="请输入完成时限" />
      </el-form-item>

      <el-form-item label="公司" prop="companyNew" label-width="120px">
        <el-input v-model="form.companyNew" placeholder="请输入公司" />
      </el-form-item>

      <el-form-item label="未结案数" prop="unsettledCaseNum" label-width="120px">
        <el-input v-model="form.unsettledCaseNum" placeholder="请输入未结案数" />
      </el-form-item>

      <el-form-item label="更新时间" prop="clmUpdTm" label-width="120px">
        <el-date-picker
          v-model="form.clmUpdTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="是否异步处理中" prop="isAsyncProc" label-width="120px">
        <el-select v-model="form.isAsyncProc" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="批次类型" prop="batchTyp" label-width="120px">
        <el-select v-model="form.batchTyp" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="批次状态" prop="batchStatus" label-width="120px">
        <el-select v-model="form.batchStatus" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="案件数量" prop="caseNumber" label-width="120px">
        <el-input v-model="form.caseNumber" placeholder="请输入案件数量" />
      </el-form-item>

      <el-form-item label="批次案件状态" prop="caseStatus" label-width="120px">
        <el-select v-model="form.caseStatus" placeholder="请选择">
          <!--<el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />-->
        </el-select>
      </el-form-item>

      <el-form-item label="备注" prop="batchDesc" label-width="120px">
        <el-input v-model="form.batchDesc" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="影像号" prop="imageNo" label-width="120px">
        <el-input v-model="form.imageNo" placeholder="请输入影像号" />
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
import { save, edit } from '@/api/claim/batch'

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
        customBatchNo: '',
        adminAssist: '',
        company: '',
        subjObj: '',
        croupNo: '',
        groupNme: '',
        plyNo: '',
        batchOrigin: '',
        compensateObj: '',
        subNum: '',
        actualSubNum: '',
        subInvNum: '',
        actualsubInvNum: '',
        actualInvAmt: '',
        appTm: '',
        confirmTm: '',
        appPerNum: '',
        comsignTm: '',
        imageTm: '',
        cusConsignTm: '',
        enterTm: '',
        cusUndrTm: '',
        endCaseTm: '',
        dataTm: '',
        electrTransferTm: '',
        bankNo: '',
        bankTyp: '',
        converNo: '',
        acctNme: '',
        specCalcHint: '',
        isGreenChannel: '',
        diagReviewer: '',
        medicalAuditor: '',
        singedStaff: '',
        copleteTlimt: '',
        companyNew: '',
        unsettledCaseNum: '',
        clmUpdTm: '',
        isAsyncProc: '',
        batchTyp: '',
        batchStatus: '',
        caseNumber: '',
        caseStatus: '',
        batchDesc: '',
        imageNo: ''
      },
      /* regionData: level,
      regionMap: {
        label: 'name',
        value: 'code'
      },*/
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }],
        customBatchNo: [{ required: true, trigger: 'blur', message: '请输入客户批次号' }],
        plyNo: [{ required: true, trigger: 'blur', message: '请输入保单号' }],
        cusConsignTm: [{ required: true, trigger: 'blur', message: '请输入客户收件日' }],
        caseNumber: [{ required: true, trigger: 'blur', message: '请输入案件数量' }],
        // caseStatus: [{ required: true, trigger: 'blur', message: '请输入批次案件状态' }],
        company: [{ required: true, trigger: 'blur', message: '请输入公司' }],
        croupNo: [{ required: true, trigger: 'blur', message: '请输入团体号' }],
        groupNme: [{ required: true, trigger: 'blur', message: '请输入团体名称' }]
        // batchOrigin: [{ required: true, trigger: 'blur', message: '请输入批次来源' }],
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
    /* handleRegionChange(value) {
      console.log(value, 'value----')
    },*/
    clearForm() {
      this.form.id = null
      this.form.customBatchNo = null
      this.form.adminAssist = null
      this.form.company = null
      this.form.subjObj = null
      this.form.croupNo = null
      this.form.groupNme = null
      this.form.plyNo = null
      this.form.batchOrigin = null
      this.form.compensateObj = null
      this.form.subNum = null
      this.form.actualSubNum = null
      this.form.subInvNum = null
      this.form.actualsubInvNum = null
      this.form.actualInvAmt = null
      this.form.appTm = null
      this.form.confirmTm = null
      this.form.appPerNum = null
      this.form.comsignTm = null
      this.form.imageTm = null
      this.form.cusConsignTm = null
      this.form.enterTm = null
      this.form.cusUndrTm = null
      this.form.endCaseTm = null
      this.form.dataTm = null
      this.form.electrTransferTm = null
      this.form.bankNo = null
      this.form.bankTyp = null
      this.form.converNo = null
      this.form.acctNme = null
      this.form.specCalcHint = null
      this.form.isGreenChannel = null
      this.form.diagReviewer = null
      this.form.medicalAuditor = null
      this.form.singedStaff = null
      this.form.copleteTlimt = null
      this.form.companyNew = null
      this.form.unsettledCaseNum = null
      this.form.clmUpdTm = null
      this.form.isAsyncProc = null
      this.form.batchTyp = null
      this.form.batchStatus = null
      this.form.caseNumber = null
      this.form.caseStatus = null
      this.form.batchDesc = null
      this.form.imageNo = null
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

