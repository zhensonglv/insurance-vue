<template>
  <el-dialog :title="dialogTitle" :modal="false" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="序号" prop="idx" label-width="120px">
        <el-input v-model="form.idx" placeholder="请输入序号" />
      </el-form-item>

      <el-form-item label="录入名称" prop="inputNme" label-width="120px">
        <el-input v-model="form.inputNme" placeholder="请输入录入名称" />
      </el-form-item>

      <el-form-item label="录入剂型" prop="inputDrug" label-width="120px">
        <el-input v-model="form.inputDrug" placeholder="请输入录入剂型" />
      </el-form-item>

      <el-form-item label="录入比例" prop="inputRate" label-width="120px">
        <el-input v-model="form.inputRate" placeholder="请输入录入比例" />
      </el-form-item>

      <el-form-item label="录入医保类型" prop="inputSecuTyp" label-width="120px">
        <el-input v-model="form.inputSecuTyp" placeholder="请输入录入医保类型" />
      </el-form-item>

      <el-form-item label="费用金额" prop="sumAmt" label-width="120px">
        <el-input v-model="form.sumAmt" placeholder="请输入费用金额" />
      </el-form-item>

      <el-form-item label="费用编码" prop="treatCde" label-width="120px">
        <el-input v-model="form.treatCde" placeholder="请输入费用编码" />
      </el-form-item>

      <el-form-item label="费用名称" prop="payNme" label-width="120px">
        <el-input v-model="form.payNme" placeholder="请输入费用名称" />
      </el-form-item>

      <el-form-item label="医保地区" prop="medicalArea" label-width="120px">
        <el-input v-model="form.medicalArea" placeholder="请输入医保地区" />
      </el-form-item>

      <el-form-item label="医保地省" prop="province" label-width="120px">
        <el-input v-model="form.province" placeholder="请输入医保地省" />
      </el-form-item>

      <el-form-item label="医保地市" prop="city" label-width="120px">
        <el-input v-model="form.city" placeholder="请输入医保地市" />
      </el-form-item>

      <el-form-item label="系统比例" prop="sysRate" label-width="120px">
        <el-input v-model="form.sysRate" placeholder="请输入系统比例" />
      </el-form-item>

      <el-form-item label="扣费比例" prop="categSelfpayRate" label-width="120px">
        <el-input v-model="form.categSelfpayRate" placeholder="请输入扣费比例" />
      </el-form-item>

      <el-form-item label="医保类型" prop="secuTyp" label-width="120px">
        <el-input v-model="form.secuTyp" placeholder="请输入医保类型" />
      </el-form-item>

      <el-form-item label="自负金额" prop="categSelfpayAmt" label-width="120px">
        <el-input v-model="form.categSelfpayAmt" placeholder="请输入自负金额" />
      </el-form-item>

      <el-form-item label="大项号" prop="maxtermNo" label-width="120px">
        <el-input v-model="form.maxtermNo" placeholder="请输入大项号" />
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
import { save, edit } from '@/api/preview/base'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'inputTreatInfo',
      form: {
        id: '',
        plyPartNo: '',
        idx: '',
        batchNo: '',
        zdid: '',
        payNme: '',
        num: '',
        sumAmt: '',
        categSelfpayRate: '',
        remarks: '',
        treatCde: '',
        secuTyp: '',
        customAppNo: '',
        clmInvNo: '',
        dtlNo: '',
        maxtermNo: '',
        treatDesc: '',
        categSelfpayAmt: '',
        invPkId: '',
        inputNme: '',
        medicalArea: '',
        sysRate: '',
        inputDrug: '',
        inputRate: '',
        inputSecuTyp: '',
        promt: '',
        province: '',
        city: ''
      },
      rules: {
        /* effectiveTm: [{ required: true, trigger: 'blur', message: '请输入生效日' }],
        expiryTm: [{ required: true, trigger: 'blur', message: '请输入终止日' }],
        lifeStyleDesc: [{ required: true, trigger: 'blur', message: '请输入生活方式描述' }]*/
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
      this.form.plyPartNo = null
      this.form.idx = null
      this.form.batchNo = null
      this.form.zdid = null
      this.form.payNme = null
      this.form.num = null
      this.form.sumAmt = null
      this.form.categSelfpayRate = null
      this.form.remarks = null
      this.form.treatCde = null
      this.form.secuTyp = null
      this.form.customAppNo = null
      this.form.clmInvNo = null
      this.form.dtlNo = null
      this.form.maxtermNo = null
      this.form.treatDesc = null
      this.form.categSelfpayAmt = null
      this.form.invPkId = null
      this.form.inputNme = null
      this.form.medicalArea = null
      this.form.sysRate = null
      this.form.inputDrug = null
      this.form.inputRate = null
      this.form.inputSecuTyp = null
      this.form.promt = null
      this.form.province = null
      this.form.city = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            save(this.basePath, this.form).then(response => {
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
            edit(this.basePath, this.form).then(response => {
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

