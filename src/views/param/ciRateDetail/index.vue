<template>
  <div class="app-container">
    <el-card>
      <div>

        <el-input v-model="listQuery.ciRateCde" style="width: 200px;" placeholder="请输入赔付比例码查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="赔付比例码" width="150">
          <template slot-scope="scope">
            {{ scope.row.ciRateCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="起始金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.startAmount }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.endAmont }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="赔付比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.ciRate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊起始次数" width="150">
          <template slot-scope="scope">
            {{ scope.row.startConsultNumb }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊终止次数" width="150">
          <template slot-scope="scope">
            {{ scope.row.endConsultNumb }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
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
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'ciRateDetail',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        ciRateCde: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {}
    }
  },
  created() {
    /* if (this.$route.query.amountCode) { // 上级页面传入参数
      this.listQuery.amountCode = this.$route.query.amountCode
    }*/
    // this.fetchData()
    this.fetchTypeData()
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
    resetData() {
      this.listQuery.ciRateCde = null
    },
    fetchTypeData() {
      // 获取codeList
      var parantData = ['CNormTyp']
      getCodeList({ parent: parantData }).then(res => {
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
    handleSave() {
      this.form = { id: null, ciRateCde: this.listQuery.ciRateCde }
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
