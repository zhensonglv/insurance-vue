<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="申请号" prop="batchNo" label-width="120px">
        <el-input v-model="form.batchNo" placeholder="请输入申请号" />
      </el-form-item>

      <el-form-item label="线上/线下" prop="online" label-width="120px">
        <el-input v-model="form.online" placeholder="请输入线上/线下" />
      </el-form-item>

      <el-form-item label="状态" prop="batchStatus" label-width="120px">
        <el-input v-model="form.batchStatus" placeholder="请输入状态" />
      </el-form-item>

      <el-form-item label="申请数量" prop="appNum" label-width="120px">
        <el-input v-model="form.appNum" placeholder="请输入申请数量" />
      </el-form-item>
      <el-form-item label="案件来源" prop="orgin" label-width="120px">
        <el-input v-model="form.orgin" placeholder="请输入案件来源" />
      </el-form-item>

      <el-form-item label="保单号" prop="plyNo" label-width="120px">
        <el-input v-model="form.plyNo" placeholder="请输入保单号" />
      </el-form-item>
      <el-form-item label="投保单位" prop="deptNo" label-width="120px">
        <el-input v-model="form.deptNo" placeholder="请输入投保单位" />
      </el-form-item>

      <el-form-item label="文件名" prop="fileName" label-width="120px">
        <el-input v-model="form.fileName" placeholder="请输入文件名" />
      </el-form-item>
      <el-form-item label="生成时间" prop="exeTm">
        <el-date-picker
          v-model="form.exeTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="原始87文件名" prop="originFileName" label-width="120px">
        <el-input v-model="form.originFileName" placeholder="请输入原始87文件名" />
      </el-form-item>
      <el-form-item label="退回原因" prop="backReson" label-width="120px">
        <el-input v-model="form.backReson" placeholder="请输入退回原因" />
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
import { save, edit } from '@/api/preview/base'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'inputBatchInfo',
      form: {
        id: '',
        batchNo: '',
        online: '',
        batchStatus: '',
        appNum: '',
        orgin: '',
        plyNo: '',
        deptNo: '',
        fileName: '',
        exeTm: '',
        originFileName: '',
        backReson: ''
      },
      rules: {
        /* effectiveTm: [{ required: true, trigger: 'blur', message: '请输入生效日' }],
        expiryTm: [{ required: true, trigger: 'blur', message: '请输入终止日' }],
        lifeStyleDesc: [{ required: true, trigger: 'blur', message: '请输入生活方式描述' }]*/
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
      this.form.batchNo = null
      this.form.online = null
      this.form.batchStatus = null
      this.form.appNum = null
      this.form.orgin = null
      this.form.plyNo = null
      this.form.deptNo = null
      this.form.fileName = null
      this.form.exeTm = null
      this.form.originFileName = null
      this.form.backReson = null
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

