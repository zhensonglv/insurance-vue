<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.dutyNo" style="width: 200px;" placeholder="请输入责任号查询" />
        <el-input v-model="listQuery.dutyDesc" style="width: 200px;" placeholder="请输入责任描述查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="queryData">查询</el-button>
        <el-button v-if="dialog" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
        <el-button v-else style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
      </div>
      <br>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        type="selection"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="dialog" type="selection" width="55" />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="责任号" width="150">
          <template slot-scope="scope">
            {{ scope.row.dutyNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="责任描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.dutyDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="服务类型起始码" width="150">
          <template slot-scope="scope">
            {{ scope.row.begSertypCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="服务类型结束码" width="150">
          <template slot-scope="scope">
            {{ scope.row.endSertypCde }}
          </template>
        </el-table-column>

        <el-table-column v-if="!dialog" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <save :son-data="form" :business-data="businessData" @sonStatus="status" />

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="queryData"
      />
    </el-card>
  </div>
</template>

<script>
import { getList, findById, del } from '@/api/base'
// import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'dutySertypMatching',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {}
    }
  },
  created() {
    /* if (this.$route.query.pubCoverId) { // 上级页面传入参数
        this.listQuery.pubCoverId = this.$route.query.pubCoverId
      }*/
    this.resetData()
    this.queryData()
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
    resetData() {
      this.listQuery.dutyNo = null
      this.listQuery.dutyDesc = null
    },
    handleSelectionChange(val) {
      this.$emit('setMultipleSeleValues', val)
    },
    queryData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    /* fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CExplCdeSubcategory'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            this[key][item.value] = item.label
          })
        }
      })
    },*/
    handleSave() {
      this.form = { id: null }
      /* if (this.$route.query.pubCoverId) { // 上级页面传入参数
          this.form.pubCoverId = this.$route.query.pubCoverId
        }*/
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
        this.queryData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
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
          this.queryData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    }
  }
}
</script>
