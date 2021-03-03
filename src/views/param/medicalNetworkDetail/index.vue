<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.mediNetworkCde" style="width: 200px;" placeholder="请输入医院网络码查询" />
        <el-input v-model="listQuery.isInclude" style="width: 200px;" placeholder="请输入是否包括查询" />
        <el-input v-model="listQuery.explainCde" style="width: 200px;" placeholder="请输入结论说明码查询" />
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

        <el-table-column align="center" label="医院网络码" width="150">
          <template slot-scope="scope">
            {{ scope.row.mediNetworkCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否包括" width="150">
          <template slot-scope="scope">
            {{ scope.row.isInclude }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="结论说明码" width="150">
          <template slot-scope="scope">
            {{ scope.row.explainCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院号" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院码描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalNoDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院等级" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalLevel }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院性质" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="社保地区" width="150">
          <template slot-scope="scope">
            {{ scope.row.sociInsuArea }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否使用医保卡" width="150">
          <template slot-scope="scope">
            {{ scope.row.isuseMedCard }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="统筹金额是否大于0" width="150">
          <template slot-scope="scope">
            {{ scope.row.overallAmtFlag }}
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
import { getCodeList } from '@/api/code'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'medicalNetworkDetail',
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
    if (this.$route.query.paramCde) { // 上级页面传入参数
      this.listQuery.mediNetworkCde = this.$route.query.paramCde
    }
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
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CiTreatmentTyp'] }).then(res => {
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
