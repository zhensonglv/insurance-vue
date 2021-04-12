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

import { getPlyTree } from '@/api/claim/duty'

export default {
  name: 'Match',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    plyInfo: Object

  },
  data() {
    return {
      dutyList: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyNo: '',
        plyPartNo: '',
        sort: '+id'
      },
      multipleSeleValues: [],
      dialogTableVisible: false,
      paramRadio: false
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
      this.queryData()
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
      this.listQuery.plyNo = this.plyInfo.plyNo
      this.listQuery.plyPartNo = this.plyInfo.plyPartNo
      this.listLoading = true
      getPlyTree(this.listQuery).then(response => {
        this.dutyList = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
      this.plyInfo = null
    }
  }
}
</script>
