<template>
  <el-dialog title="医院网络码" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <paramManage dialog :param-type="paramType" @setMultipleSeleValues="setMultipleSeleValues" />
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
      paramType: 'param_0015',
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
