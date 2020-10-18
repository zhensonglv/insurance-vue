<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="险种名称" prop="insuName" label-width="120px">
        <el-input v-model="form.insuName" placeholder="请输入险种名称" />
      </el-form-item>
      <el-form-item label="险种代码" prop="insuTypeNo" label-width="120px">
        <el-input v-model="form.insuTypeNo" placeholder="请输入险种代码" />
      </el-form-item>
      <el-form-item label="险种生效日" prop="insuranceStartTm" label-width="120px">
        <el-date-picker
          v-model="form.insuranceStartTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="险种终止日" prop="insuranceEndTm" label-width="120px">
        <el-date-picker
          v-model="form.insuranceEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="业务线" prop="proServiceLine" label-width="120px">
        <el-input v-model="form.proServiceLine" placeholder="请选择业务线">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" @matchConfirm="matchConfirm" />
      <el-form-item label="社保规则" prop="socialSecurityRule" label-width="120px">
        <el-input v-model="form.socialSecurityRule" placeholder="请输入社保规则" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" label-width="120px">
        <el-input v-model="form.remark" placeholder="请输入备注" />
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
import Match from './match'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  components: {
    Match
  },
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'insuranceType',
      form: {
        id: '',
        insuName: '',
        insuTypeNo: '',
        insuranceStartTm: '',
        insuranceEndTm: '',
        proServiceLine: '',
        socialSecurityRule: '',
        remark: ''
      },
      matchVisable: false,
      rules: {
        insuName: [{ required: true, trigger: 'blur', message: '请输入险种名称' }],
        insuTypeNo: [{ required: true, trigger: 'blur', message: '请输入险种代码' }]

      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.imgURL = this.form.avatar
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
      this.form.prodNo = null
      this.form.proCategory = null
      this.form.proAbbreviation = null
      this.form.proFullName = null
      this.form.proEffectiveTm = null
      this.form.proExpiryTm = null
      this.form.proServiceLine = null
      this.form.proDesc = null
      this.form.spercialTerms = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      this.form.proServiceLine = data.servLineFullname
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

