<template>
  <el-dialog :title="diagTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="90%">
    <div class="app-container">
      <el-card>
        <div>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="appHange">申请悬挂</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index +1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" :show-overflow-tooltip="true" width="200">
            <template slot-scope="scope">
              {{ scope.row.appNme }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="被保人id" width="100">
            <template slot-scope="scope">
              {{ scope.row.insuredId }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="证件类型" width="100">
            <template slot-scope="scope">
              {{ scope.row.certCls }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="证件号" :show-overflow-tooltip="true" width="150">
            <template slot-scope="scope">
              {{ scope.row.certCde }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请日期" width="150">
            <template slot-scope="scope">
              {{ scope.row.appTm }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="账单张数" width="100">
            <template slot-scope="scope">
              {{ scope.row.invNum }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="悬挂原因" width="150">
            <template slot-scope="scope">
              {{ scope.row.applyHangType }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="悬挂备注" width="200">
            <template slot-scope="scope">
              {{ scope.row.applyHangCause }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleFinish(scope.row.id)">完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card>
        <div>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="invHange">账单悬挂</el-button>
        </div>
        <br>
        <el-table v-loading="listInvLoading" :data="invList" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index +1 }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="发票号" width="200">
            <template slot-scope="scope">
              {{ scope.row.invNo }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="诊断" width="200">
            <template slot-scope="scope">
              {{ scope.row.diagDesc }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="就诊日期" width="200">
            <template slot-scope="scope">
              {{ scope.row.outpatientTm }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="入院日期" width="200">
            <template slot-scope="scope">
              {{ scope.row.inHospBgnTm }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="出院日期" width="200">
            <template slot-scope="scope">
              {{ scope.row.inHospEndTm }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="医院名称" width="200">
            <template slot-scope="scope">
              {{ scope.row.hospName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="科室" width="200">
            <template slot-scope="scope">
              {{ scope.row.hospitalDepart }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="账单类型" width="80">
            <template slot-scope="scope">
              {{ scope.row.invTyp }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否特需" width="80">
            <template slot-scope="scope">
              {{ scope.row.isMust }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="悬挂类型" width="80">
            <template slot-scope="scope">
              {{ scope.row.clmHangType }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="悬挂原因" width="80">
            <template slot-scope="scope">
              {{ scope.row.clmHangCause }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="悬挂备注" width="80">
            <template slot-scope="scope">
              {{ scope.row.clmHangRemark }}
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="invTotal>0"
          :total="invTotal"
          :page.sync="invQuery.pageNum"
          :limit.sync="invQuery.pageSize"
          @pagination="fetchInvData"
        />
      </el-card>
    </div>
    <div slot="footer" align="center" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getList, batchSave, handleFinish } from '@/api/preview/base'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    appPkId: Number
    // businessData: Object
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listInvLoading: true,
      invList: null,
      diagTitle: '诊断复核',
      basePath: 'inputAppInfo',
      invPath: 'inputInvInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        id: '',
        sort: '+id'
      },
      invQuery: {
        pageNum: 1,
        pageSize: 10,
        appPkId: '',
        sort: '+id'
      },
      total: 0,
      invTotal: 0,
      loadDiag: false,
      loadDiag1: false,
      loadDiag2: false,
      diagList: [],
      diagList1: [],
      diagList2: [],
      businessData: {},
      selected: [],
      dialogVisible: false
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
      if (this.dialogVisible === true) {
        this.listQuery.id = this.appPkId
        this.fetchData()
      }
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.fetchData()
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
    handleClose() {
      this.dialogVisible = false
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        if (this.list.length > 0) {
          this.invQuery.appPkId = this.list[0].id
          this.fetchInvData()// 默认查询出第一条
        } else {
          this.listInvLoading = false
          this.invList = []
        }
      })
    },
    fetchInvData() {
      this.listInvLoading = true
      this.diagList = []
      this.loadDiag = false
      getList(this.invPath, this.invQuery).then(response => {
        this.invList = response.data.data
        this.invTotal = response.data.total
        this.listInvLoading = false
      })
    },
    handleFinish(id) {
      this.$confirm('是否已保存数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleFinish(this.basePath, { id: this.invQuery.appPkId }).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
            this.dialogVisible = false
            this.$emit('sonStatus', true)
          } else {
            this._notify(response.msg, 'error')
          }
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    },
    appHange() {

    },
    invHange() {

    },
    handleSelect(data) {
      this.selected = data
    },
    batchSave() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        batchSave(this.invPath, this.selected).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
        })
      }
    }

  }
}
</script>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
