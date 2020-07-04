<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.plyNo" style="width: 200px;" placeholder="请输入保单标识号" />
        <el-input v-model="listQuery.certCde" style="width: 200px;" placeholder="请输入证件号" />
        <el-input v-model="listQuery.plyPartNo" style="width: 200px;" placeholder="请输入分单号" />
        <el-input v-model="listQuery.insuredNme" style="width: 200px;" placeholder="请输入被保险人姓名" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单标识号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保险人姓名" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuredNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单名" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="证件类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCls }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="证件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保等级" width="150">
          <template slot-scope="scope">
            {{ scope.row.insLv }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="理赔悬挂" width="150">
          <template slot-scope="scope">
            {{ scope.row.claimSuspend }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保全悬挂" width="150">
          <template slot-scope="scope">
            {{ scope.row.preserveSuspend }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="特别约定" width="150">
          <template slot-scope="scope">
            {{ scope.row.specialAppoint }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单责任生效起期" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyDutyStartTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单责任生效止期" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyDutyEndTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
            <el-button type="primary" size="mini" icon="el-icon-view" class="action-button" @click="handleRoute(scope.row.id)">查看</el-button>
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
      basePath: 'plyPart',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyNo: undefined,
        certCde: undefined,
        plyPartNo: undefined,
        insuredNme: undefined,
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
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
      this.listQuery.plyNo = null
      this.listQuery.certCde = null
      this.listQuery.plyPartNo = null
      this.listQuery.insuredNme = null
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
      this.$confirm('你确定永久删除此配置？, 是否继续?', '提示', {
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
