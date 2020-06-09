<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item v-if="form.id != null" label="主键id" prop="id" label-width="120px">
        <el-input v-model="form.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="保险公司名称" prop="insuCompanyNme" label-width="120px">
        <el-input v-model="form.insuCompanyNme" placeholder="请输入保险公司名称" />
      </el-form-item>
      <el-form-item label="保险分公司名称" prop="insuBranckCompanyNme" label-width="120px">
        <el-input v-model="form.insuBranckCompanyNme" placeholder="请输入保险分公司名称" />
      </el-form-item>
      <el-form-item label="医院等级" prop="insuBranckHospitalLevel" label-width="120px">
        <el-select v-model="form.insuBranckHospitalLevel" placeholder="请选择医院等级">
          <el-option
            v-for="item in hospital"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医疗集团" prop="insuBranckHospitalGroup" label-width="120px">
        <el-input
          v-model="form.insuBranckHospitalGroup"
          placeholder="请选择集团号"
        >
          <svg-icon slot="suffix" icon-class="search" @click="hanldeHospital" />
        </el-input>
      </el-form-item>
    </el-form>
    <hospital :hospital-visable="hospitalVisable" @hospitalConfirm="hospitalConfirm" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit('form')">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save, edit } from '@/api/client/company'
import Hospital from './hospitalDetail'

export default {
  components: {
    Hospital
  },
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        insuCompanyNme: '',
        insuBranckCompanyNme: '',
        insuBranckHospitalGroup: '',
        insuBranckHospitalLevel: ''
      },
      rules: {
        insuCompanyNme: [{ required: true, trigger: 'blur', message: '请输入保险公司名称' }],
        insuBranckCompanyNme: [{ required: true, trigger: 'blur', message: '请输入保险分公司电话' }]
      },
      hospitalVisable: false,
      hospital: [{
        label: '三甲',
        value: '3'
      },
      {
        label: '二甲',
        value: '2'
      }]
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
    hanldeHospital() {
      this.hospitalVisable = true
      console.log(this.hospitalVisable, '111')
    },
    clearForm() {
      this.form.id = null
      this.form.insuCompanyNme = null
      this.form.insuBranckCompanyNme = null
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
    },
    hospitalConfirm(data) {
      this.form.insuBranckHospitalGroup = data
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

