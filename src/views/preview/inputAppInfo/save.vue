<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>

      <el-form-item label="序号" prop="idx" label-width="120px">
        <el-input v-model="form.idx" placeholder="请输入序号" />
      </el-form-item>

      <el-form-item label="批次号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入批次号" />
      </el-form-item>

      <el-form-item label="报案号" prop="caseNo" label-width="120px">
        <el-input v-model="form.caseNo" placeholder="请输入报案号" />
      </el-form-item>

      <el-form-item label="姓名" prop="appNme" label-width="120px">
        <el-input v-model="form.appNme" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="证件类型" prop="certCls" label-width="120px">
        <el-input v-model="form.certCls" placeholder="请输入证件类型" />
      </el-form-item>

      <el-form-item label="证件号" prop="certCde" label-width="120px">
        <el-input v-model="form.certCde" placeholder="请输入证件号" />
      </el-form-item>

      <el-form-item label="账单张数" prop="invNum" label-width="120px">
        <el-input v-model="form.invNum" placeholder="请输入账单张数" />
      </el-form-item>

      <el-form-item label="影像号" prop="imageNo" label-width="120px">
        <el-input v-model="form.imageNo" placeholder="请输入影像号" />
      </el-form-item>

      <el-form-item label="出险人邮箱" prop="appEmail" label-width="120px">
        <el-input v-model="form.appEmail" placeholder="请输入出险人邮箱" />
      </el-form-item>

      <el-form-item label="出险人电话" prop="appPhone" label-width="120px">
        <el-input v-model="form.appPhone" placeholder="请输入出险人电话" />
      </el-form-item>

      <el-form-item label="备注" prop="describle" label-width="120px">
        <el-input v-model="form.describle" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="申请文档编号" prop="customAppNo" label-width="120px">
        <el-input v-model="form.customAppNo" placeholder="请输入申请文档编号" />
      </el-form-item>

      <el-form-item label="被保人id" prop="insuredId" label-width="120px">
        <el-input v-model="form.insuredId" placeholder="请输入被保人id" />
      </el-form-item>

      <el-form-item label="申请日期" prop="appTm">
        <el-date-picker
          v-model="form.appTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="申请方式" prop="appOrigin" label-width="120px">
        <el-input v-model="form.appOrigin" placeholder="请输入申请方式" />
      </el-form-item>

      <el-form-item label="团体号" prop="groupNo" label-width="120px">
        <el-input v-model="form.groupNo" placeholder="请输入团体号" />
      </el-form-item>

      <el-form-item label="明细数" prop="nDtlNum" label-width="120px">
        <el-input v-model="form.nDtlNum" placeholder="请输入明细数" />
      </el-form-item>

      <el-form-item label="申请悬挂类型" prop="applyHangType" label-width="120px">
        <el-input v-model="form.applyHangType" placeholder="请输入申请悬挂类型" />
      </el-form-item>

      <el-form-item label="申请悬挂原因" prop="applyHangCause" label-width="120px">
        <el-input v-model="form.applyHangCause" placeholder="请输入申请悬挂原因" />
      </el-form-item>

      <el-form-item label="申请悬挂备注" prop="applyHangRemark" label-width="120px">
        <el-input v-model="form.applyHangRemark" placeholder="请输入申请悬挂备注" />
      </el-form-item>

      <el-form-item label="职业类别" prop="occupationType" label-width="120px">
        <el-input v-model="form.occupationType" placeholder="请输入职业类别" />
      </el-form-item>

      <el-form-item label="职业描述" prop="occupationDesc" label-width="120px">
        <el-input v-model="form.occupationDesc" placeholder="请输入职业描述" />
      </el-form-item>

      <el-form-item label="状态" prop="status" label-width="120px">
        <el-input v-model="form.status" placeholder="请输入状态" />
      </el-form-item>

      <el-form-item label="保单号" prop="plyNo" label-width="120px">
        <el-input v-model="form.plyNo" placeholder="请输入保单号" />
      </el-form-item>

      <el-form-item label="回退原因" prop="backReson" label-width="120px">
        <el-input v-model="form.backReson" placeholder="请输入回退原因" />
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
      basePath: 'inputAppInfo',
      form: {
        id: '',
        plyPartNo: '',
        idx: '',
        batchNo: '',
        caseNo: '',
        appNme: '',
        certCls: '',
        certCde: '',
        invNum: '',
        imageNo: '',
        appEmail: '',
        appPhone: '',
        describle: '',
        customAppNo: '',
        insuredId: '',
        appTm: '',
        appOrigin: '',
        groupNo: '',
        nDtlNum: '',
        applyHangType: '',
        applyHangCause: '',
        applyHangRemark: '',
        occupationType: '',
        occupationDesc: '',
        status: '',
        plyNo: '',
        backReson: ''
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
      this.form.caseNo = null
      this.form.appNme = null
      this.form.certCls = null
      this.form.certCde = null
      this.form.invNum = null
      this.form.imageNo = null
      this.form.appEmail = null
      this.form.appPhone = null
      this.form.describle = null
      this.form.customAppNo = null
      this.form.insuredId = null
      this.form.appTm = null
      this.form.appOrigin = null
      this.form.groupNo = null
      this.form.nDtlNum = null
      this.form.applyHangType = null
      this.form.applyHangCause = null
      this.form.applyHangRemark = null
      this.form.occupationType = null
      this.form.occupationDesc = null
      this.form.status = null
      this.form.plyNo = null
      this.form.backReson = null
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

