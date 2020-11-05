<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp == 1">
      <explainNo dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else>
      <treatmentMesManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
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
import explainNo from '../../param/explainNo'
import treatmentMesManage from '../../param/treatmentMesManage'
export default {
  name: 'Match',
  components: { explainNo, treatmentMesManage },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    matchTyp: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'explainNo',
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
    matchTyp(val) {
      if (val === 1) {
        this.basePath = 'explainNo'
        this.title = '解释码'
      } else {
        this.basePath = 'treatmentMesManage'
        this.title = '诊断码'
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
