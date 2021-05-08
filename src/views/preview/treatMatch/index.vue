<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入批次号查询" />
        <el-input v-model="listQuery.status" style="width: 200px;" placeholder="请选择" />
        <el-input v-model="listQuery.taskId" style="width: 200px;" placeholder="请输入任务id" />
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

        <el-table-column align="center" label="任务id" width="200">
          <template slot-scope="scope">
            {{ scope.row.taskId }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="任务名称" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="匹配结果" width="300">
          <template slot-scope="scope">
            <el-select v-model="scope.row.selectValue" placeholder="请选择">
              <el-option
                v-for="item in scope.row.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="检索" width="300">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.selectSearchValue"
              filterable
              remote
              reserve-keyword
              placeholder="请输入诊疗描述(支持模糊查询)"
              :remote-method="remoteDiagMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in treatList"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="300">
          <template>
            <el-button type="primary" size="small" icon="el-icon-edit">保存</el-button>
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
import { getTreat } from '@/api/preview/code'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'treatMatchTask',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id',
        batchNo: '',
        matchStatus: '',
        taskId: ''
      },
      total: 0,
      loading: false,
      treatList: []
    }
  },
  created() {
    this.fetchData()
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
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },

    remoteDiagMethod(query) {
      if (query !== '' && query.length >= 2) {
        this.treatList = []
        this.loading = true
        this.getTreat(query)
      } else {
        this.treatList = []
      }
    },
    getTreat(data) {
      getTreat({ treatDesc: data }).then(response => {
        this.treatList = response.data
        this.loading = false
      })
    }
  }
}
</script>
