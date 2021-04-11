<template>
  <div class="app-container">
    <el-card>

      <div class="header">
        <div class="tit">账单信息</div>
        <el-button style="margin: 0 0 10px 10px;" type="primary" icon="el-icon-edit" circle @click="handleSave" />
        <el-button style="margin-left: 10px;" type="primary" @click="copyInv">复制</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="splitInv">拆分</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @expand-change="expandChange"
        @selection-change="handleSelect"
      >
        <el-table-column v-if="aggregate" type="expand">
          <template>
            <treat aggregate :inv-id="invId" />
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
        />
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="校验审核信息">
          <template slot-scope="scope">
            <span :class="'font-class-red'">
              {{ scope.row.auditInformation }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊类型">
          <template slot-scope="scope">
            {{ ClinicType[scope.row.docTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="账单类型">
          <template slot-scope="scope">
            {{ CiRateBillTyp[scope.row.billTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发票地区">
          <template slot-scope="scope">
            {{ InInvoice[scope.row.invArea] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发票号">
          <template slot-scope="scope">
            {{ scope.row.invNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="发票总金额">
          <template slot-scope="scope">
            {{ scope.row.sumAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="扣除金额">
          <template slot-scope="scope">
            {{ scope.row.deductAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="可理算金额">
          <template slot-scope="scope">
            {{ scope.row.reasonableAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付金额">
          <template slot-scope="scope">
            {{ scope.row.compensateAmt }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="content" label="赔付结论">
          <template slot-scope="scope">
            {{ AdjustmentType[scope.row.compensateResult] }}
          </template>
        </el-table-column>

        <el-table-column align="center" :show-overflow-tooltip="true" label="结论描述">
          <template slot-scope="scope">
            {{ scope.row.conclusionDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">

          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="账单明细" placement="top-start">
              <el-button type="primary" size="mini" icon="el-icon-search" class="action-button" @click="handleInvdtl(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <save :son-data="form" :business-data="businessData" @sonStatus="status" />
      <invdtl :son-inv-data="invdtlForm" :business-data="businessData" @sonStatus="status" />
      <copy :son-copy-data="copyVal" @sonStatus="status" />

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
import { getList, findById, del, splitInv } from '@/api/claim/inv'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import treat from '../treat'
import Invdtl from '@/views/claim/inv/invdtl'
import Copy from '@/views/claim/inv/copy'

export default {
  components: { Pagination, Save, treat, Invdtl, Copy },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    visitId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      invId: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      dialogInvVisible: false,
      dialogCopyVisible: false,
      form: null,
      invdtlForm: null,
      businessData: {},
      CTeamTyp: {},
      CPubCoverTyp: {},
      AdjustmentType: {},
      selected: [],
      CiRateBillTyp: {},
      copyVal: []
    }
  },
  created() {
    if (this.$route.path.indexOf('claim/apply') >= 0) {
      if (this.visitId) {
        this.fetchTypeData()
      }
    } else {
      this.fetchTypeData()
    }
  },
  mounted() {
  },
  methods: {
    handleSelect(data) {
      this.selected = data
    },
    expandChange(row, extend) {
      this.invId = row.id
    },

    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData(id) {
      this.listLoading = true
      getList(this.listQuery, this.visitId).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['TrueOrFalse', 'CiRateBillTyp', 'AdjustmentType', 'ClinicType', 'InInvoice', 'CInvoiceTyp', 'YesorNo'] }).then(res => {
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
    copyInv() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.handleCopy()
      }
    },
    handleCopy() {
      this.copyVal = this.selected
      this.dialogCopyVisible = true
    },
    splitInv() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.selected.length === this.list.length) {
        this.$message({
          showClose: true,
          message: '不可选择全部发票',
          type: 'warning'
        })
      } else {
        this.$confirm('是否拆分发票数据？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          splitInv(this.selected).then(res => {
            if (res.code === 200) {
              this._notify('拆分成功', 'success')
              this.$store.dispatch('tagsView/toggleTab', true)
            } else {
              this._notify(res.msg, 'error')
            }
          })
        }).catch(() => {
          this._notify('已取消', 'info')
        })
      }
    },

    handleInvdtl(id) {
      this.dialogInvVisible = true
      findById(id).then(response => {
        this.invdtlForm = response.data
      })
    },
    handleSave() {
      this.form = { id: null, visitId: this.visitId }
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
      } else {
        this.$store.dispatch('tagsView/toggleTab', !data)
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
.el-table >>> .el-table__body-wrapper td {
  padding: 0;
}
.el-table >>> .el-table__header-wrapper {
  th {
    background-color: #444!important
  }
}
.font-class-red {
  color: red !important;
}
.header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .tit {
    line-height: 36px;
  }
}
</style>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
