<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.serviceLineNo" style="width: 200px;" placeholder="请输入业务线号查询" />
        <el-input v-model="listQuery.company" style="width: 200px;" placeholder="请输入公司查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column
          type="center"
          label="选择"
          width="55"
        >
          <template slot-scope="scope">
            <el-radio v-model="paramRadio" :label="scope.$index" @change.native="handleSelect(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="业务线号" width="150">
          <template slot-scope="scope">
            {{ scope.row.serviceLineNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公司" width="150">
          <template slot-scope="scope">
            {{ scope.row.company }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="生效日" width="150">
          <template slot-scope="scope">
            {{ scope.row.bgnTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止日" width="150">
          <template slot-scope="scope">
            {{ scope.row.endTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户业务线号" width="150">
          <template slot-scope="scope">
            {{ scope.row.cusSerLineNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="业务线简称" width="150">
          <template slot-scope="scope">
            {{ scope.row.servLineForshort }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="业务线全称" width="150">
          <template slot-scope="scope">
            {{ scope.row.servLineFullname }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            {{ scope.row.servLineDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
            <!--<el-button type="primary" size="mini" icon="el-icon-view" class="action-button" @click="handleRoute(scope.row.id)">查看</el-button>-->
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
import { getList, findById, del } from '@/api/base'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      basePath: 'serviceLine',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        serviceLineNo: '',
        company: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      paramRadio: false
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
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
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
      findById(this.basePath, id).then(response => {
        this.form = response.data
      })
    },

    handleRoute(id) {
      console.log(id, '--')
      this.$router.push({ path: '/system/dict', query: { id: id }})
    },

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此业务线？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(this.basePath, id).then(response => {
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
