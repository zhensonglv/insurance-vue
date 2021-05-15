<template>
  <el-dialog :title="dialogTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="85%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="对应人员序号" prop="appId" label-width="120px">
        <el-input v-model="invForm.appId" placeholder="请输入对应人员序号" />
      </el-form-item>

      <el-form-item label="就诊日期" prop="appTm">
        <el-date-picker
          v-model="invForm.outpatientTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="入院日期" prop="appTm">
        <el-date-picker
          v-model="invForm.inHospBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="出院日期" prop="appTm">
        <el-date-picker
          v-model="invForm.inHospEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="就诊医院代码" prop="hospitalNo" label-width="120px">
        <el-input v-model="invForm.hospitalNo" placeholder="请输入就诊医院代码" />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
        <el-select
          v-model="invForm.hospitalNme"
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
        <el-input v-model="invForm.hospitalDepart" placeholder="请输入科室代码" />
      </el-form-item>
      <el-form-item label="诊断" prop="diagDesc" label-width="120px">
        <el-select
          v-model="invForm.diagDesc"
          filterable
          remote
          reserve-keyword
          placeholder="请输入诊断描述(支持模糊查询)"
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

      <el-form-item label="诊断码" prop="isMust" label-width="120px">
        <el-input v-model="invForm.diagCde" placeholder="请输入诊断码" />
      </el-form-item>

      <el-form-item label="账单类型" prop="invTyp" label-width="120px">
        <el-input v-model="invForm.invTyp" placeholder="请输入账单类型" />
      </el-form-item>

      <el-form-item label="账单张数" prop="invNum" label-width="120px">
        <el-input v-model="invForm.invNum" placeholder="请输入账单张数" />
      </el-form-item>

      <el-form-item label="账单号" prop="invNo" label-width="120px">
        <el-input v-model="invForm.invNo" placeholder="请输入账单号" />
      </el-form-item>

      <el-form-item label="发票金额" prop="sumAmt" label-width="120px">
        <el-input v-model="invForm.sumAmt" placeholder="请输入发票金额" />
      </el-form-item>

      <el-form-item label="社保支付金额" prop="overallAmt" label-width="120px">
        <el-input v-model="invForm.overallAmt" placeholder="请输入社保支付金额" />
      </el-form-item>

      <el-form-item label="自费金额" prop="selfExpense" label-width="120px">
        <el-input v-model="invForm.selfExpense" placeholder="请输入自费金额" />
      </el-form-item>

      <el-form-item label="他方支付" prop="thirdCompen" label-width="120px">
        <el-input v-model="invForm.thirdCompen" placeholder="请输入他方支付" />
      </el-form-item>

      <el-form-item label="账单备注" prop="describle" label-width="120px">
        <el-input v-model="invForm.describle" placeholder="请输入账单备注" />
      </el-form-item>

      <el-form-item label="影像序号" prop="imageIndexNo" label-width="120px">
        <el-input v-model="invForm.imageIndexNo" placeholder="请输入影像序号" />
      </el-form-item>

      <el-form-item label="统筹基金支付" prop="tcFundPay" label-width="120px">
        <el-input v-model="invForm.tcFundPay" placeholder="请输入统筹基金支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（住院）支付" prop="maxaMtPay" label-width="120px">
        <el-input v-model="invForm.maxaMtPay" placeholder="请输入大额互助资金（住院）支付" />
      </el-form-item>

      <el-form-item label="统筹基金年度内累计支付" prop="tcYearPay" label-width="120px">
        <el-input v-model="invForm.tcYearPay" placeholder="请输入统筹基金年度内累计支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（门诊）支付" prop="maxhzbPay" label-width="120px">
        <el-input v-model="invForm.maxhzbPay" placeholder="请输入大额互助资金（门诊）支付" />
      </el-form-item>

      <el-form-item label="大额互助资金（门诊）支付-年度内累计支付" prop="maxhzyPay" label-width="120px">
        <el-input v-model="invForm.maxhzyPay" placeholder="请输入大额互助资金（门诊）支付-年度内累计支付" />
      </el-form-item>

      <el-form-item label="发票姓名" prop="invInsuredNme" label-width="120px">
        <el-input v-model="invForm.invInsuredNme" placeholder="请输入发票姓名" />
      </el-form-item>

      <el-form-item label="就诊悬挂类型" prop="clmHangType" label-width="120px">
        <el-input v-model="invForm.clmHangType" placeholder="请输入就诊悬挂类型" />
      </el-form-item>

      <el-form-item label="就诊悬挂原因" prop="clmHangCause" label-width="120px">
        <el-input v-model="invForm.clmHangCause" placeholder="请输入就诊悬挂原因" />
      </el-form-item>

      <el-form-item label="就诊悬挂备注" prop="clmHangRemark" label-width="120px">
        <el-input v-model="invForm.clmHangRemark" placeholder="请输入就诊悬挂备注" />
      </el-form-item>

      <el-form-item label="次诊断1" prop="secdiagCde1" label-width="120px">
        <el-input v-model="invForm.secdiagCde1" placeholder="请输入次诊断1" />
      </el-form-item>

      <el-form-item label="次诊断2" prop="secdiagCde2" label-width="120px">
        <el-input v-model="invForm.secdiagCde2" placeholder="请输入次诊断2" />
      </el-form-item>

      <el-form-item label="既往症期间" prop="anamnesisTime" label-width="120px">
        <el-input v-model="invForm.anamnesisTime" placeholder="请输入既往症期间" />
      </el-form-item>

    </el-form>
    <div align="center">
      <el-button style="margin-left: 10px;" type="primary" @click="save('invdtlForm')">保存</el-button>
    </div>
    <div>
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
    </div>
    <div>
      <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="handleSave">新增</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchSave">批量保存</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchDel">批量批量删除</el-button>
    </div>
    <br>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="录入名称" :show-overflow-tooltip="true" width="150">
        <template slot-scope="scope">
          {{ scope.row.inputNme }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="录入剂型" width="100">
        <template slot-scope="scope">
          {{ scope.row.inputDrug }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="录入比例" width="100">
        <template slot-scope="scope">
          {{ scope.row.inputRate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="录入医保类型" width="80">
        <template slot-scope="scope">
          {{ scope.row.inputSecuTyp }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="费用编码" width="170">
        <template slot-scope="scope">
          <el-input v-model="scope.row.treatCde">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(scope.$index)" />
          </el-input>
          <match v-model="matchVisable" :index="index" @matchConfirm="matchConfirm" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="费用名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.payNme }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="医保地省" width="80">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="医保地市" width="80">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="系统比例" width="80">
        <template slot-scope="scope">
          {{ scope.row.sysRate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="费用金额" width="120">
        <template slot-scope="scope">
          {{ scope.row.sumAmt }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="扣费比例" width="80">
        <template slot-scope="scope">
          {{ scope.row.categSelfpayRate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="医保类型" width="80">
        <template slot-scope="scope">
          {{ scope.row.secuTyp }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="自付金额" width="120">
        <template slot-scope="scope">
          {{ scope.row.categSelfpayAmt }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="大项号" width="80">
        <template slot-scope="scope">
          {{ scope.row.maxtermNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <save :son-data="form" :business-data="businessData" @sonStatus="status" />

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
      <el-button type="primary" @click="onSubmit('invForm')">
        扣费完成
      </el-button>
    </div>

  </el-dialog>
</template>

<script>
import { save, edit, getList } from '@/api/preview/base'
import { getDiag, getHospital } from '@/api/preview/code'
import Pagination from '@/components/Pagination'
import Save from '../inputTreatInfo/save'
import Match from '@/views/claim/inv/match'
export default {

  components: { Pagination, Save, Match },
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonInvData', 'businessData'],
  data() {
    return {
      dialogTitle: '新增',
      basePath: 'inputInvInfo',
      invForm: {
        id: '',
        appId: '',
        hospitalNo: '',
        hospitalNme: '',
        hospitalDepart: '',
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
      redSelfColor: false,
      redCategColor: false,
      redColor: false,
      loading: false,
      loadDiag: false,
      diagList: [],
      hospList: [],
      list: null,
      listLoading: true,
      treatPath: 'inputTreatInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 200,
        invPkId: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      matchVisable: false,
      index: null,
      form: null,
      selected: [],
      rules: {

      }
    }
  },
  watch: {
    'sonInvData': function(newVal, oldVal) {
      this.invForm = newVal
      this.dialogVisible = true
      if (newVal.id != null) {
        this.dialogTitle = '账单明细信息'
        this.fetchData()
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

    fetchData() {
      this.listLoading = true
      this.listQuery.invPkId = this.invForm.id
      getList(this.treatPath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
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
      var current = this.invForm.diagDesc
      var item = this.diagList.filter(function(c, i, a) { // c:当前项  i : 索引  a:原值
        if (c.label === current) {
          return c
        }
      })
      this.invForm.diagCde = item[0].value
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
      var current = this.invForm.hospitalNme
      var item = this.hospList.filter(function(c, i, a) { // c:当前项  i : 索引  a:原值
        if (c.label === current) {
          return c
        }
      })
      this.invForm.hospitalNo = item[0].value
    },
    clearForm() {
      this.invForm.appId = null
      this.invForm.hospitalNo = null
      this.invForm.hospitalNme = null
      this.invForm.hospitalDepart = null
      this.invForm.isMust = null
      this.invForm.diagCde = null
      this.invForm.diagDesc = null
      this.invForm.invTyp = null
      this.invForm.invNo = null
      this.invForm.sumAmt = null
      this.invForm.overallAmt = null
      this.invForm.categSelfpay = null
      this.invForm.selfExpense = null
      this.invForm.thirdCompen = null
      this.invForm.describle = null
      this.invForm.imageIndexNo = null
      this.invForm.tcFundPay = null
      this.invForm.maxaMtPay = null
      this.invForm.tcYearPay = null
      this.invForm.maxhzbPay = null
      this.invForm.maxhzyPay = null
      this.invForm.invInsuredNme = null
      this.invForm.secdiagCde2 = null
      this.invForm.secdiagCde1 = null
      this.invForm.outpatientTm = null
      this.invForm.inHospBgnTm = null
      this.invForm.clmHangType = null
      this.invForm.clmHangCause = null
      this.invForm.clmHangRemark = null
      this.invForm.inHospEndTm = null
      this.hospList = []
      this.diagList = []
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
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.invForm.id === null) {
            save(this.basePath, this.invForm).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('dealStatus', true)
                this.dialogVisible = false
              } else {
                this._notify(response.msg, 'error')
              }
            })
          } else {
            edit(this.basePath, this.invForm).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('dealStatus', true)
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
    },
    // ---------------明细功能----------------
    status(data) {
      if (data) {
        this.fetchData()
      }
    },
    handleSelect(data) {
      this.selected = data
    },
    hanldeMatch(index) {
      this.matchVisable = true
      this.index = index
    },

    matchConfirm(data) {
      this.list[data.index].treatCde = data.value.treatNo
      this.list[data.index].payNme = data.value.treatDesc
      this.list[data.index].treatDesc = data.value.treatDesc
    },
    handleSave() {
      this.form = { id: null, invPkId: this.invForm.id }
    },

    edit(row) {

    },
    batchSave() {

    },
    batchDel() {

    }
  }
}
</script>

<style lang="css">
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
</style>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
