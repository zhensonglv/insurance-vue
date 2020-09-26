<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="诊疗码" prop="treatNo" label-width="120px">
        <el-input v-model="form.treatNo" placeholder="请输入诊疗码" />
      </el-form-item>
      <el-form-item label="剂型码" prop="drugformCde" label-width="120px">
        <el-input v-model="form.drugformCde" placeholder="请输入剂型码" />
      </el-form-item>

      <el-form-item label="剂型" prop="treatDrugForm" label-width="120px">
        <el-select v-model="form.treatDrugForm" placeholder="请选择">
          <el-option
            v-for="item in businessData.CTreatDrugForm"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="诊疗类型" prop="treatTyp" label-width="120px">
        <el-input v-model="form.treatTyp" placeholder="请输入诊疗类型" />
      </el-form-item>

      <el-form-item label="成分代码" prop="componentCde" label-width="120px">
        <el-input v-model="form.componentCde" placeholder="请输入成分代码" />
      </el-form-item>
      <el-form-item label="成分描述" prop="componentDesc" label-width="120px">
        <el-input v-model="form.componentDesc" placeholder="请输入成分描述" />
      </el-form-item>
      <el-form-item label="诊疗描述" prop="treatDesc" label-width="120px">
        <el-input v-model="form.treatDesc" placeholder="请输入诊疗描述" />
      </el-form-item>
      <el-form-item label="英文描述" prop="treatEngDesc" label-width="120px">
        <el-input v-model="form.treatEngDesc" placeholder="请输入英文描述" />
      </el-form-item>
      <el-form-item label="从属剂型" prop="belongDrugform" label-width="120px">
        <el-input v-model="form.belongDrugform" placeholder="请输入从属剂型" />
      </el-form-item>

      <el-form-item label="大项号" prop="cateGoryNo" label-width="120px">
        <el-select v-model="form.cateGoryNo" placeholder="请选择">
          <el-option
            v-for="item in businessData.CostTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="大项号描述" prop="cateGoryNoDesc" label-width="120px">
        <el-input v-model="form.cateGoryNoDesc" placeholder="请输入大项号描述" />
      </el-form-item>
      <el-form-item label="适应症号" prop="subCateGoryNo" label-width="120px">
        <el-input v-model="form.subCateGoryNo" placeholder="请输入适应症号" />
      </el-form-item>
      <el-form-item label="适应症名称" prop="subCateGoryName" label-width="120px">
        <el-input v-model="form.subCateGoryName" placeholder="请输入适应症名称" />
      </el-form-item>
      <el-form-item label="别名" prop="treatmentAlias" label-width="120px">
        <el-input v-model="form.treatmentAlias" placeholder="请输入别名" />
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
      basePath: 'treatmentMesManage',
      form: {
        id: '',
        treatNo: '',
        drugformCde: '',
        treatDrugForm: '',
        treatTyp: '',
        componentCde: '',
        componentDesc: '',
        treatDesc: '',
        treatEngDesc: '',
        belongDrugform: '',
        cateGoryNo: '',
        cateGoryNoDesc: '',
        subCateGoryNo: '',
        subCateGoryName: '',
        treatmentAlias: ''
      },
      rules: {
        treatNo: [{ required: true, trigger: 'blur', message: '请输入诊疗码' }],
        drugformCde: [{ required: true, trigger: 'blur', message: '请输入剂型码' }],
        treatDrugForm: [{ required: true, trigger: 'blur', message: '请输入剂型' }],
        treatTyp: [{ required: true, trigger: 'blur', message: '请输入诊疗类型' }]
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
      this.form.treatNo = null
      this.form.drugformCde = null
      this.form.treatDrugForm = null
      this.form.treatTyp = null
      this.form.componentCde = null
      this.form.componentDesc = null
      this.form.treatDesc = null
      this.form.treatEngDesc = null
      this.form.belongDrugform = null
      this.form.cateGoryNo = null
      this.form.cateGoryNoDesc = null
      this.form.subCateGoryNo = null
      this.form.subCateGoryName = null
      this.form.treatmentAlias = null
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

