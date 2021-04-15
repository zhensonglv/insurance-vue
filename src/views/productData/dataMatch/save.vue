<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="数据类型" prop="noTyp" label-width="120px">
        <el-select v-model="form.noTyp" placeholder="请选择" @change="changeNoTyp">
          <el-option
            v-for="item in businessData.dutyMatchType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="甲方代码" prop="partyCde" label-width="120px">
        <el-input v-model="form.partyCde" placeholder="请输入甲方代码" />
      </el-form-item>

      <el-form-item label="甲方名称" prop="partyName" label-width="120px">
        <el-input v-model="form.partyName" placeholder="请输入甲方名称" />
      </el-form-item>

      <el-form-item label="系统代码" prop="jkCde" label-width="120px">
        <el-input v-model="form.jkCde" placeholder="请选择系统代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="系统名称" prop="jkName" label-width="120px">
        <el-input v-model="form.jkName" placeholder="请输入系统名称" />
      </el-form-item>

      <el-form-item label="甲方公司名称" prop="partyCompanyName" label-width="120px">
        <el-input v-model="form.partyCompanyName" placeholder="请输入甲方公司名称" />
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
      basePath: 'dataMatch',
      form: {
        id: '',
        noTyp: '',
        partyCde: '',
        partyName: '',
        jkCde: '',
        jkName: '',
        partyCompanyName: ''
      },
      matchVisable: false,
      matchTyp: null,
      level: null,
      rules: {
        noTyp: [{ required: true, trigger: 'blur', message: '请输入数据类型' }],
        jkCde: [{ required: true, trigger: 'blur', message: '请输入系统代码' }],
        jkName: [{ required: true, trigger: 'blur', message: '请输入系统名称' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      this.changeNoTyp()
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
      this.form.noTyp = null
      this.form.partyCde = null
      this.form.partyName = null
      this.form.jkCde = null
      this.form.jkName = null
      this.form.partyCompanyName = null
      this.level = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },

    changeNoTyp() {
      debugger
      if (this.form.noTyp === 'product') {
        this.matchTyp = 1
      } else if (this.form.noTyp === 'insurecde') {
        this.matchTyp = 2
      } else {
        this.matchTyp = 3
      }
    },
    hanldeMatch() {
      debugger
      this.matchVisable = true
    },
    matchConfirm(data) {
      if (data.prodNo) {
        this.form.jkCde = data.prodNo
        this.form.jkName = data.proFullName
      } else if (data.proDuty) {
        this.form.jkCde = data.proDuty
        this.form.jkName = data.proDutyNme
      } else if (data.insuTypeNo) {
        this.form.jkCde = data.insuTypeNo
        this.form.jkName = data.insuName
      }
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

