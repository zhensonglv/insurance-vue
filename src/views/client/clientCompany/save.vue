<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="投保单位标识号" prop="deptNo" label-width="120px">
        <el-input v-model="form.deptNo" placeholder="请输入投保单位标识号" />
      </el-form-item>

      <el-form-item label="投保单位名称" prop="deptNme" label-width="120px">
        <el-input v-model="form.deptNme" placeholder="请输入投保单位名称" />
      </el-form-item>

      <el-form-item label="公司类型" prop="companyTyp" label-width="120px">
        <el-input v-model="form.companyTyp" placeholder="请输入公司类型" />
      </el-form-item>
      <el-form-item label="集团名称" prop="groupNme" label-width="120px">
        <el-input v-model="form.groupNme" placeholder="请选择集团名称">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="所属保险公司" prop="insuCompanyCde" label-width="120px">
        <el-input v-model="form.insuCompanyCde" placeholder="请选择所属保险公司">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="所属保险分公司" prop="insuBranchCompanyCde" label-width="120px">
        <el-input v-model="form.insuBranchCompanyCde" placeholder="请输入所属保险分公司" />
      </el-form-item>

      <el-form-item label="承保机构名称" prop="insuranceAgentNme" label-width="120px">
        <el-input v-model="form.insuranceAgentNme" placeholder="请输入承保机构名称" />
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
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'clientCompany',
      form: {
        id: '',
        deptNo: '',
        deptNme: '',
        companyTyp: '',
        groupNme: '',
        insuranceAgentNme: '',
        insuBranchCompanyCde: '',
        insuCompanyCde: ''
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        /* effectiveTm: [{ required: true, trigger: 'blur', message: '请输入生效日' }],
        expiryTm: [{ required: true, trigger: 'blur', message: '请输入终止日' }],*/
        deptNme: [{ required: true, trigger: 'blur', message: '请输入投保单位名称' }],
        insuranceAgentNme: [{ required: true, trigger: 'blur', message: '请输入承保机构名称' }]

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
      this.form.deptNo = null
      this.form.deptNme = null
      this.form.companyTyp = null
      this.form.groupNme = null
      this.form.insuranceAgentNme = null
      this.form.insuBranchCompanyCde = null
      this.form.insuCompanyCde = null
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.groupNme) { // 集团名称
        this.form.groupNme = data.groupNme
      }
      if (data.insuCompanyNme) { // 保险公司
        this.form.insuCompanyCde = data.insuCompanyNme
        this.form.insuBranchCompanyCde = data.insuBranckCompanyNme
      }
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

