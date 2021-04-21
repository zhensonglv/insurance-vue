<template>
  <div class="app-container">
    <el-card>

      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="操作" width="270">
          <template slot-scope="scope">
            {{ scope.row.operation }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="150">
          <template slot-scope="scope">
            {{ caseStatus[scope.row.appStatus] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            {{ scope.row.trackDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作人" width="150">
          <template slot-scope="scope">
            {{ scope.row.crtCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.crtTm }}
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
import { getList } from '@/api/claim/track'
import Pagination from '@/components/Pagination'
import { getCodeList } from '@/api/code'

export default {
  components: { Pagination },
  props: {
    data: Object
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        batchNo: '',
        plyPartNo: '',
        customAppNo: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      businessData: {},
      caseStatus: {}
    }
  },
  watch: {
    data: {
      handler(v) {
        if (v && v.batchNo && v.plyPartNo && v.customAppNo) {
          this.listQuery.batchNo = v.batchNo
          this.listQuery.plyPartNo = v.plyPartNo
          this.listQuery.customAppNo = v.customAppNo
          this.fetchTypeData()
        }
      },
      immediate: true
    }
  },
  created() {
    // this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    handleSelect() {},
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['caseStatus'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            this[key][item.value] = item.label
          })
        }
      })
      this.fetchData()
    }
  }
}
</script>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>

