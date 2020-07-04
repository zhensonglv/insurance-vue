<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.insuCompanyNme" style="width: 200px;" placeholder="请输入保险公司名称查询" />
        <el-input v-model="listQuery.insuBranckCompanyNme" style="width: 200px;" placeholder="请输入保险分公司名称查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row style="width: 100%" size="mini">
        <el-table-column v-if="aggregate" type="expand">
          <template>
            <client-alias aggregate />
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="直保公司代码">
          <template slot-scope="scope">
            {{ scope.row.insuCompanyCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="直保公司名称">
          <template slot-scope="scope">
            {{ scope.row.insuCompanyNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="直保分公司名称">
          <template slot-scope="scope">
            {{ scope.row.insuBranckCompanyNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.crtTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建人">
          <template slot-scope="scope">
            {{ scope.row.crtCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)" />
          </template>
        </el-table-column>

      </el-table>

      <save :son-data="form" @sonStatus="status" />

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
import { getList, findById, del } from '@/api/client/company'
import Pagination from '@/components/Pagination'
import clientAlias from '../clientAlias'
import Save from './save'

export default {
  components: { Pagination, clientAlias, Save },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      search: {},
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        insuCompanyNme: undefined,
        insuBranckCompanyNme: undefined,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null
    }
  },
  created() {
    this.fetchData()
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
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSave() {
      this.form = { id: null }
      this.dialogVisible = true
    },
    handleEdit(id) {
      // 跳转到新的页面
      findById(id).then(response => {
        this.form = response.data
      })
    },

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此账户？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
          this.fetchData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    }
  }
}
</script>
