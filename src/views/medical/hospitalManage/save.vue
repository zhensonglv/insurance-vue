<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="医院号" prop="hospNo" label-width="120px">
        <el-input v-model="form.hospNo" placeholder="请输入医院号" />
      </el-form-item>
      <el-form-item label="医院名称" prop="hospName" label-width="120px">
        <el-input v-model="form.hospName" placeholder="请输入医院名称" />
      </el-form-item>
      <el-form-item label="地址" prop="hospAddr" label-width="120px">
        <el-input v-model="form.hospAddr" placeholder="请输入地址" />
      </el-form-item>

      <el-form-item label="医院等级" prop="hospLevel" label-width="120px">
        <el-input v-model="form.hospLevel" placeholder="请输入医院等级" />
      </el-form-item>

      <el-form-item label="等级属性" prop="hospSecondaryLevel" label-width="120px">
        <el-input v-model="form.hospSecondaryLevel" placeholder="请输入等级属性" />
      </el-form-item>

      <el-form-item label="医院类型" prop="hospTyp" label-width="120px">
        <el-input v-model="form.hospTyp" placeholder="请输入医院类型" />
      </el-form-item>

      <el-form-item label="境内地区" prop="hospInternalArea" label-width="120px">
        <el-input v-model="form.hospInternalArea" placeholder="请输入境内地区" />
      </el-form-item>

      <el-form-item label="备注" prop="hospDesc" label-width="120px">
        <el-input v-model="form.hospDesc" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="代码来源" prop="source" label-width="120px">
        <el-input v-model="form.source" placeholder="请输入代码来源" />
      </el-form-item>

      <el-form-item label="指定医院" prop="assignHosp" label-width="120px">
        <el-input v-model="form.assignHosp" placeholder="请输入指定医院" />
      </el-form-item>

      <el-form-item label="省" prop="province" label-width="120px">
        <el-input v-model="form.province" placeholder="请输入省" />
      </el-form-item>
      <el-form-item label="市" prop="city" label-width="120px">
        <el-input v-model="form.city" placeholder="请输入市" />
      </el-form-item>
      <el-form-item label="医院性质" prop="hospitalNature" label-width="120px">
        <el-input v-model="form.hospitalNature" placeholder="请输入医院性质" />
      </el-form-item>
      <el-form-item label="医疗集团号" prop="mediGroupNo" label-width="120px">
        <el-input v-model="form.mediGroupNo" placeholder="请输入医疗集团号" />
      </el-form-item>
      <el-form-item label="社保地区" prop="sociInsuArea" label-width="120px">
        <el-input v-model="form.sociInsuArea" placeholder="请输入社保地区" />
      </el-form-item>
      <el-form-item label="医保定点" prop="sociInsuHosp" label-width="120px">
        <el-input v-model="form.sociInsuHosp" placeholder="请输入医保定点" />
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
      basePath: 'hospitalManage',
      form: {
        id: '',
        hospNo: '',
        hospName: '',
        hospAddr: '',
        hospLevel: '',
        hospSecondaryLevel: '',
        hospTyp: '',
        hospInternalArea: '',
        hospDesc: '',
        source: '',
        assignHosp: '',
        city: '',
        province: '',
        hospitalNature: '',
        mediGroupNo: '',
        sociInsuArea: '',
        sociInsuHosp: ''
      },
      rules: {
        hospNo: [{ required: true, trigger: 'blur', message: '请输入医院号' }]
        /* specialTyp: [{ required: true, trigger: 'blur', message: '请输入悬挂类型' }],
        suspendLevel: [{ required: true, trigger: 'blur', message: '请输入悬挂层级' }],
        suspendExpain: [{ required: true, trigger: 'blur', message: '请输入悬挂解释' }],
        specialDesc: [{ required: true, trigger: 'blur', message: '请输入描述' }],
        specialLevel: [{ required: true, trigger: 'blur', message: '请输入审阅层级' }],
        suspendCondition: [{ required: true, trigger: 'blur', message: '请输入悬挂条件' }],
        suspendStatu: [{ required: true, trigger: 'blur', message: '请输入客户解释码' }],
        speicalManualOperation: [{ required: true, trigger: 'blur', message: '请输入保单特殊人工操作' }],
        manualOperation: [{ required: true, trigger: 'blur', message: '请输入人工操作' }]*/
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
      this.form.hospNo = null
      this.form.hospName = null
      this.form.hospAddr = null
      this.form.hospLevel = null
      this.form.hospSecondaryLevel = null
      this.form.hospInternalArea = null
      this.form.hospDesc = null
      this.form.source = null
      this.form.assignHosp = null
      this.form.city = null
      this.form.province = null
      this.form.hospitalNature = null
      this.form.mediGroupNo = null
      this.form.sociInsuArea = null
      this.form.sociInsuHosp = null
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

