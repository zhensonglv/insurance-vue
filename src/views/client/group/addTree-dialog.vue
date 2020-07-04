<template>
  <el-dialog title="新增tree节点" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item v-if="form.id != null" label="主键id" prop="id" label-width="120px">
        <el-input v-model="form.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="节点名称" prop="insuCompanyNme" label-width="120px">
        <el-input v-model="form.name" placeholder="请输入保险公司名称" />
      </el-form-item>
      <el-form-item label="是否叶子节点" prop="insuBranckCompanyNme" label-width="120px">
        <el-radio-group v-model="form.radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit('form')">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      rules: {}
    }
  },
  watch: {},
  methods: {
    onSubmit() {},
    clearForm() {
      this.form.id = null
      this.form.insuCompanyNme = null
      this.form.insuBranckCompanyNme = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
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
