<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入批次号查询" />
        <el-input v-model="listQuery.groupNme" style="width: 200px;" placeholder="请输入团体名称查询" />
        <el-input v-model="listQuery.plyNo" style="width: 200px;" placeholder="请输入保单号称查询" />

        <el-select v-model="listQuery.caseTyp" clearable placeholder="请选择案件流转类型">
          <el-option
            v-for="item in businessData.caseTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="listQuery.batchStatus" clearable placeholder="请选择批次状态">
          <el-option
            v-for="item in businessData.caseStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

      </div>
      <div>
        <el-input v-model="listQuery.medicalAuditor" style="width: 200px;" placeholder="请输入医疗审核人员查询" />

        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleDtl">数据明细</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleDtl">解锁</el-button>
      </div>

      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="批次号">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="保单号">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="团体名称">
          <template slot-scope="scope">
            {{ scope.row.groupNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="诊断复核人">
          <template slot-scope="scope">
            {{ scope.row.diagReviewer }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核人员">
          <template slot-scope="scope">
            {{ scope.row.medicalAuditor }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="签批人员">
          <template slot-scope="scope">
            {{ scope.row.singedStaff }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收件日">
          <template slot-scope="scope">
            {{ scope.row.comsignTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="案件数量">
          <template slot-scope="scope">
            {{ scope.row.caseNumber }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="批次案件状态">
          <template slot-scope="scope">
            {{ caseStatus[ scope.row.caseStatus ] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)" />
            </el-tooltip>
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
import { getList, findById, del } from '@/api/claim/batch'
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
        batchNo: '',
        groupNme: '',
        plyNo: '',
        batchStatus: '',
        caseTyp: '',
        medicalAuditor: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      caseStatus: {},
      selected: []
    }
  },
  created() {
    this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    handleSelect(data) {
      this.selected = data
    },
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
      this.listQuery.batchNo = null
      this.listQuery.groupNme = null
      this.listQuery.plyNo = null
      this.listQuery.batchStatus = null
      this.listQuery.batchOrigin = null
      this.listQuery.batchTyp = null
      this.listQuery.medicalAuditor = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['caseStatus', 'caseTyp', 'caseNature'] }).then(res => {
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
      this.dialogVisible = true
    },
    handleEdit(id) {
      // 跳转到新的页面
      findById(id).then(response => {
        this.form = response.data
      })
    },
    handleDtl() {
      if (this.selected.length !== 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/claim/apply', query: { batchNo: this.selected[0].batchNo }})
      }
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
<style lang='scss' scoped>
// .el-table >>> .el-table__body-wrapper td {
//   padding: 0;
// }
</style>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
