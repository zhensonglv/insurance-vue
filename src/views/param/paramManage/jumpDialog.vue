<template>
  <el-dialog
    :modal="false"
    title="设置"
    :before-close="handleClose"
    :visible.sync="loadVisible"
    width="70%"
    append-to-body
  >
    <component :is="pathRoute" />
    <div slot="footer" class="dialog-footer">
      <el-button type="info" plain @click="handleClose">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: { },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    pathRoute: String,
    paramCode: String
  },
  data() {
    return {
      loadVisible: false
    }
  },
  watch: {
    visible: {
      handler(v) {
        debugger
        this.loadVisible = v
      },
      immediate: true
    }
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    handleClose() {
      this.$emit('sonVisible', false)
      this.loadVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper >>> .dialog-footer {
  width: 100%;
  text-align: center;
}
</style>
