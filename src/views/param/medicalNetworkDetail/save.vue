<template>
  <el-dialog :modal="false" :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="医院网络码" prop="accidentDiaCde" label-width="120px">
        <el-input v-model="form.mediNetworkCde" placeholder="请输入医院网络码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="是否包括" prop="isInclude" label-width="120px">
        <el-select v-model="form.isInclude" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="结论说明码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请输入结论说明码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>

      <el-form-item label="医院号" prop="hospitalNo" label-width="120px">
        <el-input v-model="form.hospitalNo" placeholder="请输入医院号">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>

      <el-form-item label="医院名称" prop="hospitalNme" label-width="120px">
        <el-input v-model="form.hospitalNme" placeholder="请输入医院名称" />
      </el-form-item>

      <el-form-item label="医院等级" prop="hospitalLevel" label-width="120px">
        <el-select v-model="form.hospitalLevel" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CHospitalLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医院性质" prop="hospTyp" label-width="120px">
        <el-select v-model="form.hospTyp" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CHospitalNature"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医院类型" prop="hospitalTyp" label-width="120px">
        <el-select v-model="form.hospitalTyp" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.CHospitalTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否医保医院" prop="area" label-width="120px">
        <el-select v-model="form.area" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="就诊原因" prop="visitReson" label-width="120px">
        <el-select v-model="form.visitReson" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.QuotaVisitReason"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否使用医保卡" prop="isuseMedCard" label-width="120px">
        <el-select v-model="form.isuseMedCard" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="社保地区" prop="sociInsuArea" label-width="120px">
        <el-input v-model="form.sociInsuArea" clearable placeholder="请输入社保地区">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(3)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :level="level" :match-typ="matchTyp" @matchConfirm="matchConfirm" />
      <el-form-item label="统筹金额是否大于0" prop="overallAmtFlag" label-width="120px">
        <el-select v-model="form.overallAmtFlag" clearable placeholder="请选择">
          <el-option
            v-for="item in businessData.TrueOrFalse"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="说明" prop="medicalDesc" label-width="120px">
        <el-input v-model="form.medicalDesc" placeholder="请输入说明" />
      </el-form-item>

      <el-row>
        <el-form-item label="治疗类型" prop="treatmentTyp" label-width="120px">
          <div class="check">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin-left: 20px" />
            <el-checkbox-group v-model="treatmentTyp" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="item in businessData.CiTreatmentTyp"
                :key="item.value"
                :label="item.value"
              >{{ item.value+"-"+item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-row>
      <!-- <el-form-item label="医院网络码码描述" prop="hospitalNoDesc" label-width="120px">
        <el-input v-model="form.hospitalNoDesc" placeholder="请输入医院网络码码描述" />
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
      basePath: 'medicalNetworkDetail',
      form: {
        id: '',
        mediNetworkCde: '',
        isInclude: '',
        cdeTyp: '',
        explainCde: '',
        hospitalNo: '',
        hospitalNme: '',
        hospitalNoDesc: '',
        hospitalLevel: '',
        treatmentTyp: '',
        hospTyp: '',
        area: '',
        sociInsuArea: '',
        overallAmtFlag: '',
        isuseMedCard: '',
        medicalDesc: '',
        hospitalTyp: '',
        socialinsuTyp: '',
        visitReson: ''
      },
      treatmentTyp: [],
      treatmentTypArr: ['1', '2', '3', '4'],
      checkAll: false,
      isIndeterminate: true,
      matchVisable: false,
      matchTyp: null,
      level: 2,
      rules: {
        mediNetworkCde: [{ required: true, trigger: 'blur', message: '请输入医院网络码' }],
        isInclude: [{ required: true, trigger: 'blur', message: '请输入是否包括' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (this.form.treatmentTyp) {
        this.treatmentTyp = this.form.treatmentTyp
      }
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
    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },

    matchConfirm(data) {
      if (this.matchTyp === 1) { // 解释码
        this.form.explainCde = data.explCde
      }
      if (this.matchTyp === 2) { // 医院
        this.form.hospitalNo = data.hospNo
        this.form.hospitalNme = data.hospName
      }
      if (this.matchTyp === 3) { // 社保地
        this.form.sociInsuArea = data.areaCode
      }
    },
    handleCheckAllChange(val) {
      this.treatmentTyp = val ? this.treatmentTypArr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.businessData.CiTreatmentTyp.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.businessData.CiTreatmentTyp.length
    },

    clearForm() {
      this.form.id = null
      this.form.mediNetworkCde = null
      this.form.isInclude = null
      this.form.cdeTyp = null
      this.form.explainCde = null
      this.form.hospitalNo = null
      this.form.hospitalNme = null
      this.form.hospitalNoDesc = null
      this.form.hospitalLevel = null
      this.form.treatmentTyp = null
      this.form.hospTyp = null
      this.form.area = null
      this.form.sociInsuArea = null
      this.form.overallAmtFlag = null
      this.form.isuseMedCard = null
      this.form.medicalDesc = null
      this.form.hospitalTyp = null
      this.form.socialinsuTyp = null
      this.form.visitReson = null
      this.treatmentTyp = []
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.treatmentTyp = this.treatmentTyp
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
  .check {
    display: flex;
    justify-content: flex-start;
  }
</style>

