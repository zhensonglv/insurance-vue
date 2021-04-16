<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp == 1">
      <diagnosisManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp == 2">
      <diagnosisManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp == 3">
      <diagnosisMatching dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp == 4">
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
import diagnosisManage from '../../param/diagnosisManage'
import diagnosisMatching from '../../param/diagnosisMatching'
import explainNo from '../../param/explainNo'
import treatmentMesManage from '../../param/treatmentMesManage'

export default {
  name: 'Match',
  components: { diagnosisManage, diagnosisMatching, explainNo, treatmentMesManage },
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
      // paramType: 'param_0015',
      list: null,
      listLoading: true,
      basePath: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        diaCde: '',
        diaDesc: '',
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
    matchTyp(val) {
      debugger
      if (val === 1) {
        this.basePath = 'diagnosisManage'
        this.title = '诊断码'
      } else if (val === 2) {
        this.basePath = 'diagnosisManage'
        this.title = '诊断码'
      } else if (val === 3) {
        this.basePath = 'diagnosisMatching'
        this.title = '高层诊断码'
      } else if (val === 4) {
        this.basePath = 'explainNo'
        this.title = '解释码'
      } else if (val === 5) {
        this.basePath = 'treatmentMesManage'
        this.title = '诊断码'
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
