<template>
  <el-dialog title="设置" :before-close="handleClose" :visible.sync="loadVisible" width="70%">
    <paramManage :set-param-type="paramData.paramType" @selectVal="getSelectVal" />

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
import { save, edit } from '@/api/base'

export default {
  components: { paramManage },
  props: {
    setDialogVisible: {
      type: Boolean,
      default: false
    },
    sonData: Object
  },
  data() {
    return {
      loadVisible: false,
      selectValues: null,
      basePath: 'plyTreeSetParam',
      paramData: {}
    }
  },
  watch: {
    sonData: function(newVal, oldVal) {
      this.paramData = newVal
      this.loadVisible = true
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    getSelectVal(value) {
      this.selectValues = value
    },
    handleClose() {
      this.$parent.setDialogVisible = false
      this.loadVisible = false
    },
    onSubmit() {
      if (this.selectValues.length !== 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.paramData.paramCode = this.selectValues[0].prodCde
        this.paramData.paramDesc = this.selectValues[0].paramterDesc
        if (this.paramData.id > 0) {
          edit(this.basePath, this.paramData).then(response => {
            if (response.code === 200) {
              this._notify(response.msg, 'success')
              this.$emit('sonStatus', true)
              this.loadVisible = false
            } else {
              this._notify(response.msg, 'error')
            }
          })
        } else {
          save(this.basePath, this.paramData).then(response => {
            if (response.code === 200) {
              this._notify(response.msg, 'success')
              this.$emit('sonStatus', true)
              this.loadVisible = false
            } else {
              this._notify(response.msg, 'error')
            }
          })
        }
      }
    }
  }
}
</script>
