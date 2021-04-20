<template>
  <el-dialog title="被保人既往症设置" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <clientAnamnesis dialog :app-data="anamnesisData" />
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
import clientAnamnesis from '../../client/clientAnamnesis'
export default {
  name: 'Match',
  components: { clientAnamnesis },
  props: {
    anamnesisData: Object
  },
  data() {
    return {
      dialogTableVisible: false
    }
  },
  watch: {
    dialogTableVisible(val) {
      this.$emit('input', val)
    },

    anamnesisData: {
      handler(v) {
        if (v) {
          this.dialogTableVisible = true
        }
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {

    handleClose() {
      this.dialogTableVisible = false
    },
    onSubmit() {
      this.dialogTableVisible = false
    }
  }
}
</script>
