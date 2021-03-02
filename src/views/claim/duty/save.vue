<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="保单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyNo" placeholder="请输入保单号" />
      </el-form-item>

      <el-form-item label="客户申请号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
      </el-form-item>

      <el-form-item label="产品号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.prodNo" placeholder="请输入产品号" />
      </el-form-item>

      <el-form-item label="产品名称" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.prodName" placeholder="请输入产品名称" />
      </el-form-item>

      <el-form-item label="险种号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.cvrgNo" placeholder="请输入险种号" />
      </el-form-item>

      <el-form-item label="责任号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.responseNo" placeholder="请输入责任号" />
      </el-form-item>

      <el-form-item label="甲方产品号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaProdNo" placeholder="请输入甲方产品号" />
      </el-form-item>

      <el-form-item label="甲方产品名称" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaProdName" placeholder="请输入甲方产品名称" />
      </el-form-item>

      <el-form-item label="甲方险种号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaCvrgNo" placeholder="请输入甲方险种号" />
      </el-form-item>

      <el-form-item label="甲方险种名称" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaCvrgName" placeholder="请输入甲方险种名称" />
      </el-form-item>

      <el-form-item label="甲方责任号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaResponseNo" placeholder="请输入甲方责任号" />
      </el-form-item>

      <el-form-item label="甲方责任名称" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.partaResponseName" placeholder="请输入甲方责任名称" />
      </el-form-item>

      <el-form-item label="总金额" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.invoiceSum" placeholder="请输入总金额" />
      </el-form-item>

      <el-form-item label="扣除金额" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
      </el-form-item>

      <el-form-item label="可理算金额" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.clacAmt" placeholder="请输入可理算金额" />
      </el-form-item>

      <el-form-item label="赔付金额" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
      </el-form-item>

      <el-form-item label="最终赔付金额" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.finalCompensateAmt" placeholder="请输入最终赔付金额" />
      </el-form-item>

      <el-form-item label="赔付结论" prop="compensateResult" label-width="120px">
        <el-select v-model="form.compensateResult" placeholder="请选择">
          <el-option
            v-for="item in businessData.AdjustmentType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="结论描述" prop="conclusionDesc" label-width="120px">
        <el-input v-model="form.conclusionDesc" placeholder="请输入结论描述" />
      </el-form-item>

      <el-form-item label="申请层id" prop="clmAppId" label-width="120px">
        <el-input v-model="form.clmAppId" placeholder="请输入申请层id" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        Cancel
      </el-button>
      <el-button type="primary" @click="onSubmit('form')">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save, edit } from '@/api/claim/duty'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        clmAppId: '',
        batchNo: '',
        plyPartNo: '',
        plyNo: '',
        customAppNo: '',
        prodNo: '',
        prodName: '',
        cvrgNo: '',
        responseNo: '',
        partaProdNo: '',
        partaProdName: '',
        partaCvrgNo: '',
        partaCvrgName: '',
        partaResponseNo: '',
        partaResponseName: '',
        invoiceSum: '',
        deductAmt: '',
        clacAmt: '',
        compensateAmt: '',
        finalCompensateAmt: '',
        compensateResult: '',
        conclusionDesc: ''
      },

      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (newVal.id != null) {
        this.dialogTitle = 'Edit'
      } else {
        this.dialogTitle = 'Add'
      }
    }
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },

    clearForm() {
      this.form.id = null
      this.form.clmAppId = null
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.plyNo = null
      this.form.customAppNo = null
      this.form.prodNo = null
      this.form.prodName = null
      this.form.cvrgNo = null
      this.form.responseNo = null
      this.form.partaProdNo = null
      this.form.partaProdName = null
      this.form.partaCvrgNo = null
      this.form.partaCvrgName = null
      this.form.partaResponseNo = null
      this.form.partaResponseName = null
      this.form.invoiceSum = null
      this.form.deductAmt = null
      this.form.clacAmt = null
      this.form.compensateAmt = null
      this.form.finalCompensateAmt = null
      this.form.compensateResult = null
      this.form.conclusionDesc = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            save(this.form).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('sonStatus', true)
                this.dialogVisible = false
              } else {
                this._notify(response.msg, 'error')
              }
            })
          } else {
            edit(this.form).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.clearForm()
                this.$emit('sonStatus', true)
                this.dialogVisible = false
              } else {
                this._notify(response.msg, 'error')
              }
            })
          }
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css">
  .line {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

