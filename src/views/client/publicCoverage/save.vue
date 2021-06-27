<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="公共保额类型" prop="pubCoverTyp" label-width="120px">
        <el-select v-model="form.pubCoverTyp" placeholder="请选择公共保额类型" clearable>
          <el-option
            v-for="item in businessData.CPubCoverTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="集团/团体类型" prop="teamTyp" label-width="120px">
        <el-select v-model="form.teamTyp" placeholder="请输入集团/团体类型" clearable>
          <el-option
            v-for="item in businessData.CTeamTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="集团/团体号" prop="teamNo" label-width="120px">
        <el-input v-model="form.teamNo" placeholder="请选择集团/团体号">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(form.teamTyp)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="起始日" prop="startTm" label-width="120px">
        <el-date-picker
          v-model="form.startTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="终止日" prop="endTm" label-width="120px">
        <el-date-picker
          v-model="form.endTm"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="地区" prop="location" label-width="120px">
        <el-cascader
          v-model="form.regionValue"
          :options="regionData"
          :props="regionMap"
          @change="handleRegionChange"
        />
      </el-form-item>
      <el-form-item label="公共保额总金额" prop="pubCoverLimit" label-width="120px">
        <el-input v-model="form.pubCoverLimit" placeholder="请输入公共保额总金额" />
      </el-form-item>
      <el-form-item label="产品" prop="product" label-width="120px">
        <el-input v-model="form.product" placeholder="请选择产品">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch('3')" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="已用公共保额" prop="pubCoverUsed" label-width="120px">
        <el-input v-model="form.pubCoverUsed" placeholder="请输入已用公共保额" />
      </el-form-item>
      <el-form-item label="公共保额说明" prop="pubCoverDesc" label-width="120px">
        <el-input v-model="form.pubCoverDesc" placeholder="请输入公共保额说明" />
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
import { save, edit } from '@/api/client/publicCoverage'
import { level } from 'province-city-china/data'
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
      form: {
        id: '',
        pubCoverTyp: '',
        teamTyp: '',
        teamNo: '',
        startTm: '',
        endTm: '',
        pubCoverLimit: '',
        product: '',
        pubCoverUsed: '',
        pubCoverDesc: '',
        clineCtype: '',
        plyNo: '',
        regionValue: ''
      },
      regionData: level,
      regionMap: {
        label: 'name',
        value: 'code'
      },
      matchVisable: false,
      matchTyp: null,
      rules: {
        pubCoverTyp: [{ required: true, trigger: 'blur', message: '请输入公共保额类型' }],
        teamTyp: [{ required: true, trigger: 'blur', message: '请输入集团/团体类型' }],
        teamNo: [{ required: true, trigger: 'blur', message: '请输入集团/团体号' }],
        startTm: [{ required: true, trigger: 'blur', message: '请输入起始日' }],
        endTm: [{ required: true, trigger: 'blur', message: '请输入终止日' }],
        pubCoverLimit: [{ required: true, trigger: 'blur', message: '请输入公共保额总金额' }],
        pubCoverUsed: [{ required: true, trigger: 'blur', message: '请输入已用公共保额' }]
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
    handleRegionChange(value) {
      console.log(value, 'value----')
    },
    clearForm() {
      this.form.id = null
      this.form.pubCoverTyp = null
      this.form.teamTyp = null
      this.form.teamNo = null
      this.form.startTm = null
      this.form.endTm = null
      this.form.pubCoverLimit = null
      this.form.product = null
      this.form.pubCoverUsed = null
      this.form.pubCoverDesc = null
      this.form.clineCtype = null
      this.form.plyNo = null
    },
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      if (matchTyp) {
        this.matchTyp = matchTyp
      } else {
        this.$message('请选择集团/团体类型')
      }
    },
    matchConfirm(data) {
      if (data.groupNme && this.matchTyp === '1') { // 集团名称
        this.form.groupNme = data.groupNme
      }
      if (data.insuCompanyNme && this.matchTyp === '2') { // 保险公司
        this.form.insuCompanyCde = data.insuCompanyNme
        this.form.insuBranchCompanyCde = data.insuBranckCompanyNme
      }
      if (data.prodNo) {
        this.form.product = data.prodNo
      }
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.id === null) {
            save(this.form).then(response => {
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
            edit(this.form).then(response => {
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

