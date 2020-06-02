<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="search.groupNme" style="width: 200px;" placeholder="请输入集团名称查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团号" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系人" width="150">
          <template slot-scope="scope">
            {{ scope.row.ccontactNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团电话" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupTel }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团手机" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupPhone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团传真" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupFax }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团地址" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupAddress }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电子邮件" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupEmail }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="地区代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.cgroupAreaCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="邮编" width="150">
          <template slot-scope="scope">
            {{ scope.row.ctheInsuredPostcode }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Actions">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <save :son-data="form" @sonStatus="status" />

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData"
      />
    </el-card>
  </div>
</template>

<script>
import { getList, findById, del } from '@/api/client/group'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      search: {},
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 3,
        importance: undefined,
        title: undefined,
        type: undefined,
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
      getList(this.listQuery, this.search).then(response => {
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
