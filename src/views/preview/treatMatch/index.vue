<template>
  <el-dialog :title="diagTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="90%">
    <div class="app-container">
      <el-card>
        <div>
          <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入批次号查询" />
          <el-select v-model="listQuery.matchStatus" clearable placeholder="请选择">
            <el-option
              v-for="item in businessData.matchStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="listQuery.taskId" style="width: 200px;" placeholder="请输入任务id" />
          <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchSave">批量保存</el-button>
        </div>
        <br>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index +1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请号" width="200">
            <template slot-scope="scope">
              {{ scope.row.batchNo }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="任务id" width="200">
            <template slot-scope="scope">
              {{ scope.row.taskId }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="任务名称" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.matchName" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="匹配结果" width="300">
            <template slot-scope="scope">
              <el-select v-model="scope.row.selectValue" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="检索" width="300">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.selectSearchValue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入诊疗描述(支持模糊查询)"
                :remote-method="remoteDiagMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in treatList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="save(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="fetchData"
        />
      </el-card>
    </div>
    <div slot="footer" align="center" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
      <el-button type="primary" @click="onSubmit">
        匹配完成
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { batchSave, edit, getList, taskMatchConfirm } from '@/api/preview/base'
import { getCodeList, getTreat } from '@/api/preview/code'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    batchNo: String
  },
  data() {
    return {
      list: null,
      listLoading: true,
      diagTitle: '文本匹配',
      basePath: 'treatMatchTask',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id',
        batchNo: '',
        matchStatus: '',
        taskId: ''
      },
      total: 0,
      loading: false,
      dialogVisible: false,
      businessData: [],
      treatList: [],
      selected: []
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
      if (this.dialogVisible === true) {
        this.listQuery.batchNo = this.batchNo
        // this.listQuery.matchStatus = 1
        this.fetchTypeData()
      }
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {
    // this.fetchData()
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
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['matchStatus'] }).then(res => {
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
    handleSelect(data) {
      this.selected = data
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },

    remoteDiagMethod(query) {
      if (query !== '' && query.length >= 2) {
        this.treatList = []
        this.loading = true
        this.getTreat(query)
      } else {
        this.treatList = []
      }
    },
    getTreat(data) {
      getTreat({ treatDesc: data }).then(response => {
        this.treatList = response.data
        this.loading = false
      })
    },
    save(row) {
      edit(this.basePath, row).then(response => {
        if (response.code === 200) {
          this._notify(response.msg, 'success')
        } else {
          this._notify(response.msg, 'error')
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    batchSave() {
      if (this.selected.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        batchSave(this.basePath, this.selected).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
        })
      }
    },
    onSubmit() {
      this.$confirm('是否已保存数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        taskMatchConfirm('inputAppInfo', { batchNo: this.listQuery.batchNo }).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
            this.$emit('sonStatus', true)
            this.dialogVisible = false
          } else {
            this._notify(response.msg, 'error')
          }
        })
      }).catch(() => {
        this._notify('已取消', 'info')
      })
    }
  }
}
</script>
