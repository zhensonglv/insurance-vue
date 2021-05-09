<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入限额码" disabled="disabled" />
      </el-form-item>

      <!--  <el-form-item  label="关联主键id" prop="linkId" label-width="120px">
        <el-input hidden="hidden" v-model="form.linkId" placeholder="请输入限额码" />
      </el-form-item>-->

      <el-form-item label="代码类型" prop="codeTyp" label-width="120px">
        <el-select v-model="form.codeTyp" placeholder="请选择" @change="changecodeTyp(form.codeTyp)">
          <el-option
            v-for="item in businessData.CodeType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="说明" prop="codeDesc" label-width="120px">
        <el-input v-model="form.codeDesc" placeholder="请输入说明" />
      </el-form-item>

      <el-row v-show="form.codeTyp=='1'">
        <el-form-item label="起始代码" prop="starCde" label-width="120px">
          <el-input v-model="form.starCde" placeholder="请选择起始代码">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
          </el-input>
        </el-form-item>
        <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

        <el-form-item label="起始代码描述" prop="starCodeDesc" label-width="120px">
          <el-input v-model="form.starCodeDesc" placeholder="请输入起始代码描述" />
        </el-form-item>

        <el-form-item label="终止代码" prop="endCde" label-width="120px">
          <el-input v-model="form.endCde" placeholder="请选择起始代码">
            <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
          </el-input>
        </el-form-item>
        <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

        <el-form-item label="终止代码描述" prop="endCodeDesc" label-width="120px">
          <el-input v-model="form.endCodeDesc" placeholder="请输入终止代码描述" />
        </el-form-item>
      </el-row>
      <el-row v-show="form.codeTyp=='2'">
        <el-form-item label="起始代码" prop="starCde" label-width="120px">
          <el-input v-model="form.starCde" placeholder="请输入起始代码" @change="changeCode" />
        </el-form-item>

        <el-form-item label="起始代码描述" prop="starCodeDesc" label-width="120px">
          <el-input v-model="form.starCodeDesc" placeholder="请输入起始代码描述" />
        </el-form-item>

        <el-form-item label="终止代码" prop="endCde" label-width="120px">
          <el-input v-model="form.endCde" placeholder="请输入终止代码" @change="changeCode" />
        </el-form-item>

        <el-form-item label="终止代码描述" prop="endCodeDesc" label-width="120px">
          <el-input v-model="form.endCodeDesc" placeholder="请输入终止代码描述" />
        </el-form-item>

        <el-form-item v-if="underFlag" label="承担类型" prop="underTyp" label-width="120px">
          <el-select v-model="form.underTyp" placeholder="请选择">
            <el-option
              v-for="item in businessData.underType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>
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
      basePath: 'codeConfig',
      form: {
        id: '',
        paramCde: '',
        codeDesc: '',
        linkId: '',
        codeTyp: '',
        starCde: '',
        starCodeDesc: '',
        endCde: '',
        endCodeDesc: '',
        underTyp: ''
      },
      matchVisable: false,
      matchTyp: null,
      underFlag: false,
      rules: {
        paramCde: [{ required: true, trigger: 'blur', message: '请输入参数码' }],
        codeDesc: [{ required: true, trigger: 'blur', message: '请输入说明' }],
        codeTyp: [{ required: true, trigger: 'blur', message: '请输入代码类型' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      this.changeCode()
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
      this.form.paramCde = null
      this.form.codeDesc = null
      this.form.linkId = null
      this.form.codeTyp = null
      this.form.starCde = null
      this.form.starCodeDesc = null
      this.form.endCde = null
      this.form.endCodeDesc = null
      this.form.underTyp = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (this.matchTyp === 1) {
        this.form.starCde = data.treatNo
        this.form.starCodeDesc = data.treatDesc
      }
      if (this.matchTyp === 2) {
        this.form.endCde = data.treatNo
        this.form.endCodeDesc = data.treatDesc
      }
    },
    changeCode() {
      if ((this.form.starCde && this.form.starCde.indexOf('B') !== -1) &&
           (this.form.endCde && this.form.endCde.indexOf('B') !== -1)) {
        this.underFlag = true
      } else if (!(this.form.starCde && this.form.starCde.indexOf('B') !== -1) ||
        !(this.form.endCde && this.form.endCde.indexOf('B') !== -1)) {
        this.underFlag = false
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
    },
    changecodeTyp(codeTyp) {
      if (this.form.starCde !== null && this.form.starCde !== '' && this.form.starCde !== undefined) {
        this.form.starCde = ''
      }
      if (this.form.starCodeDesc !== null && this.form.starCodeDesc !== '' && this.form.starCodeDesc !== undefined) {
        this.form.starCodeDesc = ''
      }
      if (this.form.endCde !== null && this.form.endCde !== '' && this.form.endCde !== undefined) {
        this.form.endCde = ''
      }
      if (this.form.endCodeDesc !== null && this.form.endCodeDesc !== '' && this.form.endCodeDesc !== undefined) {
        this.form.endCodeDesc = ''
      }
      if (this.form.underTyp !== null && this.form.underTyp !== '' && this.form.underTyp !== undefined) {
        this.form.underTyp = ''
        this.underTyp = false
      }
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

