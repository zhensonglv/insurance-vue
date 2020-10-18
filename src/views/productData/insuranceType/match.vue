<template>
  <el-dialog title="业务线" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <serviceLine dialog :param-type="paramType" @setMultipleSeleValues="setMultipleSeleValues" />
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
import serviceLine from '../../param/serviceLine'
export default {
  name: 'Match',
  components: { serviceLine },
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
      basePath: 'serviceLine',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        servLineFullname: '',
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
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
