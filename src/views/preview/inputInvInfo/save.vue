<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="对应人员序号" prop="appId" label-width="120px">
        <el-input v-model="form.appId" placeholder="请输入对应人员序号" />
      </el-form-item>

      <el-form-item label="就诊日期" prop="appTm">
        <el-date-picker
          v-model="form.outpatientTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="入院日期" prop="appTm">
        <el-date-picker
          v-model="form.inHospBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="出院日期" prop="appTm">
        <el-date-picker
          v-model="form.inHospEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="就诊医院代码" prop="hospitalNo" label-width="120px">
        <el-input v-model="form.hospitalNo" placeholder="请输入就诊医院代码" />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
        <el-select
          v-model="form.hospitalNme"
          filterable
          remote
          reserve-keyword
          placeholder="请输入医院名称(支持模糊查询)"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="changeHospNo"
        >
          <el-option
            v-for="item in hospList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="科室代码" prop="isMust" label-width="120px">
        <el-input v-model="form.isMust" placeholder="请输入科室代码" />
      </el-form-item>
      <el-form-item label="疾病代码" prop="diagDesc" label-width="120px">
        <el-select
          v-model="form.diagDesc"
          filterable
          remote
          reserve-keyword
          placeholder="请输入疾病代码支持模糊查询)"
          :remote-method="remoteDiagMethod"
          :loading="loading"
          @change="changeDiagCde"
        >
          <el-option
            v-for="item in diagList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="账单类型" prop="invTyp" label-width="120px">
        <el-input v-model="form.invTyp" placeholder="请输入账单类型" />
      </el-form-item>

      <el-form-item label="账单张数" prop="invNum" label-width="120px">
        <el-input v-model="form.invNum" placeholder="请输入账单张数" />
      </el-form-item>

      <el-form-item label="账单号" prop="invNo" label-width="120px">
        <el-input v-model="form.invNo" placeholder="请输入账单号" />
      </el-form-item>

      <el-form-item label="发票金额" prop="sumAmt" label-width="120px">
        <el-input v-model="form.sumAmt" placeholder="请输入发票金额" />
      </el-form-item>

      <el-form-item label="社保支付金额" prop="overallAmt" label-width="120px">
        <el-input v-model="form.overallAmt" placeholder="请输入社保支付金额" />
      </el-form-item>

      <el-form-item label="自费金额" prop="selfExpense" label-width="120px">
        <el-input v-model="form.selfExpense" placeholder="请输入自费金额" />
      </el-form-item>

      <el-form-item label="他方支付" prop="thirdCompen" label-width="120px">
        <el-input v-model="form.thirdCompen" placeholder="请输入他方支付" />
      </el-form-item>

      <el-form-item label="账单备注" prop="describle" label-width="120px">
        <el-input v-model="form.describle" placeholder="请输入账单备注" />
      </el-form-item>

      <el-form-item label="影像序号" prop="imageIndexNo" label-width="120px">
        <el-input v-model="form.imageIndexNo" placeholder="请输入影像序号" />
      </el-form-item>

      <el-form-item label="统筹基金支付" prop="tcFundPay" label-width="120px">
        <el-input v-model="form.tcFundPay" placeholder="请输入统筹基金支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（住院）支付" prop="maxaMtPay" label-width="120px">
        <el-input v-model="form.maxaMtPay" placeholder="请输入大额互助资金（住院）支付" />
      </el-form-item>

      <el-form-item label="统筹基金年度内累计支付" prop="tcYearPay" label-width="120px">
        <el-input v-model="form.tcYearPay" placeholder="请输入统筹基金年度内累计支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（门诊）支付" prop="maxhzbPay" label-width="120px">
        <el-input v-model="form.maxhzbPay" placeholder="请输入大额互助资金（门诊）支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（门诊）支付-年度内累计支付" prop="maxhzyPay" label-width="120px">
        <el-input v-model="form.maxhzyPay" placeholder="请输入大额互助资金（门诊）支付-年度内累计支付" />
      </el-form-item>

      <el-form-item label="发票姓名" prop="invInsuredNme" label-width="120px">
        <el-input v-model="form.invInsuredNme" placeholder="请输入发票姓名" />
      </el-form-item>

      <el-form-item label="就诊悬挂类型" prop="clmHangType" label-width="120px">
        <el-input v-model="form.clmHangType" placeholder="请输入就诊悬挂类型" />
      </el-form-item>

      <el-form-item label="就诊悬挂原因" prop="clmHangCause" label-width="120px">
        <el-input v-model="form.clmHangCause" placeholder="请输入就诊悬挂原因" />
      </el-form-item>

      <el-form-item label="就诊悬挂备注" prop="clmHangRemark" label-width="120px">
        <el-input v-model="form.clmHangRemark" placeholder="请输入就诊悬挂备注" />
      </el-form-item>

      <el-form-item label="次诊断1" prop="secdiagCde1" label-width="120px">
        <el-input v-model="form.secdiagCde1" placeholder="请输入次诊断1" />
      </el-form-item>

      <el-form-item label="次诊断2" prop="secdiagCde2" label-width="120px">
        <el-input v-model="form.secdiagCde2" placeholder="请输入次诊断2" />
      </el-form-item>

      <el-form-item label="既往症期间" prop="anamnesisTime" label-width="120px">
        <el-input v-model="form.anamnesisTime" placeholder="请输入既往症期间" />
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
import { save, edit } from '@/api/preview/base'
import { getDiag, getHospital } from '@/api/preview/code'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'inputInvInfo',
      form: {
        id: '',
        appId: '',
        hospitalNo: '',
        hospitalNme: '',
        isMust: '',
        diagCde: '',
        diagDesc: '',
        invTyp: '',
        invNo: '',
        sumAmt: '',
        overallAmt: '',
        categSelfpay: '',
        selfExpense: '',
        thirdCompen: '',
        describle: '',
        imageIndexNo: '',
        tcFundPay: '',
        maxaMtPay: '',
        tcYearPay: '',
        maxhzbPay: '',
        maxhzyPay: '',
        invInsuredNme: '',
        secdiagCde2: '',
        secdiagCde1: '',
        outpatientTm: '',
        inHospBgnTm: '',
        clmHangType: '',
        clmHangCause: '',
        clmHangRemark: '',
        inHospEndTm: ''
      },
      loading: false,
      loadDiag: false,
      diagList: [],
      hospList: [],
      rules: {

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
    // ---------------疾病代码搜索------------------
    remoteDiagMethod(query) {
      if (query !== '' && query.length >= 2) {
        this.diagList = []
        this.loadDiag = true
        this.getDiag(query)
      } else {
        this.diagList = []
      }
    },
    getDiag(data) {
      getDiag({ diaDesc: data }).then(response => {
        this.diagList = response.data
        this.loadDiag = false
      })
    },
    changeDiagCde() {
      var current = this.form.diagDesc
      var item = this.diagList.filter(function(c, i, a) { // c:当前项  i : 索引  a:原值
        if (c.label === current) {
          return c
        }
      })
      this.form.diagCde = item[0].value
    },
    // -------------医院搜索---------------
    remoteMethod(query) {
      if (query !== '' && query.length >= 2) {
        this.hospList = []
        this.loading = true
        this.getHospital(query)
      } else {
        this.hospList = []
      }
    },
    getHospital(data) {
      getHospital({ hospName: data }).then(response => {
        this.hospList = response.data
        this.loading = false
      })
    },
    changeHospNo() {
      var current = this.form.hospitalNme
      var item = this.hospList.filter(function(c, i, a) { // c:当前项  i : 索引  a:原值
        if (c.label === current) {
          return c
        }
      })
      this.form.hospitalNo = item[0].value
    },
    clearForm() {
      this.form.appId = null
      this.form.hospitalNo = null
      this.form.hospitalNme = null
      this.form.isMust = null
      this.form.diagCde = null
      this.form.diagDesc = null
      this.form.invTyp = null
      this.form.invNo = null
      this.form.sumAmt = null
      this.form.overallAmt = null
      this.form.categSelfpay = null
      this.form.selfExpense = null
      this.form.thirdCompen = null
      this.form.describle = null
      this.form.imageIndexNo = null
      this.form.tcFundPay = null
      this.form.maxaMtPay = null
      this.form.tcYearPay = null
      this.form.maxhzbPay = null
      this.form.maxhzyPay = null
      this.form.invInsuredNme = null
      this.form.secdiagCde2 = null
      this.form.secdiagCde1 = null
      this.form.outpatientTm = null
      this.form.inHospBgnTm = null
      this.form.clmHangType = null
      this.form.clmHangCause = null
      this.form.clmHangRemark = null
      this.form.inHospEndTm = null
      this.hospList = []
      this.diagList = []
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
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

