<template>
  <div class="app-container">
    <el-card>

      <div>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>

      <br>
      <el-table
        v-loading="listLoading"
        class="table"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @expand-change="expandChange"
        @selection-change="handleSelect"
      >
        <el-table-column type="expand">
          <template>
            <duty aggregate :apply-id="applyId" />
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="校验审核信息" width="150">
          <template slot-scope="scope">
            {{ scope.row.auditInformation }}
          <!--  <{{ scope.row.pubCoverTyp }}-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请人姓名" width="150">
          <template slot-scope="scope">
            {{ scope.row.appNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人id" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuresId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请人证件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.appCertCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户申请号" width="150">
          <template slot-scope="scope">
            {{ scope.row.customAppNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户号" width="150">
          <template slot-scope="scope">
            {{ scope.row.acctNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户名" width="150">
          <template slot-scope="scope">
            {{ scope.row.acctNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.invoiceSum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.compensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终赔付金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.finalCompensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.caseStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="调查件状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.questionStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="问题件状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.questionZhStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="结论描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.conclusionDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
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
import { getList, findById, del } from '@/api/claim/apply'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import duty from '../duty'

export default {
  components: { Pagination, Save, duty },
  data() {
    return {
      list: null,
      applyId: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      CTeamTyp: {},
      CPubCoverTyp: {},
      selected: []
    }
  },
  created() {
    this.fetchData(2)
    this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    handleSelect(data) {
      this.selected = data
    },
    expandChange(row, extend) {
      this.applyId = row.id
    },
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData(id) {
      this.listLoading = true
      getList(this.listQuery, id).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
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
.app-container >>> .el-table__expanded-cell {
  padding: 10px 20px;
  .app-container {
    padding: 0;
  }
}

.el-table >>> .el-table__body-wrapper td {
  padding: 0;
}
</style>
