<template>
  <el-dialog title="复制账单" :visible.sync="dialogCopyVisible" width="30%">
    <el-table :data="copyVal">
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票号" width="430">
        <template slot-scope="scope">
          <el-input v-model="scope.row.invNo" />
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer" align="center" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
      <el-button type="primary" @click="onSubmit">
        Confirm
      </el-button>
    </div>

  </el-dialog>

</template>
<script>
import { copyInv } from '@/api/claim/inv'
export default {
  props: {
    sonCopyData: Array
  },

  data() {
    return {
      copyVal: null,
      dialogCopyVisible: false
    }
  },

  watch: {
    sonCopyData: function(newVal) {
      this.copyVal = newVal
      this.dialogCopyVisible = true
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {

    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },

    handleClose() {
      this.$emit('sonStatus', true)
      this.copyVal = null
      this.dialogCopyVisible = false
    },
    onSubmit() {
      this.$confirm('是否复制发票数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        copyInv(this.copyVal).then(res => {
          if (res.code === 200) {
            this._notify('复制成功', 'success')
            this.$emit('sonStatus', true)
            this.copyVal = null
            this.dialogCopyVisible = false
          } else {
            this._notify(res.msg, 'error')
          }
        })
      }).catch(() => {
        this._notify('已取消', 'info')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-table >>> .el-table__body-wrapper td {
  padding: 0;
}
.el-table >>> .el-table__header-wrapper {
  th {
    background-color: #444!important
  }
}
.font-class-red {
  color: red !important;
}
.header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .tit {
    line-height: 36px;
  }
}
</style>

<style lang="scss">//该样式在scope中是不起作用的
.el-tooltip__popper{font-size: 14px; max-width:50% }
</style>
