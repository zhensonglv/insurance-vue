<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="实体限额码" prop="normCde" label-width="120px">
        <el-input v-model="form.normCde" />
      </el-form-item>
      <el-form-item label="实体限额类型" prop="normTyp" label-width="120px">
        <el-select v-model="form.normTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CNormTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="起始日期" prop="bgnTm">
        <el-date-picker
          v-model="form.bgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="终止日期" prop="endTm">
        <el-date-picker
          v-model="form.endTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="既往症额度" prop="medicalQuota" label-width="120px">
        <el-input v-model="form.medicalQuota" placeholder="请输入既往症额度" />
      </el-form-item>
      <el-form-item label="既往症类型" prop="medicalQuotaTyp" label-width="120px">
        <el-select v-model="form.medicalQuotaTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.HisMedicTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分担关联码" prop="plyPartNoCde" label-width="120px">
        <el-input v-model="form.plyPartNoCde" placeholder="请输入分担关联码" />
      </el-form-item>
      <el-form-item label="责任范围" prop="medicducty" label-width="120px">
        <el-input v-model="form.medicducty" placeholder="请输入责任范围" />
      </el-form-item>
      <el-form-item label="关联责任" prop="correlation" label-width="120px">
        <el-input v-model="form.correlation" placeholder="请输入关联责任" />
      </el-form-item>
      <el-form-item label="医院网络码" prop="medicalnetwordeta" label-width="120px">
        <el-input v-model="form.medicalnetwordeta" placeholder="请输入医院网络码" />
      </el-form-item>
      <el-form-item label="备注" prop="normDesc" label-width="120px">
        <el-input v-model="form.normDesc" placeholder="请输入备注" />
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
      basePath: 'entityNorm',
      form: {
        id: '',
        normCde: '',
        normTyp: '',
        bgnTm: '',
        endTm: '',
        medicalQuota: '',
        medicalQuotaTyp: '',
        plyPartNoCde: '',
        medicducty: '',
        correlation: '',
        medicalnetwordeta: '',
        normDesc: ''
      },
      rules: {
        normCde: [{ required: true, trigger: 'blur', message: '请输入实体限额码' }],
        normTyp: [{ required: true, trigger: 'blur', message: '请选择实体限额类型' }],
        bgnTm: [{ required: true, trigger: 'blur', message: '请选择起始日期' }],
        endTm: [{ required: true, trigger: 'blur', message: '请选择终止日期' }]
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
      this.form.normCde = null
      this.form.normTyp = null
      this.form.bgnTm = null
      this.form.endTm = null
      this.form.medicalQuota = null
      this.form.medicalQuotaTyp = null
      this.form.plyPartNoCde = null
      this.form.medicducty = null
      this.form.correlation = null
      this.form.medicalnetwordeta = null
      this.form.normDesc = null
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

