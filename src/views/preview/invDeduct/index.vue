<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入申请号查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请号" :show-overflow-tooltip="true" width="200">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.caseNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请文档编号" :show-overflow-tooltip="true" width="150">
          <template slot-scope="scope">
            {{ scope.row.customAppNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="姓名" :show-overflow-tooltip="true" width="200">
          <template slot-scope="scope">
            {{ scope.row.appNme }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="被保人id" width="100">
          <template slot-scope="scope">
            {{ scope.row.insuredId }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="证件类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.certCls }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="证件号" :show-overflow-tooltip="true" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.appTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="账单张数" width="100">
          <template slot-scope="scope">
            {{ scope.row.invNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件状态" width="150">
          <template slot-scope="scope">
            {{ PreviewStatus[scope.row.appStatus] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">操作</el-button>
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
    </el-card>
    <el-card>
      <br>
      <div>
        待处理账单
      </div>
      <br>
      <el-table v-loading="listInvLoading" :data="invList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="发票号" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.invNo">
              <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(scope.row)" />
            </el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="就诊日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.outpatientTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="入院日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.inHospBgnTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="出院日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.inHospEndTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院名称" :show-overflow-tooltip="true" width="200">
          <template slot-scope="scope">
            {{ scope.row.hospName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="科室" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalDepart }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="疾病名称" :show-overflow-tooltip="true" width="150">
          <template slot-scope="scope">
            {{ scope.row.diagDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="账单类型" width="100">
          <template slot-scope="scope">
            {{ CInvoiceTyp[scope.row.invTyp] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否特需" width="100">
          <template slot-scope="scope">
            {{ scope.row.isMust }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleInvEdit(scope.row)">保存</el-button>
          </template>
        </el-table-column>

      </el-table>

      <invdtl :son-inv-data="invdtlForm" :business-data="businessData" @sonStatus="status" />
      <pagination
        v-show="invTotal>0"
        :total="invTotal"
        :page.sync="invQuery.pageNum"
        :limit.sync="invQuery.pageSize"
        @pagination="fetchInvData"
      />
    </el-card>
  </div>
</template>

<script>
import { getList, edit, findById } from '@/api/preview/base'
import Pagination from '@/components/Pagination'
import { getDiag } from '@/api/preview/code'
import invdtl from '@/views/preview/invDeduct/invdtl'
import { getCodeList } from '@/api/preview/code'

export default {
  components: { Pagination, invdtl },
  data() {
    return {
      list: null,
      listLoading: true,
      listInvLoading: true,
      invList: null,
      basePath: 'inputAppInfo',
      invPath: 'inputInvInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        appStatus: '14',
        sort: '+id'
      },
      invQuery: {
        pageNum: 1,
        pageSize: 10,
        appPkId: '',
        deductCheck: '0', // 扣费完成标识
        sort: '+id'
      },
      total: 0,
      invTotal: 0,
      loadDiag: false,
      diagList: [],
      businessData: {},
      matchVisable: false,
      invdtlForm: null,
      PreviewStatus: {},
      CInvoiceTyp: {}
    }
  },
  created() {
    this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },

    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['secuTyp', 'province', 'CInvoiceTyp', 'PreviewStatus'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            !this[key] && (this[key] = {})
            this[key][item.value] = item.label
          })
        }
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        if (this.list.length > 0) {
          this.invQuery.appPkId = this.list[0].id
          this.invQuery.deductCheck = '0'
          this.fetchInvData()// 默认查询出第一条
        } else {
          this.listInvLoading = false
          this.invList = []
        }
      })
    },
    fetchInvData() {
      this.listInvLoading = true
      this.diagList = []
      this.loadDiag = false
      getList(this.invPath, this.invQuery).then(response => {
        this.invList = response.data.data
        this.invTotal = response.data.total
        this.listInvLoading = false
      })
    },
    handleEdit(id) {
      this.invQuery.appPkId = id
      this.fetchInvData()// 默认查询出第一条
    },
    /**
     * 修改账单保存
     * @param row
     */
    handleInvEdit(row) {
      edit(this.invPath, row).then(response => {
        if (response.code === 200) {
          this._notify(response.msg, 'success')
        } else {
          this._notify(response.msg, 'error')
        }
      })
    },

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
    changeDiagCde(row) {
      var current = row.diagDesc
      var item = this.diagList.filter(function(c, i, a) { // c:当前项  i : 索引  a:原值
        if (c.label === current) {
          return c
        }
      })
      row.diagCde = item[0].value
    },

    hanldeMatch(row) {
      this.matchVisable = true
      findById(this.invPath, row.id).then(response => {
        this.invdtlForm = response.data
      })
    },
    matchConfirm() {

    },
    status(data) {
      if (data) {
        this.fetchInvData()
      }
    }
  }
}
</script>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
