<template>
  <el-dialog :modal="false" title="诊断码" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp === 3">
      <diagnosisMatching dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else>
      <diagnosisManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import diagnosisManage from '../diagnosisManage'
import diagnosisMatching from '../diagnosisMatching'
export default {
  name: 'Match',
  components: { diagnosisManage, diagnosisMatching },
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
      basePath: 'diagnosisManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        diaCde: '',
        diaDesc: '',
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
    },
    matchTyp(val) {
      if (val === 1 || val === 2) {
        this.basePath = 'diagnosisManage'
        this.title = '诊断管理'
      } else if (val === 3) {
        this.basePath = 'diagnosisMatching'
        this.title = '高层诊断码'
      }
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
