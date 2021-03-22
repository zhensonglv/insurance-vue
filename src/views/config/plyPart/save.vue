<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="保单标识号" prop="plyNo">
        <el-input v-model="form.plyNo" placeholder="请输入保单标识号" />
      </el-form-item>
      <el-form-item label="分单号" prop="plyPartNo">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>
      <el-form-item label="被保险人姓名" prop="insuredNme">
        <el-input v-model="form.insuredNme" placeholder="请输入被保险人姓名" />
      </el-form-item>
      <el-form-item label="分单名" prop="plyPartNme">
        <el-input v-model="form.plyPartNme" placeholder="请输入分单名" />
      </el-form-item>
      <el-form-item label="证件类型" prop="certCls">
        <el-input v-model="form.certCls" placeholder="请输入证件类型" />
      </el-form-item>
      <el-form-item label="证件号" prop="certCde">
        <el-input v-model="form.certCde" placeholder="请输入证件号" />
      </el-form-item>
      <el-form-item label="投保等级" prop="insLv">
        <el-input v-model="form.insLv" placeholder="请输入投保等级" />
      </el-form-item>
      <el-form-item label="是否理赔悬挂" prop="claimSuspend">
        <el-radio-group v-model="form.claimSuspend">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分单生效日期" prop="plyPartNoBgnTm">
        <el-date-picker
          v-model="form.plyPartNoBgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="分单终止日期" prop="plyPartNoEndTm">
        <el-date-picker
          v-model="form.plyPartNoEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="初次投保日期" prop="tinslvStartTm">
        <el-date-picker
          v-model="form.tinslvStartTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="投保等级描述" prop="insLvDesc">
        <el-input v-model="form.insLvDesc" placeholder="请输入投保等级描述" />
      </el-form-item>
      <el-form-item label="保单责任生效起期" prop="plyIssueTm">
        <el-date-picker
          v-model="form.plyDutyStartTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="保单责任生效止期" prop="plyIssueTm">
        <el-date-picker
          v-model="form.plyDutyEndTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
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
      dialogTitle: '增加分单配置',
      basePath: 'plyPart',
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
        sellOrganization: '',
        plyDutyStartTm: '',
        plyDutyEndTm: ''
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
      this.form.plyDutyStartTm = null
      this.form.plyDutyEndTm = null
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

