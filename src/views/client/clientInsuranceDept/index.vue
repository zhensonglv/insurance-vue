<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.deptNo" style="width: 200px;" placeholder="投保单位号" />
        <el-input v-model="listQuery.deptNme" style="width: 200px;" placeholder="投保单位名称" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row style="width: 100%" size="mini">
        <el-table-column v-if="aggregate" type="expand">
          <template>
            <group />
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位标识号">
          <template slot-scope="scope">
            {{ scope.row.deptNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团名称">
          <template slot-scope="scope">
            {{ scope.row.groupNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位名称">
          <template slot-scope="scope">
            {{ scope.row.deptNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位类型">
          <template slot-scope="scope">
            {{ scope.row.deptTyp }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位行业码">
          <template slot-scope="scope">
            {{ scope.row.deptIndustryCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位号">
          <template slot-scope="scope">
            {{ scope.row.deptClientNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDel(scope.row.id)" />
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
import group from '../group'
import Save from './save'

export default {
  components: { Pagination, Save, group },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      basePath: 'clientInsuranceDept',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        deptNo: '',
        deptNme: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null
    }
  },
  created() {
    debugger
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

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      debugger
      this.$confirm('你确定永久删除此投保单位信息？, 是否继续?', '提示', {
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
