<template>
  <el-dialog title="分单信息" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <clientInsured :insured-id="insuredId" dialog @setMultipleSeleValues="setMultipleSeleValues" />
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

import clientInsured from '../../client/clientInsured'
export default {
  name: 'Match',
  components: { clientInsured },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    insuredId: String
  },
  data() {
    return {
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
      this.$emit('matchConfirm', { index: this.index, value: this.multipleSeleValues })
      this.dialogTableVisible = false
    }
  }
}
</script>
