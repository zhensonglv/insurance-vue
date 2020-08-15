<template>
  <el-dialog title="设置" :before-close="handleClose" :visible.sync="loadVisible" width="70%">
    <paramManage @selectVal="getSelectVal" />

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
import paramManage from '../../param/paramManage'

export default {
  components: { paramManage },
  props: {
    setDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadVisible: false,
      selectValues: null
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
    getSelectVal(v) {
      this.selectValues = v
    },
    handleClose() {
      this.$parent.setDialogVisible = false
      this.loadVisible = false
    },
    onSubmit() {
      console.log(this.selectValues, '==-099--000')
    }
  }
}
</script>
