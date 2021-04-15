<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp === 1">
      <product dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp === 2">
      <insuranceType dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else>
      <proDuty dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import product from '../product'
import insuranceType from '../insuranceType'
import proDuty from '../proDuty'
export default {
  name: 'Match',
  components: { product, insuranceType, proDuty },
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
    matchTyp(val) {
      debugger
      if (val === 1) {
        this.basePath = 'product'
        this.title = '产品'
      } else if (val === 2) {
        this.basePath = 'insuranceType'
        this.title = '险种'
      } else {
        this.basePath = 'proDuty'
        this.title = '责任'
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
