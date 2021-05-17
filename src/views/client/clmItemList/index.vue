<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.busiSource" style="width: 200px;" placeholder="请输入来源查询" />
        <el-input v-model="listQuery.itemId" style="width: 200px;" placeholder="请输入项目ID查询" />
        <el-input v-model="listQuery.itemClass" style="width: 200px;" placeholder="请输入医保等级查询" />
        <el-input v-model="listQuery.custPayRate" style="width: 200px;" placeholder="请输入扣费比例查询" />
        <el-input v-model="listQuery.cityLife" style="width: 200px;" placeholder="请输入城市代码查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="来源" width="250">
          <template slot-scope="scope">
            {{ scope.row.busiSource }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="项目ID" width="250">
          <template slot-scope="scope">
            {{ scope.row.itemId }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医保等级" width="250">
          <template slot-scope="scope">
            {{ scope.row.itemClass }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="扣费比例" width="250">
          <template slot-scope="scope">
            {{ scope.row.custPayRate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="城市代码" width="250">
          <template slot-scope="scope">
            {{ scope.row.cityLife }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
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
        @pagination="fetchData"
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
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'clmItemList',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {}
      // DiaMatchTyp: {}
    }
  },
  created() {
    /* if (this.$route.query.pubCoverId) { // 上级页面传入参数
          this.listQuery.pubCoverId = this.$route.query.pubCoverId
        }*/
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
        debugger
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
        this.fetchData()
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
          this.fetchData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    }
  }
}
</script>
