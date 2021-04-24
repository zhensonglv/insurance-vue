<template>
  <el-dialog title="账单诊断" :visible.sync="dialogTableVisible" append-to-body width="45%">

    <el-card>
      <el-table
        v-loading="listLoading"
        :data="diagList"
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
        >
          <template slot-scope="scope">
            <el-radio v-model="paramRadio" :label="scope.$index" @change.native="handleSelect(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="险种名称" width="300">
          <template slot-scope="scope">
            {{ scope.row.diagCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="责任名称" width="300">
          <template slot-scope="scope">
            {{ scope.row.diagDesc }}
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

import { getDiag } from '@/api/claim/treat'

export default {
  name: 'Match',
  props: {
    value: Boolean,
    invId: Number
  },
  data() {
    return {
      diagList: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        invId: '',
        sort: '+id'
      },
      multipleSeleValues: [],
      dialogTableVisible: false,
      paramRadio: false
    }
  },
  watch: {
    value: {
      handler(v) {
        if (v) {
          this.listQuery.invId = this.invId
          this.dialogTableVisible = v
          this.queryData()
        }
      },
      immediate: true
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
      getDiag(this.listQuery.invId).then(response => {
        this.diagList = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$emit('matchConfirmDiag', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
