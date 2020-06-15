<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>
      <el-form-item label="分单保额类型" prop="plyPartTyp" label-width="120px">
        <el-select v-model="form.plyPartTyp" placeholder="请输入分单保额类型">
          <el-option
            v-for="item in businessData.CPlyPartTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主被保险人姓名" prop="principalInsuredNme" label-width="120px">
        <el-input v-model="form.principalInsuredNme" placeholder="请输入主被保险人姓名" />
      </el-form-item>
      <el-form-item label="被保险人姓名" prop="insuredNme" label-width="120px">
        <el-input v-model="form.insuredNme" placeholder="请输入被保险人姓名" />
      </el-form-item>
      <el-form-item label="分单保额金额" prop="subCoverLimit" label-width="120px">
        <el-input v-model="form.subCoverLimit" placeholder="请输入分单保额金额" />
      </el-form-item>
      <el-form-item label="已用分单保额金额" prop="subCoverUsed" label-width="150px">
        <el-input v-model="form.subCoverUsed" placeholder="请输入已用分单保额金额" />
      </el-form-item>
      <el-form-item label="分单保额备注" prop="subCoverDesc" label-width="120px">
        <el-input v-model="form.subCoverDesc" placeholder="请输入分单保额备注明" />
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
import { save, edit } from '@/api/base'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'plyPartPubCov',
      form: {
        id: '',
        plyPartNo: '',
        plyPartTyp: '',
        principalInsuredNme: '',
        insuredNme: '',
        subCoverLimit: '',
        subCoverUsed: '',
        subCoverDesc: '',
        relationDutyNo: '',
        pubCoverId: ''
      },
      rules: {
        plyPartNo: [{ required: true, trigger: 'blur', message: '请输入分单号' }],
        plyPartTyp: [{ required: true, trigger: 'blur', message: '请选择分单保额类型' }],
        subCoverLimit: [{ required: true, trigger: 'blur', message: '请输入分单保额金额' }],
        subCoverUsed: [{ required: true, trigger: 'blur', message: '请输入已用分单保额金额' }]
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
      this.form.plyPartTyp = null
      this.form.principalInsuredNme = null
      this.form.insuredNme = null
      this.form.subCoverLimit = null
      this.form.subCoverUsed = null
      this.form.subCoverDesc = null
      this.form.relationDutyNo = null
      this.form.pubCoverDesc = null
      this.form.pubCoverId = null
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

