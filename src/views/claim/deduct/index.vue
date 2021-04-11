<template>
  <div class="app-container">
    <el-card>

      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
        <el-table-column
          type="selection"
          width="110"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="扣除金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.deductAmt }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="扣除类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.deductTyp }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="扣除描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.deductDec }}
          </template>
        </el-table-column>
      </el-table>

      <!-- <save :son-data="form" :business-data="businessData" @sonStatus="status" /> -->

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
import { getList } from '@/api/claim/deduct'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    treatId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      CTeamTyp: {},
      CPubCoverTyp: {},
      selected: []
    }
  },
  created() {
    if (this.$route.path.indexOf('claim/apply') >= 0) {
      if (this.treatId) {
        this.fetchData()
        this.fetchTypeData()
      }
    } else {
      this.fetchData()
      this.fetchTypeData()
    }
  },
  mounted() {
  },
  methods: {
    handleSelect() {},
    /* handleRoute() {
      if (this.selected.length !== 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/client/plyPartPubCov', query: { pubCoverId: this.selected[0].id }})
      }
    },*/

    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData(id) {
      this.listLoading = true
      getList(this.listQuery, this.treatId).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CTeamTyp', 'CPubCoverTyp'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            this[key][item.value] = item.label
          })
        }
      })
    },
    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      } else {
        this.$store.dispatch('tagsView/toggleTab', !data)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.el-table >>> .el-table__body-wrapper td {
  padding: 0;
}
.el-table >>> .el-table__header-wrapper {
  th {
    background-color: #666!important
  }
}
</style>
