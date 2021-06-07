<template>
  <div class="app-container">
    <el-card>

      <div class="header">
        <div class="tit">申请信息</div>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave" />
        <el-button style="margin-left: 10px;" type="primary" @click="initResponse">初始化定责</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="calcClmData">理算</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="viewImage">影像</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="handleAnamnesis">被保人既往症设置</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="handleTrackMatch">操作轨迹</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="viewImage">历史理赔</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="viewImage">问题件</el-button>
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
        <el-table-column align="center" :show-overflow-tooltip="true" label="申请人姓名">
          <template slot-scope="scope">
            {{ scope.row.appNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="保单号">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="分单号" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.plyPartNo">
              <svg-icon slot="suffix" icon-class="search" @click="handlePart(scope.$index)" />
            </el-input>
            <part v-model="matchVisable" :insured-id="insuredId" :index="index" @matchConfirm="matchConfirm" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人id">
          <template slot-scope="scope">
            {{ scope.row.insuredId }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="申请人证件号">
          <template slot-scope="scope">
            {{ scope.row.appCertCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="客户申请号">
          <template slot-scope="scope">
            {{ scope.row.customAppNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总金额">
          <template slot-scope="scope">
            {{ scope.row.invoiceSum }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="赔付金额">
          <template slot-scope="scope">
            {{ scope.row.compensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终赔付金额">
          <template slot-scope="scope">
            {{ scope.row.finalCompensateAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="案件状态">
          <template slot-scope="scope">
            {{ caseStatus[scope.row.caseStatus] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="调查件状态">
          <template slot-scope="scope">
            {{ scope.row.questionStatus }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="问题件状态">
          <template slot-scope="scope">
            {{ scope.row.questionZhStatus }}
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
      <trackMatch :son-data="selectData" :business-data="businessData" @sonStatus="status" />
      <anamnesis :anamnesis-data="anamnesisData" />
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
import { claimRule, init, calc, findById, deleteApp, edit } from '@/api/claim/apply'
import { getList } from '@/api/base'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import duty from '../duty'
import trackMatch from '@/views/claim/apply/trackMatch'
import { mapState } from 'vuex'
import anamnesis from './anamnesis'
import part from './part'

export default {
  components: { Pagination, Save, duty, trackMatch, anamnesis, part },
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
      trackVisible: false,
      form: null,
      businessData: {},
      caseStatus: {},
      selected: [],
      selectData: null,
      anamnesisData: null,
      matchVisable: false,
      index: null,
      insuredId: null
    }
  },
  computed: mapState({
    packUpTab: state => state.tagsView.packUpTab
  }),
  watch: {
    packUpTab: {
      handler: function(v) {
        if (v) this.fetchTypeData()
      },
      immediate: true
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
        this.$store.dispatch('tagsView/toggleTab', false)
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['TrueOrFalse', 'AccidentTypes', 'CBankTyp', 'MedicalRMethod', 'caseStatus', 'caseTyp', 'caseNature', 'calcLevel'] }).then(res => {
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
    handlePart(index) {
      this.matchVisable = true
      this.index = index
      this.insuredId = this.list[index].insuredId
    },
    matchConfirm(data) {
      this.list[data.index].plyPartNo = data.value.plyPartNo
      this.updateApp(this.list[data.index])
    },
    updateApp(data) {
      edit(data).then(response => {
        if (response.code === 200) {
          this._notify(response.msg, 'success')
        } else {
          this._notify(response.msg, 'error')
        }
      })
    },
    handleAnamnesis() {
      if (this.selected.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择1条数据',
          type: 'warning'
        })
      } else {
        this.anamnesisData = { plyNo: this.selected[0].plyNo, plyPartNo: this.selected[0].plyPartNo, insuredNo: this.selected[0].insuredId }
      }
    },
    handleTrackMatch() {
      if (this.selected.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择1条数据',
          type: 'warning'
        })
      } else {
        this.selectData = { batchNo: this.selected[0].batchNo, plyPartNo: this.selected[0].plyPartNo, customAppNo: this.selected[0].customAppNo }
      }
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
          this.fetchData()
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
        debugger
        deleteApp(id).then(response => {
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
