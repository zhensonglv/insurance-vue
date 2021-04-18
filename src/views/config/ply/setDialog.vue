<template>
  <el-dialog
    title="设置"
    :before-close="handleClose"
    :visible.sync="loadVisible"
    width="70%"
  >
    <paramManage v-if="loadVisible" :set-param-data="setParamData" @setMultipleSeleValues="setMultipleSeleValues" />

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
    sonData: Object,
    treeType: String
  },
  data() {
    return {
      loadVisible: false,
      selectValue: null,
      basePath: 'plyTreeSetParam',
      paramData: {},
      setParamData: {}
    }
  },
  watch: {
    sonData: function(newVal, oldVal) {
      this.paramData = newVal
      this.setParamData.paramType = newVal.paramType
      this.setParamData.treeType = newVal.treeType
      this.loadVisible = true
    },
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
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    setMultipleSeleValues(value) {
      this.selectValue = value
    },
    /* getSelectVal(value) {debugger
      this.selectValue = value
    },*/
    handleClose() {
      this.$parent.setDialogVisible = false
      this.loadVisible = false
    },
    onSubmit() {
      if (this.selectValue == null) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.paramData.paramCode = this.selectValue.prodCde
        this.paramData.paramDesc = this.selectValue.paramterDesc
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
