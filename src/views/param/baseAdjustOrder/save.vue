<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="参数码" prop="paramCde" label-width="120px">
        <el-input v-model="form.paramCde" placeholder="请输入就参数码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="起始日期" prop="bgnTm">
        <el-date-picker
          v-model="form.bgnTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="终止日期" prop="endTm">
        <el-date-picker
          v-model="form.endTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="理算优先级" prop="adjustOrder" label-width="120px">
        <el-input v-model="form.adjustOrder" placeholder="请输入理算优先级">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match :tree-data="treeData" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="仅责任" prop="onlyDuty" label-width="120px">
        <el-input v-model="form.onlyDuty" placeholder="请输入">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <el-form-item label="满保额" prop="fullPremium" label-width="120px">
        <el-input v-model="form.fullPremium" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="事故地" prop="accidentPlace" label-width="120px">
        <el-input v-model="form.accidentPlace" placeholder="请输入事故地">
          <svg-icon slot="suffix" icon-class="search" @click="handleArea(1)" />
        </el-input>
      </el-form-item>
      <el-form-item label="承保地" prop="accptPlace" label-width="120px">
        <el-input v-model="form.accptPlace" placeholder="请输入承保地">
          <svg-icon slot="suffix" icon-class="search" @click="handleArea(2)" />
        </el-input>
      </el-form-item>
      <socialArea v-model="matchVisable" :area-typ="areaTyp" @areaConfirm="areaConfirm" />
      <el-form-item label="备注" prop="adjustRemark" label-width="120px">
        <el-input v-model="form.adjustRemark" placeholder="请输入备注" />
      </el-form-item>

      <!--      <el-form-item label="treeId" prop="plyTreeId" label-width="120px">
        <el-input v-model="form.plyTreeId" placeholder="请输入plyTreeId" />
      </el-form-item>-->
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
import socialArea from './socialArea'
export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  components: {
    Match, socialArea
  },
  props: {
    sonData: Object,
    businessData: Object,
    plyTreeId: { type: Number, defalut: 0 }
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      basePath: 'baseAdjustOrder',
      form: {
        id: '',
        paramCde: '',
        bgnTm: '',
        endTm: '',
        adjustOrder: '',
        accidentPlace: '',
        accptPlace: '',
        adjustRemark: '',
        onlyDuty: '',
        fullPremium: '',
        plyTreeId: ''
      },
      matchVisable: false,
      matchTyp: null,
      areaTyp: null,
      treeData: null,
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
        if (this.form.plyTreeId) {
          if (this.form.plyTreeId !== this.plyTreeId) {
            this.form.plyTreeId = this.plyTreeId
          }
        }
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
    handleArea(areaTyp) {
      this.areaTyp = areaTyp
      this.matchVisable = true
    },
    hanldeMatch(matchTyp) {
      this.matchTyp = matchTyp
      this.treeData = { plyTreeId: this.form.plyTreeId }
    },
    areaConfirm(data) {
      if (this.areaTyp === 1) { // 事故地
        this.form.accidentPlace = data.areaCode
      } else if (this.areaTyp === 2) { // 承保地
        this.form.accptPlace = data.areaCode
      }
    },

    matchConfirm(data) {
      if (this.matchTyp === 1) {
        var str = null
        data.forEach((val, i) => {
          if (!str) {
            str = val.responseNo
          } else {
            str = str + ',' + val.responseNo
          }
        })
        this.$set(this.form, 'adjustOrder', str)
      } else if (this.matchTyp === 2) {
        this.$set(this.form, 'onlyDuty', data[0].responseNo)
      }
    },

    clearForm() {
      this.form.id = null
      this.form.paramCde = null
      this.form.bgnTm = null
      this.form.endTm = null
      this.form.adjustOrder = null
      this.form.accidentPlace = null
      this.form.accptPlace = null
      this.form.adjustRemark = null
      this.form.onlyDuty = null
      this.form.fullPremium = null
      this.form.plyTreeId = null
      this.treeData = null
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },

    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.adjustOrder && this.form.onlyDuty) {
            this._notify('理算优先级和仅责任不可同时存在', 'error')
            return
          }

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

