<template>
  <el-dialog title="调整功能" :visible.sync="dialogAdjustVisible" width="60%">

    <el-form ref="adjustForm" :inline="true" :rules="rules" :model="adjustForm" status-icon label-position="right" label-width="80px">
      <el-form-item label="调整类型" prop="compensateResult" label-width="120px">
        <el-select v-model="adjustForm.compensateResult" placeholder="请选择">
          <el-option
            v-for="item in businessData.AdjustmentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="调整解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="adjustForm.adjustInterpCde" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="adjustForm.interpDesc" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="adjustForm.compensateAmt" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
        <el-input v-model="adjustForm.adjustAmt" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="调整后赔付金额" prop="finalPay" label-width="120px">
        <el-input v-model="adjustForm.finalPay" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="备注" prop="description" label-width="120px">
        <el-input v-model="adjustForm.description" placeholder="请输入客户申请号" />
      </el-form-item>

    </el-form>

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
export default {
  props: {
    businessData: Object,
    adjustData: Object
  },

  data() {
    return {
      adjustForm: {
        description: '',
        finalPay: '',
        adjustAmt: '',
        adjustInterpCde: '',
        interpDesc: '',
        compensateResult: '',
        compensateAmt: ''
      },
      dialogAdjustVisible: false,
      rules: {}
    }
  },

  watch: {
    adjustData: function(newVal, oldVal) {
      debugger
      this.adjustForm.id = newVal.id
      this.dialogAdjustVisible = true
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
      this.dialogAdjustVisible = false
      this.clearForm()
    },

    clearForm() {
      this.adjustForm.description = null
      this.adjustForm.finalPay = null
      this.adjustForm.adjustAmt = null
      this.adjustForm.adjustInterpCde = null
      this.adjustForm.interpDesc = null
      this.adjustForm.compensateAmt = null
      this.adjustForm.compensateResult = null
    },
    onSubmit() {
      this.$confirm('是否复制发票数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        /* copyInv(this.copyVal).then(res => {
          if (res.code === 200) {
            this._notify('复制成功', 'success')
            this.$emit('sonStatus', true)
            this.copyVal = null
            this.dialogAdjustVisible = false
          } else {
            this._notify(res.msg, 'error')
          }
        })*/
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
