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

        <el-table-column align="center" label="申请号" width="200">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.caseNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请文档编号" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.customAppNo">
              <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(scope.row)" />
            </el-input>
            <match v-model="matchVisible" :app-pk-id="appPkId" :business-data="businessData" @sonStatus="status" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="姓名" width="200">
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

        <el-table-column align="center" label="证件号" width="150">
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
        <el-table-column align="center" label="案件状态" width="200">
          <template slot-scope="scope">
            {{ PreviewStatus[scope.row.appStatus] }}
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
  </div>
</template>

<script>
import { getList } from '@/api/preview/base'
import Pagination from '@/components/Pagination'
import Match from './match'
import { getCodeList } from '@/api/preview/code'

export default {
  components: { Pagination, Match },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'inputAppInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        appStatus: '18', // 状态待人工诊断复核
        sort: '+id'
      },
      total: 0,
      businessData: {},
      matchVisible: false,
      appPkId: null,
      selected: [],
      PreviewStatus: {}
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
      getCodeList({ parent: ['CInvoiceTyp', 'PreviewStatus'] }).then(res => {
        debugger
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
      })
    },
    hanldeMatch(row) {
      this.matchVisible = true
      this.appPkId = row.id
    },
    status(data) {
      if (data) {
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
