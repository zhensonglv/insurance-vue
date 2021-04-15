<template>
  <el-dialog title="操作轨迹" :visible.sync="dialogTrackVisible" append-to-body width="60%">
    <clmTrack dialog :data="data" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import clmTrack from '../clmTrack'
export default {
  name: 'Match',
  components: { clmTrack },
  props: {
    sonData: Object
  },
  data() {
    return {
      dialogTrackVisible: false,
      data: {
        batchNo: '',
        plyPartNo: '',
        customAppNo: ''
      }
    }
  },
  watch: {
    sonData(newVal, oldVal) {
      debugger
      this.data = newVal
      this.dialogTrackVisible = true
    }
  },
  created() {

  },
  methods: {

    handleClose() {
      this.data.batchNo = null
      this.data.plyPartNo = null
      this.data.customAppNo = null
      this.dialogTrackVisible = false
    }
  }
}
</script>
