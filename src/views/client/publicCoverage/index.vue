<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.teamNo" style="width: 200px;" placeholder="请输入集团/团体号称查询" />
        <el-select v-model="listQuery.teamTyp" placeholder="请选择集团/团体类型">
          <el-option
            v-for="item in businessData.CTeamTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="listQuery.pubCoverTyp" placeholder="请选择公共保额类型">
          <el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        <el-table-column align="center" label="公共保额类型" width="150">
          <template slot-scope="scope">
            {{ CPubCoverTyp[scope.row.pubCoverTyp] }}
          <!--  <{{ scope.row.pubCoverTyp }}-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团/团体类型" width="150">
          <template slot-scope="scope">
            {{ CTeamTyp[scope.row.teamTyp] }}
            <!-- {{ scope.row.teamTyp }}-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="集团/团体号" width="150">
          <template slot-scope="scope">
            {{ scope.row.teamNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="起始日" width="150">
          <template slot-scope="scope">
            {{ scope.row.startTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止日" width="150">
          <template slot-scope="scope">
            {{ scope.row.endTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公共保额总金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.pubCoverLimit }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品" width="150">
          <template slot-scope="scope">
            {{ scope.row.product }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="已用公共保额" width="150">
          <template slot-scope="scope">
            {{ scope.row.pubCoverUsed }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公共保额说明" width="150">
          <template slot-scope="scope">
            {{ scope.row.pubCoverDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
            <el-button type="info" size="mini" icon="el-icon-edit" class="action-button" @click="handleRoute(scope.row.id)">保额详细</el-button>
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
import { getList, findById, del } from '@/api/client/publicCoverage'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        teamTyp: '',
        teamNo: '',
        pubCoverTyp: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      CTeamTyp: {},
      CPubCoverTyp: {}
    }
  },
  created() {
    this.fetchData()
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
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
      this.listQuery.teamTyp = null
      this.listQuery.teamNo = null
      this.listQuery.pubCoverTyp = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CTeamTyp', 'CPubCoverTyp'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            this[key][item.value] = item.label
          })
        }
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
    handleRoute(data) {
      this.$router.push({ path: '/client/plyPartPubCov', query: { pubCoverId: data }})
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
