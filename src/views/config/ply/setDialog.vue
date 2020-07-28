<template>
  <el-dialog title="设置" :before-close="handleClose" :visible.sync="loadVisible" width="70%">
    <paramManage />

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit('form')">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import paramManage from '../../param/paramManage'

export default {
  components: { paramManage },
  props: {
    setDialogVisible: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      loadVisible: false
    }
  },
  watch: {
    setDialogVisible: {
      handler(v) {
        this.loadVisible = v
      },
      immediate: true
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    handleClose() {
      this.$parent.setDialogVisible = false
      this.loadVisible = false
    }
  }
}
</script>
