<template>
  <div>
    <div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="95">
          <template slot-scope="scope">
            <el-button type="text" size="mini" class="action-button" @click="set(scope.row.id)">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="paramDesc" label="基础参数名称" width="150" />
        <el-table-column align="center" prop="paramCode" label="参数码" width="150" />
        <el-table-column align="center" prop="paramDesc" label="描述" width="150" />
        <el-table-column align="center" prop="isValid" label="状态" width="150" />
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
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
    </div>
    <saveTreeDialog :son-data="form" :dialog-visible="dialogVisible" @sonStatus="status" />
    <setDialog :id="rowId" :set-dialog-visible="setDialogVisible" />
  </div>
</template>

<script>
import { del, findById, getList } from '@/api/base'
import Pagination from '@/components/Pagination'
import saveTreeDialog from './saveTreeDialog'
import setDialog from './setDialog'

export default {
  components: { Pagination, saveTreeDialog, setDialog },
  props: {
    treeId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: [],
      rowId: null,
      setDialogVisible: false,
      basePath: 'plyTreeSetParam',
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyTreeId: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      treeQuery: {
        dataNo: null,
        level: null
      },
      form: null,
      treeData: []
    }
  },
  watch: {
    treeId: {
      handler(v) {
        this.fetchData()
      },
      immediate: true
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
    set(row) {
      this.rowId = row.id
      this.setDialogVisible = true
    },
    fetchData() {
      // this.listLoading = true
      this.listQuery.plyTreeId = this.treeId
      this.listQuery.type = 1
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
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
      this.$confirm('你确定永久删除此集团？, 是否继续?', '提示', {
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
<style lang="scss" scoped>
// .left {
//   float: left;
//   width: 40%;
// }
// .right {
//   display: inline-block;
//   width: 50%;
//   clear: left;
// }
// .action {
//   margin-left: 50px;
// }

</style>
