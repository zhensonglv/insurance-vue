<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="就诊类型" prop="servTypNo" label-width="120px">
        <el-select v-model="form.docTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型号" prop="servCategory" label-width="120px">
        <el-input v-model="form.servTypNo" placeholder="请输入服务类型号" />
      </el-form-item>
      <el-form-item label="服务类型描述" prop="servTypDesc" label-width="120px">
        <el-input v-model="form.servTypDesc" placeholder="请输入服务类型描述" />
      </el-form-item>
      <el-form-item label="起始诊疗码" prop="servTypEngdesc" label-width="120px">
        <el-input v-model="form.bgnTreatmentNo" placeholder="请输入起始诊疗码" />
      </el-form-item>
      <el-form-item label="终止诊疗码" prop="categoryNo" label-width="120px">
        <el-input v-model="form.endTreatmentNo" placeholder="请输入终止诊疗码" />
      </el-form-item>
      <el-form-item label="医保类型" prop="categoryName" label-width="150px">
        <el-select v-model="form.healthCareTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.HealCareTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="适应症号" prop="subcategoryNo" label-width="120px">
        <el-input v-model="form.adapDiseCde" placeholder="请输入适应症号" />
      </el-form-item>
      <el-form-item label="大项号" prop="subcategoryName" label-width="120px">
        <el-input v-model="form.categoryNo" placeholder="请输入大项号" />
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
      basePath: 'serviceTypManage',
      form: {
        id: '',
        servTreatmentNo: '',
        docTyp: '',
        servTypNo: '',
        servTypDesc: '',
        bgnTreatmentNo: '',
        endTreatmentNo: '',
        crtCde: '',
        crtTm: '',
        updCde: '',
        updTm: '',
        delFlag: '',
        healthCareTyp: '',
        categoryNo: '',
        adapDiseCde: ''
      },
      rules: {
        docTyp: [{ required: true, trigger: 'blur', message: '请输入就诊类型' }],
        healthCareTyp: [{ required: true, trigger: 'blur', message: '请输入医保类型' }]
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
      this.form.servTreatmentNo = null
      this.form.docTyp = null
      this.form.servTypNo = null
      this.form.servTypDesc = null
      this.form.bgnTreatmentNo = null
      this.form.endTreatmentNo = null
      this.form.crtCde = null
      this.form.crtTm = null
      this.form.updCde = null
      this.form.updTm = null
      this.form.delFlag = null
      this.form.healthCareTyp = null
      this.form.categoryNo = null
      this.form.adapDiseCde = null
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

