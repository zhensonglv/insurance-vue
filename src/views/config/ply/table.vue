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
            <el-button type="text" size="mini" class="action-button" @click="set(scope.row)">设置</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="type == 1 ? '基础参数名称' : '通用参数名称'" width="150">
          <template slot-scope="scope">
            {{ CParamTyps[scope.row.paramType] }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="paramCode" label="参数码" width="150" />
        <el-table-column align="center" prop="paramDesc" label="描述" width="150" />
        <el-table-column align="center" prop="isValid" label="状态" width="150" />
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.id != null" type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
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
    <setDialog :son-data="paramData" :set-dialog-visible="setDialogVisible" @sonStatus="status" />
  </div>
</template>

<script>
import { del, getList } from '@/api/base'
import Pagination from '@/components/Pagination'
import { getCodeList } from '@/api/code'
import setDialog from './setDialog'

export default {
  components: { Pagination, setDialog },
  props: {
    setTreeData: Object,
    type: Number
  },
  data() {
    return {
      list: [
      ],
      paramData: null,
      treeType: null,
      treeId: null,
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
      treeQuery: {
        dataNo: null,
        level: null
      },
      treeData: [],
      selectData: {}
    }
  },
  watch: {
    setTreeData: {
      handler(v) {
        this.treeType = v.type
        this.treeId = v.id
        this.fetchTypeData()
      },
      immediate: true
    }
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    set(data) {
      this.paramData = data
      this.paramData.treeType = this.treeType
      this.setDialogVisible = true
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CParamTyps'] }).then(res => {
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
    },
    fetchData() {
      // this.listLoading = true
      this.listQuery.plyTreeId = this.treeId
      this.listQuery.type = this.type
      getList(this.basePath, this.listQuery).then(({ data }) => {
        if (data) {
          this.list = data.data
          this.total = data.total
        }
        this.listLoading = false
      })
    },
    status(data) {
      if (data) {
        this.fetchTypeData()
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
