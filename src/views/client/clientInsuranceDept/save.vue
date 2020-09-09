<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="集团名称" prop="groupNme" label-width="160px">
        <el-input v-model="form.groupNme" placeholder="请输入集团名称" />
      </el-form-item>
      <el-form-item label="投保单位名称" prop="deptNme" label-width="160px">
        <el-input v-model="form.deptNme" placeholder="请输入投保单位名称" />
      </el-form-item>
      <el-form-item label="投保单位类型" prop="deptTyp" label-width="135px">
        <el-input v-model="form.deptTyp" width="135px" placeholder="请输入投保单位类型" />
      </el-form-item>
      <el-form-item label="投保单位行业码" prop="deptIndustryCde" label-width="120px">
        <el-input v-model="form.deptIndustryCde" placeholder="请输入投保单位行业码" />
      </el-form-item>
      <el-form-item label="投保单位号" prop="deptTaxNo" label-width="120px">
        <el-input v-model="form.deptClientNo" placeholder="请输入投保单位号" />
      </el-form-item>
      <el-form-item label="投保单位风险码" prop="deptClientNo" label-width="120px">
        <el-input v-model="form.deptClientNo" placeholder="请输入投保单位风险码" />
      </el-form-item>
      <el-form-item label="拆分规则" prop="deptRiskCde" label-width="120px">
        <el-input v-model="form.deptRiskCde" placeholder="请输入拆分规则" />
      </el-form-item>
      <el-form-item label="投保单位联系人姓名" prop="deptContactNme" label-width="120px">
        <el-input v-model="form.deptContactNme" placeholder="请输入投保单位联系人姓名" />
      </el-form-item>
      <el-form-item label="投保单位电话" prop="deptContactTel" label-width="120px">
        <el-input v-model="form.deptContactTel" placeholder="请输入投保单位电话" />
      </el-form-item>

      <el-form-item label="电子邮件" prop="deptContactEmail" label-width="120px">
        <el-input v-model="form.deptContactEmail" placeholder="请输入电子邮件" />
      </el-form-item>
      <el-form-item label="传真" prop="deptContactFax" label-width="120px">
        <el-input v-model="form.deptContactFax" placeholder="请输入传真" />
      </el-form-item>
      <el-form-item label="保单等级" prop="deptPolicyLevel" label-width="120px">
        <el-input v-model="form.deptPolicyLevel" placeholder="请输入保单等级" />
      </el-form-item>
      <el-form-item label="语言" prop="language" label-width="120px">
        <el-input v-model="form.language" placeholder="请输入语言" />
      </el-form-item>
      <el-form-item label="承保机构名称" prop="insuranceAgentNme" label-width="120px">
        <el-input v-model="form.insuranceAgentNme" placeholder="请输入承保机构名称" />
      </el-form-item>
      <el-form-item label="邮递方式" prop="postWay" label-width="120px">
        <el-input v-model="form.postWay" placeholder="请输入邮递方式" />
      </el-form-item>
      <el-form-item label="短信" prop="shortMessage" label-width="120px">
        <el-input v-model="form.shortMessage" placeholder="请输入短信" />
      </el-form-item>
      <el-form-item label="地址" prop="deptAdress" label-width="120px">
        <el-input v-model="form.deptAdress" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="地区码" prop="groupAreaCde" label-width="120px">
        <el-input v-model="form.groupAreaCde" placeholder="请输入地区码" />
      </el-form-item>
      <el-form-item label="邮政编码" prop="deptPostalcode" label-width="120px">
        <el-input v-model="form.deptPostalcode" placeholder="请输入邮政编码" />
      </el-form-item>
      <el-form-item label="录入联系方式" prop="typeInContact" label-width="120px">
        <el-input v-model="form.typeInContact" placeholder="请输入录入联系方式" />
      </el-form-item>
      <el-form-item label="时效" prop="typeInAging" label-width="120px">
        <el-input v-model="form.typeInAging" placeholder="请输入时效" />
      </el-form-item>
      <el-form-item label="时效类型" prop="agingTyp" label-width="120px">
        <el-input v-model="form.agingTyp" placeholder="请输入时效类型" />
      </el-form-item>
      <el-form-item label="录入银行信息" prop="typeInBankInfo" label-width="120px">
        <el-input v-model="form.typeInBankInfo" placeholder="请输入录入银行信息" />
      </el-form-item>
      <el-form-item label="是否存在分团体" prop="isExitBranchDept" label-width="120px">
        <el-input v-model="form.isExitBranchDept" placeholder="请输入是否存在分团体" />
      </el-form-item>
      <el-form-item label="投保单位税务号" prop="breakRules" label-width="120px">
        <el-input v-model="form.breakRules" placeholder="请输入投保单位税务号" />
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
  props: ['sonData'],

  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'clientInsuranceDept',
      form: {
        id: '',
        deptNo: '',
        groupNme: '',
        deptNme: '',
        deptTyp: '',
        deptIndustryCde: '',
        deptClientNo: '',
        deptRiskCde: '',
        breakRules: '',
        deptTaxNo: '',
        deptContactNme: '',
        deptContactPhone: '',
        deptContactTel: '',
        deptContactEmail: '',
        deptContactFax: '',
        deptPolicyLevel: '',
        language: '',
        insuranceAgentNme: '',
        postWay: '',
        shortMessage: '',
        deptAdress: '',
        groupAreaCde: '',
        deptPostalcode: '',
        typeInContact: '',
        typeInAging: '',
        agingTyp: '',
        typeInBankInfo: '',
        isExitBranchDept: '',
        insuCompanyCde: '',
        insuBranchCompanyCde: ''
      },
      rules: {
        deptNo: [{ required: true, trigger: 'blur', message: '请输入投保单位标识号' }],
        deptNme: [{ required: true, trigger: 'blur', message: '请输入投保单位名称' }],
        insuranceAgentNme: [{ required: true, trigger: 'blur', message: '请输入承保机构名称' }]
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
      this.form.idid = null
      this.form.iddeptNo = null
      this.form.idgroupNme = null
      this.form.iddeptNme = null
      this.form.iddeptTyp = null
      this.form.iddeptIndustryCde = null
      this.form.iddeptClientNo = null
      this.form.iddeptRiskCde = null
      this.form.idbreakRules = null
      this.form.iddeptTaxNo = null
      this.form.iddeptContactNme = null
      this.form.iddeptContactPhone = null
      this.form.iddeptContactTel = null
      this.form.iddeptContactEmail = null
      this.form.iddeptContactFax = null
      this.form.iddeptPolicyLevel = null
      this.form.idlanguage = null
      this.form.idinsuranceAgentNme = null
      this.form.idpostWay = null
      this.form.idshortMessage = null
      this.form.iddeptAdress = null
      this.form.idgroupAreaCde = null
      this.form.iddeptPostalcode = null
      this.form.idtypeInContact = null
      this.form.idtypeInAging = null
      this.form.idagingTyp = null
      this.form.idtypeInBankInfo = null
      this.form.idisExitBranchDept = null
      this.form.idinsuCompanyCde = null
      this.form.idinsuBranchCompanyCde = null
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
