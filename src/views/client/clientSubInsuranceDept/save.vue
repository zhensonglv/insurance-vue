<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="客户子投保单位号" prop="subDeptClientNo" label-width="120px">
        <el-input v-model="form.subDeptClientNo" placeholder="请输入客户子投保单位号" />
      </el-form-item>
      <el-form-item label="投保单位标识号" prop="deptNo" label-width="120px">
        <el-input v-model="form.deptNo" placeholder="请输入投保单位标识号" />
      </el-form-item>
      <el-form-item label="子投保单位名称" prop="subDeptNme" label-width="120px">
        <el-input v-model="form.subDeptNme" placeholder="请输入子投保单位名称" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="contactNme" label-width="120px">
        <el-input v-model="form.contactNme" placeholder="请输入联系人姓名" />
      </el-form-item>
      <el-form-item label="子投保单位电话" prop="subDeptPhone" label-width="120px">
        <el-input v-model="form.subDeptPhone" placeholder="请输入子投保单位电话" />
      </el-form-item>
      <el-form-item label="手机" prop="subDeptTel" label-width="120px">
        <el-input v-model="form.subDeptTel" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="子投保单位传真" prop="subDeptFax" label-width="120px">
        <el-input v-model="form.subDeptFax" placeholder="请输入子投保单位传真" />
      </el-form-item>
      <el-form-item label="电子邮件" prop="subDeptEmail" label-width="120px">
        <el-input v-model="form.subDeptEmail" placeholder="请输入电子邮件" />
      </el-form-item>
      <el-form-item label="子投保单位语言" prop="subDeptLanguage" label-width="120px">
        <el-select v-model="form.subDeptLanguage" placeholder="请选择">
          <el-option
            v-for="item in businessData.Language"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="邮递方式" prop="postWay" label-width="120px">
        <el-select v-model="form.postWay" placeholder="请选择">
          <el-option
            v-for="item in businessData.MailTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="子投保单位地址" prop="subDeptAddress" label-width="120px">
        <el-input v-model="form.subDeptAddress" placeholder="请输入子投保单位地址" />
      </el-form-item>
      <el-form-item label="地区" prop="deptProvince" label-width="120px">
        <el-input v-model="form.deptProvince" placeholder="请输入地区" />
      </el-form-item>
      <el-form-item label="邮编" prop="deptPostcode" label-width="120px">
        <el-input v-model="form.deptPostcode" placeholder="请输入邮编" />
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
      basePath: 'clientSubInsuranceDept',
      form: {
        id: '',
        subDeptClientNo: '',
        deptNo: '',
        subDeptNme: '',
        contactNme: '',
        subDeptPhone: '',
        subDeptTel: '',
        subDeptFax: '',
        subDeptEmail: '',
        subDeptLanguage: '',
        postWay: '',
        subDeptAddress: '',
        deptProvince: '',
        deptPostcode: ''
      },
      rules: {
        subDeptClientNo: [{ required: true, trigger: 'blur', message: '请输入客户子投保单位号' }],
        deptNo: [{ required: true, trigger: 'blur', message: '请输入投保单位标识号' }],
        subDeptNme: [{ required: true, trigger: 'blur', message: '请输入子投保单位名称' }]
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
      this.form.subDeptClientNo = null
      this.form.deptNo = null
      this.form.subDeptNme = null
      this.form.contactNme = null
      this.form.subDeptPhone = null
      this.form.subDeptTel = null
      this.form.subDeptFax = null
      this.form.subDeptEmail = null
      this.form.subDeptLanguage = null
      this.form.postWay = null
      this.form.subDeptAddress = null
      this.form.deptProvince = null
      this.form.deptPostcode = null
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

