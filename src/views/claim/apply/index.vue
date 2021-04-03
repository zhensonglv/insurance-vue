<template>
  <div class="app-container">
    <el-card>

      <div class="header">
        <div class="tit">申请信息</div>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave" />
        <el-button style="margin-left: 10px;" type="primary" @click="initResponse">初始化定责</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="calcClmData">理算</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="viewImage">影像</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="hangeRule">悬挂规则</el-button>

      </div>
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
        <el-table-column align="center" :show-overflow-tooltip="true" label="校验审核信息" width="150">
          <template slot-scope="scope">
            <span :class="'font-class-red'">
              {{ scope.row.auditInformation }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请人姓名" width="120">
          <template slot-scope="scope">
            {{ scope.row.appNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单号" width="120">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人id" width="120">
          <template slot-scope="scope">
            {{ scope.row.insuresId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请人证件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.appCertCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户申请号" width="120">
          <template slot-scope="scope">
            {{ scope.row.customAppNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNo }}
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
            {{ CCaseStatuses[scope.row.caseStatus] }}
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
import { claimRule, init, calc, findById, del } from '@/api/claim/apply'
import { getList } from '@/api/base'
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
      basePath: 'apply',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        batchNo: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      CCaseStatuses: {},
      selected: []
    }
  },
  mounted() {
    if (this.$route.query.batchNo) { // 上级页面传入参数
      this.listQuery.batchNo = this.$route.query.batchNo
    }
    this.fetchTypeData()
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
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['TrueOrFalse', 'AccidentTypes', 'CBankTyp', 'MedicalRMethod', 'CBatchStatus', 'CCaseStatuses'] }).then(res => {
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

    initResponse() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.$confirm('是否初始化理赔数据？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          init(this.selected).then(res => {
            if (res.code === 200) {
              this._notify('初始化成功', 'success')
            } else {
              this._notify(res.msg, 'error')
            }
            this.fetchData()
          })
        }).catch(() => {
          this._notify('已取消', 'info')
        })
      }
    },
    calcClmData() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        calc(this.selected).then(res => {
          if (res.code === 200) {
            this._notify('理算完成', 'success')
            this.hangeRule(this.selected)
          } else {
            this._notify(res.msg, 'error')
          }
          this.fetchData()
        })
      }
    },

    hangeRule(applyList) {
    /*  if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        claimRule(this.selected).then(res => {
          if (res.code === 200) {
            this._notify('悬挂规则完成', 'success')
          } else {
            this._notify(res.msg, 'error')
          }
          this.fetchData()
        })
      }*/
      claimRule(applyList).then(res => {
        if (res.code === 200) {
          this._notify('悬挂规则完成', 'success')
        } else {
          this._notify(res.msg, 'error')
        }
      })
    },

    viewImage() {

      /* let routeUrl = this.$router.resolve({
        path: "/claim/image",
        query: {id:96}
      });*/
      // window.open("/claim/image/index.html");

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
.header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .tit {
    line-height: 36px;
  }
}
.app-container >>> .el-table__expanded-cell {
  padding: 10px 20px;
  .app-container {
    padding: 0;
  }
}

.el-table >>> .el-table__body-wrapper {
  td {
    padding: 0;
  }
}
.el-table >>> .el-table__header-wrapper {
  th {
    background-color: #111
  }
}
.font-class-red {
  color: red !important;
}
</style>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
