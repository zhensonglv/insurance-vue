<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="投保单位" prop="deptNo">
        <el-input v-model="form.deptNo" placeholder="请输入投保单位" />
      </el-form-item>
      <el-form-item label="保单类型" prop="plyTyp">
        <el-input v-model="form.plyTyp" placeholder="请输入保单类型" />
      </el-form-item>
      <el-form-item label="保单标识号" prop="plyNo">
        <el-input v-model="form.plyNo" placeholder="请输入保单标识号" />
      </el-form-item>
      <el-form-item label="保险公司名称" prop="insuCompanyCde">
        <el-input v-model="form.insuCompanyCde" placeholder="请输入保险公司名称" />
      </el-form-item>
      <el-form-item label="保单申请日" prop="plyAppTm">
        <el-date-picker
          v-model="form.plyAppTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单收件日" prop="plyConsigneeTm">
        <el-date-picker
          v-model="form.plyConsigneeTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单录入日" prop="plyEntryTm">
        <el-date-picker
          v-model="form.plyEntryTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单签发日" prop="plyIssueTm">
        <el-date-picker
          v-model="form.plyIssueTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单生效日" prop="plyBgnTm">
        <el-date-picker
          v-model="form.plyBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单终止日" prop="plyEndTm">
        <el-date-picker
          v-model="form.plyEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保单申请号" prop="plyAppNo">
        <el-input v-model="form.plyAppNo" placeholder="请输入保单申请号" />
      </el-form-item>
      <el-form-item label="退保方式" prop="edrSurrendTyp">
        <el-input v-model="form.edrSurrendTyp" placeholder="请输入退保方式" />
      </el-form-item>
      <el-form-item label="销售渠道" prop="sellChannel">
        <el-input v-model="form.sellChannel" placeholder="请输入销售渠道" />
      </el-form-item>
      <el-form-item label="是否社保企补产品" prop="socialSecurity">
        <el-radio-group v-model="form.socialSecurity">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医保卡" prop="medicareCard">
        <el-input v-model="form.medicareCard" placeholder="请输入医保卡" />
      </el-form-item>
      <el-form-item label="客户保单号" prop="customPlyNo">
        <el-input v-model="form.customPlyNo" placeholder="请输入客户保单号" />
      </el-form-item>
      <el-form-item label="销售机构" prop="sellOrganization">
        <el-input v-model="form.sellOrganization" placeholder="请输入销售机构" />
      </el-form-item>
      <el-form-item label="特别条款" prop="specialClause">
        <el-input v-model="form.specialClause" placeholder="请输入特别条款" />
      </el-form-item>
      <el-form-item label="业务线" prop="serviceLine">
        <el-input v-model="form.serviceLine" placeholder="请输入业务线" />
      </el-form-item>
      <el-form-item label="保单状态" prop="plyState">
        <el-input v-model="form.plyState" placeholder="请输入保单状态" />
      </el-form-item>
      <el-form-item label="产品" prop="product">
        <el-input v-model="form.product" placeholder="请输入产品" />
      </el-form-item>
      <el-form-item label="险种" prop="insureCde">
        <el-input v-model="form.insureCde" placeholder="请输入险种" />
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
      dialogTitle: '增加保单配置',
      basePath: 'plyConfig',
      form: {
        id: '',
        plyNo: '',
        plyAppNo: '',
        deptNo: '',
        plyTyp: '',
        edrSurrendTyp: '',
        sellChannel: '',
        medicareCard: '',
        customPlyNo: '',
        specialClause: '',
        product: '',
        insureCde: '',
        sellOrganization: ''
      },
      rules: {
        deptNo: [{ required: true, trigger: 'blur', message: '请输入投保单位' }],
        plyAppTm: [{ required: true, trigger: 'blur', message: '请输入保单申请日' }],
        plyBgnTm: [{ required: true, trigger: 'blur', message: '请输入保单生效日' }],
        plyEndTm: [{ required: true, trigger: 'blur', message: '请输入保单终止日' }],
        edrSurrendTyp: [{ required: true, trigger: 'blur', message: '请输入退保方式' }],
        sellChannel: [{ required: true, trigger: 'blur', message: '请输入销售渠道' }],
        serviceLine: [{ required: true, trigger: 'blur', message: '请输入业务线' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.imgURL = this.form.avatar
      this.dialogVisible = true
      if (newVal.id != null) {
        this.dialogTitle = '编辑保单配置'
      } else {
        this.dialogTitle = '增加保单配置'
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
      this.form.plyNo = null
      this.form.plyAppNo = null
      this.form.deptNo = null
      this.form.plyTyp = null
      this.form.edrSurrendTyp = null
      this.form.sellChannel = null
      this.form.medicareCard = null
      this.form.customPlyNo = null
      this.form.specialClause = null
      this.form.product = null
      this.form.insureCde = null
      this.form.sellOrganization = null
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

