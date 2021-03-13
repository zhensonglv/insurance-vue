<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.ciRateCde" style="width: 200px;" placeholder="请输入赔付比例码查询" />
        <el-input v-model="listQuery.ciRateTyp" style="width: 200px;" placeholder="请输入赔付比例类型查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleRoute">代码类型</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleLadder">阶梯比例</el-button>
      </div>
      <br>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
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

        <el-table-column align="center" label="赔付比例码" width="200">
          <template slot-scope="scope">
            {{ scope.row.ciRateCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="阶梯" width="200">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.ladderCde] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付比例" width="200">
          <template slot-scope="scope">
            {{ scope.row.ciRate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付比例类型" width="150">
          <template slot-scope="scope">
            {{ CiRateTyp[scope.row.ciRateTyp] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院网络码" width="200">
          <template slot-scope="scope">
            {{ scope.row.medicalNetwork }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="就诊原因" width="200">
          <template slot-scope="scope">
            {{ QuotaVisitReason[scope.row.visitReson] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="账单类型" width="200">
          <template slot-scope="scope">
            {{ CiRateBillTyp[scope.row.billTyp] }}
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
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'ciRate',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      CiRateTyp: {},
      TrueOrFalse: {},
      QuotaVisitReason: {},
      CiRateBillTyp: {},
      selected: null,
      paramRadio: false
    }
  },
  created() {
    if (this.$route.query.paramCde) { // 上级页面传入参数
      this.listQuery.ciRateCde = this.$route.query.paramCde
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

    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
    },
    handleRoute() {
      if (this.selected == null) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/param/codeConfig', query: { paramCde: this.selected.ciRateCde, linkId: this.selected.id }})
      }
    },

    handleLadder() {
      if (this.selected == null) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        if (this.selected.ladderCde === '0') {
          this.$message({
            showClose: true,
            message: '非阶梯比例',
            type: 'warning'
          })
        } else {
          this.$router.push({ path: '/param/ciRateDetail', query: { paramCde: this.selected.ciRateCde, linkId: this.selected.id }})
        }
      }
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
      getCodeList({ parent: ['CiRateTyp', 'TrueOrFalse', 'QuotaVisitReason', 'CiRateBillTyp', 'CiRateCondition', 'CDocTyp', 'CiTreatmentTyp'] }).then(res => {
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
