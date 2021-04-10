<template>
  <div class="app-container">
    <el-card>

      <div class="header">
        <div class="tit">明细信息</div>
        <el-button style="margin: 0 0 10px 10px;" type="primary" icon="el-icon-edit" circle @click="handleSave" />
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
            <deduct aggregate :treat-id="treatId" />
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
        <el-table-column align="center" :show-overflow-tooltip="true" label="校验审核信息" width="150">
          <template slot-scope="scope">
            <span :class="'font-class-red'">
              {{ scope.row.auditInformation }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发票号" width="150">
          <template slot-scope="scope">
            {{ scope.row.invNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="大项号" width="150">
          <template slot-scope="scope">
            {{ scope.row.maxtermNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.serviceTyp }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="社保类型" width="150">
          <template slot-scope="scope">
            {{ CSocialinsuTyp[scope.row.secuTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="费用名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.payName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.sumAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="扣除金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.deductAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="可理算金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.reasonableAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.compensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终赔付金额" width="150">
          <template slot-scope="scope">
            {{ scope.row.finalPay }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付结论" width="150">
          <template slot-scope="scope">
            {{ AdjustmentType[scope.row.compensateResult] }}
          </template>
        </el-table-column>

        <el-table-column align="center" :show-overflow-tooltip="true" label="结论描述" width="150">
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
import { getList, findById, del } from '@/api/claim/treat'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import deduct from '../deduct'

export default {
  components: { Pagination, Save, deduct },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    invId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      treatId: null,
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
      CSocialinsuTyp: {},
      AdjustmentType: {},
      selected: []
    }
  },
  created() {
    if (this.$route.path.indexOf('claim/apply') >= 0) {
      if (this.invId) {
        this.fetchTypeData()
      }
    } else {
      this.fetchTypeData()
    }
  },
  mounted() {
  },
  methods: {
    handleSelect() {},
    expandChange(row, extend) {
      this.treatId = row.id
    },
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData(id) {
      this.listLoading = true
      getList(this.listQuery, this.invId).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['TrueOrFalse', 'CSocialinsuTyp', 'OtherCSocialinsuTyp', 'AdjustmentType'] }).then(res => {
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
      this.form = { id: null, invId: this.invId }
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
.el-table >>> .el-table__body-wrapper td {
  padding: 0;
}
.el-table >>> .el-table__header-wrapper {
  th {
    background-color: #555!important
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
