<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="是否承担" prop="isPay" label-width="120px">
        <el-select v-model="form.isPay" placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="就诊类型" prop="docTyp" label-width="120px">
        <el-select v-model="form.docTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代码类型" prop="codeTyp" label-width="120px">
        <el-select v-model="form.codeTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="起始代码" prop="bgnCode" label-width="120px">
        <el-input v-model="form.bgnCode" placeholder="请输入起始代码" />
      </el-form-item>
      <el-form-item label="起始代码描述" prop="bgnCodeDesc" label-width="120px">
        <el-input v-model="form.bgnCodeDesc" placeholder="请输入起始代码描述" />
      </el-form-item>
      <el-form-item label="终止代码" prop="endCode" label-width="120px">
        <el-input v-model="form.endCode" placeholder="请输入终止代码" />
      </el-form-item>
      <el-form-item label="终止代码描述" prop="endCodeDesc" label-width="120px">
        <el-input v-model="form.endCodeDesc" placeholder="请输入终止代码描述" />
      </el-form-item>
      <el-form-item label="诊断匹配码" prop="diaMatchCde" label-width="120px">
        <el-input v-model="form.diaMatchCde" placeholder="请输入诊断匹配码" />
      </el-form-item>
      <el-form-item label="诊断匹配描述" prop="diaMatchDesc" label-width="120px">
        <el-input v-model="form.diaMatchDesc" placeholder="请输入诊断匹配描述" />
      </el-form-item>

      <el-form-item label="解释码" prop="explianCde" label-width="120px">
        <el-input v-model="form.explianCde" placeholder="请输入解释码" />
      </el-form-item>
      <el-form-item label="解释码描述" prop="explainDesc" label-width="120px">
        <el-input v-model="form.explainDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="责任生效起期" prop="dutyValidBgnTm" label-width="120px">
        <el-date-picker
          v-model="form.dutyValidBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="责任生效止期" prop="dutyValidEndTm" label-width="120px">
        <el-date-picker
          v-model="form.dutyValidEndTm"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="医保类型" prop="medicInsureType" label-width="240px">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="form.medicInsureDesc" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="item in businessData.MedicInsureType"
            :key="item.value"
            :label="item.label"
          >{{ item.label }}</el-checkbox>

        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="诊疗代码类型" prop="treatTyp" label-width="120px">
        <el-select v-model="form.treatTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.TreatCodeTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="起始诊疗码" prop="medicDetailStart" label-width="120px">
        <el-input v-model="form.medicDetailStart" placeholder="请输入起始诊疗码" />
      </el-form-item>
      <el-form-item label="终止诊疗码" prop="medicDetailEnd" label-width="120px">
        <el-input v-model="form.medicDetailEnd" placeholder="请输入终止诊疗码" />
      </el-form-item>

      <el-form-item label="高层诊疗码" prop="treatMatchCde" label-width="120px">
        <el-input v-model="form.treatMatchCde" placeholder="请输入高层诊疗码" />
      </el-form-item>
      <el-form-item label="高层诊疗码描述" prop="treatMatchDesc" label-width="120px">
        <el-input v-model="form.treatMatchDesc" placeholder="请输入高层诊疗码描述" />
      </el-form-item>

      <el-form-item label="费用类型" prop="categoryNo" label-width="120px">
        <el-input v-model="form.categoryNo" placeholder="请输入参数描述" />
      </el-form-item>

      <el-form-item label="描述" prop="descCrible" label-width="120px">
        <el-input v-model="form.descCrible" placeholder="请输入参数描述" />
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
      basePath: 'medicdutyLimit',
      form: {
        id: '',
        paramCde: '',
        docTyp: '',
        medicInsureDesc: []
      },
      medicInsureType: [],
      checkAll: false,
      isIndeterminate: true,
      rules: {
        isPay: [{ required: true, trigger: 'blur', message: '请选择是否承担' }],
        docTyp: [{ required: true, trigger: 'blur', message: '请选择就诊类型' }]
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
    handleCheckAllChange(val) {
      this.form.medicInsureDesc = val ? this.businessData.MedicInsureType : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.businessData.MedicInsureType.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.businessData.MedicInsureType.length
    },

    clearForm() {
      this.form.id = null
      this.form.paramCde = null
      this.form.docTyp = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            console.log(this.form.medicInsureDesc)
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

