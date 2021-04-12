<template>
  <div class="app-container">
    <el-card>

      <div class="header">
        <div class="tit">就诊信息</div>
        <el-button style="margin: 0 0 10px 10px;" type="primary" icon="el-icon-edit" circle @click="handleSave" />
        <el-button style="margin-left: 10px;" type="primary" @click="combineVisit">合并就诊</el-button>

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
            <inv aggregate :visit-id="visitId" />
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

        <el-table-column align="center" :show-overflow-tooltip="true" label="医院名称">
          <template slot-scope="scope">
            {{ scope.row.hospitalNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊类型">
          <template slot-scope="scope">
            {{ ClinicType[scope.row.docTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊起始日">
          <template slot-scope="scope">
            {{ scope.row.docBgnTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊终止日">
          <template slot-scope="scope">
            {{ scope.row.docEndTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="诊断描述">
          <template slot-scope="scope">
            {{ scope.row.diagDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总金额">
          <template slot-scope="scope">
            {{ scope.row.invoiceSum }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="扣除金额">
          <template slot-scope="scope">
            {{ scope.row.deductAmt }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="可理算金额">
          <template slot-scope="scope">
            {{ scope.row.clacAmt }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="赔付金额">
          <template slot-scope="scope">
            {{ scope.row.compensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付结论">
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
import { getList, findById, deleteVisit, combineVisit } from '@/api/claim/visit'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import inv from '../inv'

export default {
  components: { Pagination, Save, inv },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    dutyId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      visitId: null,
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
      AdjustmentType: {},
      selected: [],
      ClinicType: {}
    }
  },
  created() {
    if (this.$route.path.indexOf('claim/apply') >= 0) {
      if (this.dutyId) {
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
      this.visitId = row.id
    },
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData() {
      this.listLoading = true
      console.log(this.dutyId)
      getList(this.listQuery, this.dutyId).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    combineVisit() {
      if (this.selected.length <= 1) {
        this.$message({
          showClose: true,
          message: '请选择多条数据',
          type: 'warning'
        })
      } else {
        this.$confirm('是否合并就诊数据？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          combineVisit(this.selected).then(res => {
            if (res.code === 200) {
              this._notify('合并成功', 'success')
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
    handleSave() {
      this.form = { id: null, dutyId: this.dutyId }
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
        deleteVisit(id).then(response => {
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
    background-color: #333!important
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
