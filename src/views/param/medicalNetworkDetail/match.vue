<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp === 1">
      <explainNo dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp === 2">
      <hospitalManage dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp === 3 ">
      <baseArea dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import hospitalManage from '../../medical/hospitalManage'
import baseArea from '../../system/area'
export default {
  name: 'Match',
  components: { explainNo, hospitalManage, baseArea },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    matchTyp: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
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
      if (val === 1) {
        this.title = '解释码'
      } else if (val === 2) {
        this.title = '医院'
      } else if (val === 3) {
        this.title = '社保地'
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
