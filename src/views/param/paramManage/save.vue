<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <!--      <el-form-item label="适用层级" prop="applyTyp" label-width="120px">
        <el-select v-model="form.applyTyp" placeholder="请选择适用层级" clearable @change="handlerTypChange">
          <el-option
            v-for="item in businessData.CProdApplyTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item label="参数类型" prop="paramterTyp" label-width="120px">
        <el-select v-model="form.paramterTyp" placeholder="请输入参数类型" clearable>
          <el-option
            v-for="item in businessData.CParamTyps"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="参数描述"
        prop="paramterDesc"
        label-width="120px"
      >
        <el-input v-model="form.paramterDesc" placeholder="请输入参数描述" />
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
import { getCodeList } from '@/api/code'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'paramManage',
      paramTypLoading: false,
      form: {
        id: '',
        applyTyp: '',
        paramterTyp: '',
        paramterDesc: '',
        prodCde: ''
      },
      saveBusinessData: {},
      rules: {
        applyTyp: [{ required: true, trigger: 'blur', message: '请输入适用层级' }],
        paramterTyp: [{ required: true, trigger: 'blur', message: '请输入参数类型' }],
        paramterDesc: [{ required: true, trigger: 'blur', message: '请输入参数描述' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (newVal.id != null) {
        this.dialogTitle = 'Edit'
        /* if (oldVal == null || newVal.applyTyp !== oldVal.applyTyp) {
          this.handlerTypChange(newVal.applyTyp)
        }*/
      } else {
        this.dialogTitle = 'Add'
      }
    }
  },
  mounted() {
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    handlerTypChange(data) {
      if (data) {
        // this.paramTypLoading = true
        getCodeList({ parent: [data] }).then(res => {
          this.saveBusinessData = res.data
          for (const key in this.saveBusinessData) { // key:group  value：array
            this.$set(this.saveBusinessData, 'prodParamterTyp', this.saveBusinessData[key])// 实现双向绑定
          }
          // this.paramTypLoading = false
        })
      }
    },

    clearForm() {
      this.form.id = null
      this.form.applyTyp = null
      this.form.paramterTyp = null
      this.form.paramterDesc = null
      this.form.prodCde = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
      this.$set(this.saveBusinessData, 'prodParamterTyp', [])
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
          this.$set(this.saveBusinessData, 'prodParamterTyp', [])
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
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

