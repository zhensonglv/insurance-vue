<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入申请查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请号" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.batchNo">
              <svg-icon slot="suffix" icon-class="search" @click="handleMatch(scope.row.batchNo)" />
            </el-input>
            <match v-model="matchVisible" :batch-no="batchNo" @sonStatus="status" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="线上/线下" width="150">
          <template slot-scope="scope">
            {{ scope.row.online }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.batchStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请数量" width="150">
          <template slot-scope="scope">
            {{ scope.row.appNum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件来源" width="150">
          <template slot-scope="scope">
            {{ scope.row.orgin }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="保单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="文件名" width="150">
          <template slot-scope="scope">
            {{ scope.row.fileName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="生成时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.exeTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="原始87文件名" width="150">
          <template slot-scope="scope">
            {{ scope.row.originFileName }}
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
// import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import match from '../treatMatch'

export default {
  components: { Pagination, match },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'inputBatchInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        batchStatus: '13',
        sort: '+id'
      },
      total: 0,
      businessData: {},
      selected: [],
      batchNo: null,
      matchVisible: false
    }
  },
  created() {
    this.fetchData()
    // this.fetchTypeData()
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

    fetchData() {
      this.batchNo = null
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    /* fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['DiaMatchTyp'] }).then(res => {

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
    },*/
    handleMatch(batchNo) {
      this.matchVisible = true
      this.batchNo = batchNo
    },
    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    }
  }
}
</script>
