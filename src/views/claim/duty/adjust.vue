<template>
  <el-dialog title="调整功能" :visible.sync="dialogAdjustVisible" width="60%">

    <el-form ref="adjustForm" :inline="true" :rules="rules" :model="adjustForm" status-icon label-position="right" label-width="80px">
      <el-form-item label="调整类型" prop="compensateResult" label-width="120px">
        <el-select v-model="adjustForm.compensateResult" placeholder="请选择" @change="changeResult">
          <el-option
            v-for="item in businessData.AdjustmentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="调整解释码" prop="adjustInterpCde" label-width="120px">
        <el-input v-model="adjustForm.adjustInterpCde" :disabled="this.flag" placeholder="请输入调整解释码" />
      </el-form-item>

      <el-form-item label="解释码描述" prop="interpDesc" label-width="120px">
        <el-input v-model="adjustForm.interpDesc" :disabled="this.flag" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="compensateAmt" label-width="120px">
        <el-input v-model="adjustForm.compensateAmt" :disabled="true" placeholder="请输入赔付金额" />
      </el-form-item>

      <el-form-item label="调整金额" prop="adjustAmt" label-width="120px">
        <el-input v-model="adjustForm.adjustAmt" :disabled="this.adjustFlag" placeholder="请输入调整金额" @change="changeAdjust" />
      </el-form-item>

      <el-form-item label="调整后赔付金额" prop="finalCompensateAmt" label-width="120px">
        <el-input v-model="adjustForm.finalCompensateAmt" :disabled="true" placeholder="请输入调整后赔付金额" />
      </el-form-item>

      <el-form-item label="备注" prop="adjustDesc" label-width="120px">
        <el-input v-model="adjustForm.adjustDesc" type="textarea" style="width: 800px;" :autosize="{ minRows: 2, maxRows: 20}" placeholder="请输入备注" clearable />
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
import { adjustDuty } from '@/api/claim/duty'
export default {
  props: {
    businessData: Object,
    adjustData: Object
  },

  data() {
    return {
      adjustForm: {
        adjustDesc: '',
        finalCompensateAmt: '',
        adjustAmt: '',
        adjustInterpCde: '',
        interpDesc: '',
        compensateResult: '',
        compensateAmt: ''
      },
      dialogAdjustVisible: false,
      flag: true,
      adjustFlag: true,
      rules: {
        compensateResult: [{ required: true, trigger: 'blur', message: '请选择调整类型' }]
      }
    }
  },

  watch: {
    adjustData: {
      handler(v) {
        if (v) {
          this.adjustForm.id = v.id
          this.adjustForm.compensateAmt = v.compensateAmt
          this.dialogAdjustVisible = true
        }
      },
      immediate: true
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

    changeResult() {
      if (this.adjustForm.compensateResult === '1') { // 正常赔付
        this.flag = true
        this.adjustFlag = true
      } else if (this.adjustForm.compensateResult === '3' || this.adjustForm.compensateResult === '4' ||
             this.adjustForm.compensateResult === '5') { // 通融  协议 调整赔付
        this.flag = false
        this.adjustFlag = false
      } else if (this.adjustForm.compensateResult === '2') { // 拒绝赔付
        this.flag = false
        this.adjustFlag = true
      }
    },
    changeAdjust() {
      this.adjustForm.finalCompensateAmt = parseFloat(this.adjustForm.compensateAmt) + parseFloat(this.adjustForm.adjustAmt)
      if (parseFloat(this.adjustForm.finalCompensateAmt) < 0) {
        this._notify('最终赔付金额小于0', 'error')
      }
    },
    clearForm() {
      this.adjustForm.adjustDesc = null
      this.adjustForm.finalCompensateAmt = null
      this.adjustForm.adjustAmt = null
      this.adjustForm.adjustInterpCde = null
      this.adjustForm.interpDesc = null
      this.adjustForm.compensateAmt = null
      this.adjustForm.compensateResult = null
      this.flag = null
      this.adjustFlag = null
    },
    onSubmit() {
      this.$confirm('是否调整责任数据？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.adjustForm.finalCompensateAmt && parseFloat(this.adjustForm.finalCompensateAmt) < 0) {
          this._notify('最终赔付金额小于0', 'error')
          return
        }
        adjustDuty(this.adjustForm).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
            this.$emit('sonStatus', true)
            this.clearForm()
            this.dialogAdjustVisible = false
          } else {
            this._notify(response.msg, 'error')
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
