<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <dataMatch dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import dataMatch from '../../productData/dataMatch'
export default {
  name: 'Match',
  components: { dataMatch },
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
      basePath: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      multipleSeleValues: [],
      dialogTableVisible: false,
      title: null
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
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
