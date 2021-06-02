<template>
  <el-dialog :modal="false" :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <div v-if="matchTyp === 1">
      <paramManage dialog :set-param-data="setParamData" @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp === 2">
      <explainNo dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp === 3">
      <diagnosisMatching dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import paramManage from '../paramManage'
import explainNo from '../explainNo'
import diagnosisMatching from '../diagnosisMatching'
export default {
  name: 'Match',
  components: { paramManage, explainNo, diagnosisMatching },
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
      dialogTableVisible: false,
      title: null,
      setParamData: { paramCode: null, paramType: 'param_0015' }
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    matchTyp(val) {
      if (val === 1) {
        this.basePath = 'paramManage'
        this.title = '医院网络码'
      } else if (val === 2) {
        this.basePath = 'explainNo'
        this.title = '解释码'
      } else if (val === 3) {
        this.basePath = 'diagnosisMatching'
        this.title = '高层诊断码'
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
