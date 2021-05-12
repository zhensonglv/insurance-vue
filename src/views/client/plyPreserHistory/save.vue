<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="投保公司名称" prop="department" label-width="120px">
        <el-input v-model="form.department" placeholder="请输入投保公司名称" />
      </el-form-item>
      <el-form-item label="被保人id" prop="insuredNo" label-width="120px">
        <el-input v-model="form.insuredNo" placeholder="请输入被保人id" />
      </el-form-item>
      <el-form-item label="被保人姓名" prop="insuredNme" label-width="120px">
        <el-input v-model="form.insuredNme" placeholder="请输入被保人姓名" />
      </el-form-item>
      <el-form-item label="被保人证件类型" prop="certCls" label-width="120px">
        <el-input v-model="form.certCls" placeholder="请输入被保人证件类型" />
      </el-form-item>
      <el-form-item label="被保人证件号码" prop="certCde" label-width="120px">
        <el-input v-model="form.certCde" placeholder="请输入被保人证件号码" />
      </el-form-item>
      <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
        <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
      </el-form-item>
      <el-form-item label="保单号" prop="plyNo" label-width="120px">
        <el-input v-model="form.plyNo" placeholder="请输入分单号" />
      </el-form-item>
      <el-form-item label="投保等级" prop="insLv" label-width="120px">
        <el-input v-model="form.insLv" placeholder="请输入投保等级" />
      </el-form-item>
      <el-form-item label="保全类型" prop="preserType" label-width="120px">
        <el-select v-model="form.preserType" placeholder="请选择">
          <el-option
            v-for="item in businessData.PlyPreserType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.preserType=='1'" label="保全明细类型" prop="preserTreamType" label-width="120px">
        <el-select v-model="form.preserTreamType" placeholder="请选择">
          <el-option
            v-for="item in businessData.ChangeBasicInfo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.preserType=='2'" label="保全明细类型" prop="preserTreamType" label-width="120px">
        <el-select v-model="form.preserTreamType" placeholder="请选择">
          <el-option
            v-for="item in businessData.TerminalGroup"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.preserType=='3'" label="保全明细类型" prop="preserTreamType" label-width="120px">
        <el-select v-model="form.preserTreamType" placeholder="请选择">
          <el-option
            v-for="item in businessData.AddInsured"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.preserType=='4'" label="保全明细类型" prop="preserTreamType" label-width="120px">
        <el-select v-model="form.preserTreamType" placeholder="请选择">
          <el-option
            v-for="item in businessData.ChangerPersonalInfo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.preserType=='5'" label="保全明细类型" prop="preserTreamType" label-width="120px">
        <el-select v-model="form.preserTreamType" placeholder="请选择">
          <el-option
            v-for="item in businessData.TerminalInsured"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="保全申请日期" prop="cpreserAppTm" label-width="120px">
        <el-date-picker
          v-model="form.cpreserAppTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="保全生效日期" prop="cpreserBgnTm" label-width="120px">
        <el-date-picker
          v-model="form.cpreserBgnTm"
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
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'plyPreserHistory',
      form: {
        id: '',
        department: '',
        plyNo: '',
        plyPartNo: '',
        insuredNo: '',
        insuredNme: '',
        certCls: '',
        certCde: '',
        insLv: '',
        preserType: '',
        preserTreamType: '',
        cpreserBgnTm: '',
        cpreserAppTm: ''
      },
      rules: {

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
      this.form.department = null
      this.form.plyNo = null
      this.form.insuredNo = null
      this.form.plyPartNo = null
      this.form.insuredNme = null
      this.form.certCls = null
      this.form.certCde = null
      this.form.insLv = null
      this.form.preserType = null
      this.form.preserTreamType = null
      this.form.cpreserBgnTm = null
      this.form.cpreserAppTm = null
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

