<template>
  <el-dialog title="责任信息" :visible.sync="dialogTableVisible" append-to-body width="60%">

    <el-card>
      <el-table
        v-loading="listLoading"
        :data="dutyList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelect"
      >
        <el-table-column
          type="center"
          label="选择"
          width="55"
        />
        <el-table-column
          type="selection"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" width="300">
          <template slot-scope="scope">
            {{ scope.row.prodName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="险种名称" width="300">
          <template slot-scope="scope">
            {{ scope.row.cvrgName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="责任名称" width="300">
          <template slot-scope="scope">
            {{ scope.row.responseName }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>
<script>

import { getBaseOrderDuty } from '@/api/claim/duty'

export default {
  name: 'Match',
  props: {
    treeData: Object
  },
  data() {
    return {
      dutyList: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyTreeId: '',
        sort: '+id'
      },
      multipleSeleValues: [],
      dialogTableVisible: false
    }
  },
  watch: {
    treeData: function(newVal, oldVal) {
      debugger
      if (newVal && newVal.plyTreeId) {
        this.dialogTableVisible = true
        this.listQuery.plyTreeId = newVal.plyTreeId
        this.queryData()
      }
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    }
  },

  created() {

  },
  methods: {

    handleClose() {
      this.dialogTableVisible = false
    },
    handleSelect(value) {
      this.multipleSeleValues = value
    },

    queryData() {
      this.listLoading = true
      getBaseOrderDuty(this.listQuery.plyTreeId).then(response => {
        this.dutyList = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
