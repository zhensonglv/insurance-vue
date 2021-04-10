<template>
  <el-dialog title="诊疗信息" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <treatmentMesManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
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

import treatmentMesManage from '../../param/treatmentMesManage'
export default {
  name: 'Match',
  components: { treatmentMesManage },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'treatmentMesManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        explCde: '',
        explCdeDesc: '',
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
    index(val) {
      this.index = val
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
      this.$emit('matchConfirm', { index: this.index, value: this.multipleSeleValues })
      this.dialogTableVisible = false
    }
  }
}
</script>
