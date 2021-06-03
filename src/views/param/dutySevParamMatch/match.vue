<template>
  <el-dialog :modal="false" title="责任服务类型匹配" :visible.sync="dialogTableVisible" append-to-body width="60%">
    <!--    <dutySertypMatching dialog @setMultipleSeleValues="setMultipleSeleValues" />-->
    <proDuty dialog @setMultipleSeleValues="setMultipleSeleValues" />

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
import proDuty from '../../productData/proDuty'

export default {
  name: 'Match',
  components: { proDuty },
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
      basePath: 'proDuty',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        dutyNo: '',
        dutyDesc: '',
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
  },
  methods: {
    handleClose() {
      this.dialogTableVisible = false
    },
    setMultipleSeleValues(value) {
      this.multipleSeleValues = value
    },
    onSubmit() {
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
