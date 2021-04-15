<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="loadVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="甲方数据代码" prop="no" label-width="120px">
        <el-input v-model="form.no" placeholder="请输入甲方数据代码" />
      </el-form-item>
      <el-form-item label="甲方数据名称" prop="name" label-width="120px">
        <el-input v-model="form.name" placeholder="请输入甲方数据名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type" label-width="120px">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          disabled="disabled"
        >
          <el-option
            v-for="item in typeData.CProdApplyTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="系统代码" prop="dataNo" label-width="120px">
        <el-input v-model="form.dataNo" placeholder="请输入系统代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatchData" />
        </el-input>
      </el-form-item>
      <match-data v-model="matchVisable" :match-no-typ="matchNoTyp" @matchConfirm="matchConfirm" />
      <el-form-item label="系统名称" prop="dataNme" label-width="120px">
        <el-input v-model="form.dataNme" placeholder="请输入系统名称" />
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
import { save, edit } from '@/api/base'
import { getCodeList } from '@/api/code'
import MatchData from './matchData'

export default {
  components: {
    MatchData
  },
  props: {
    'sonData': Object,
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: '新增tree节点',
      basePath: 'plyTreeConfig',
      loadVisible: this.dialogVisible,
      form: {
        id: null,
        no: null,
        name: null,
        dataNo: null,
        dataNme: null,
        type: null
      },
      matchVisable: false,
      matchNoTyp: null,
      typeData: {},
      rules: {
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.imgURL = this.form.avatar
      this.loadVisible = true
      this.matchNoTyp = this.form.type
      if (newVal.id != null) {
        this.dialogTitle = '编辑tree节点'
      } else {
        this.dialogTitle = '新增tree节点'
      }
      this.fetchTypeData()
    }
  },
  created() {
    //
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
      this.form.no = null
      this.form.name = null
      this.form.dataNo = null
      this.form.dataNme = null
      this.form.type = null
      this.matchNoTyp = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CProdApplyTyp'] }).then(res => {
        this.typeData = res.data
        for (const key in this.typeData) {
          this.typeData[key].forEach(item => {
            !this[key] && (this[key] = {})
            this[key][item.value] = item.label
          })
        }
      })
    },
    handleClose() {
      this.clearForm()
      this.loadVisible = false
    },
    hanldeMatchData() {
      this.matchVisable = true
    },
    matchConfirm(data) {
      if (data.partyCde && data.partyName && data.jkCde && data.jkName) {
        this.form.no = data.partyCde
        this.form.name = data.partyName
        this.form.dataNo = data.jkCde
        this.form.dataNme = data.jkName
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
                this.loadVisible = false
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
                this.loadVisible = false
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
