<template>
  <el-dialog title="医院网络码" :visible.sync="dialogTableVisible" append-to-body>
    <paramManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import { getList } from '@/api/base'
import paramManage from '../paramManage'
export default {
  name: 'Match',
  components: { paramManage },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'paramManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        prodCde: '',
        applyTyp: '',
        paramterTyp: '',
        paramterDesc: '',
        sort: '+id'
      },
      total: 0,
      multipleSeleValues: [],
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {
    /* this.listQuery.paramterTyp = 'param_0015'*/
    /* this.queryData()*/
  },
  methods: {
    queryData() {
      debugger
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleClose() {
      this.dialogTableVisible = false
    },
    setMultipleSeleValues(value) {
      this.multipleSeleValues = value
    },
    onSubmit() {
      debugger
      if (this.multipleSeleValues.length > 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
