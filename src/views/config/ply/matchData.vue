<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <dataMatch dialog :query-data="queryData" @setMultipleSeleValues="setMultipleSeleValues" />
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
import DataMatch from '../../productData/dataMatch'
export default {
  name: 'Match',
  components: { DataMatch },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    matchNoTyp: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      multipleSeleValues: [],
      dialogTableVisible: false,
      title: null,
      queryData: null
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    matchNoTyp(val) {
      this.queryData = { noTyp: val }
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
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
