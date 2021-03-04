<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
      <el-form-item label="除外责任码" prop="exclusionsCde" label-width="120px">
        <el-input v-model="form.exclusionsCde" placeholder="请输入除外责任码" disabled="disabled" />
      </el-form-item>
      <el-form-item label="除外责任说明" prop="exclusionsDesc" label-width="120px">
        <el-input v-model="form.exclusionsDesc" placeholder="请输入除外责任说明" />
      </el-form-item>
      <el-form-item label="除外责任类型" prop="exclusionsTyp" label-width="120px">
        <el-select v-model="form.exclusionsTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.CExclusionsTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="就诊类型" prop="invoiceTyp" label-width="120px">
        <el-select v-model="form.invoiceTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.ClinicType"
            :key="item.value"

            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="解释码" prop="explainCde" label-width="120px">
        <el-input v-model="form.explainCde" placeholder="请选择解释码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(2)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="解释码描述" prop="explainCdeDesc" label-width="120px">
        <el-input v-model="form.explainCdeDesc" placeholder="请输入解释码描述" />
      </el-form-item>

      <el-form-item label="诊断码代码类型" prop="quotaCodeTyp" label-width="120px">
        <el-select v-model="form.quotaCodeTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.DiaMatchTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="起始诊断代码" prop="quotaStarCde" label-width="120px">
        <el-input v-model="form.quotaStarCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(3)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="起始诊断代码描述" prop="quotaStarCdeDesc" label-width="120px">
        <el-input v-model="form.quotaStarCdeDesc" placeholder="请输入起始代码描述" />
      </el-form-item>

      <el-form-item label="终止诊断代码" prop="quotaEndCde" label-width="120px">
        <el-input v-model="form.quotaEndCde" placeholder="请选择起始代码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(4)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

      <el-form-item label="终止诊断代码描述" prop="quotaEndCdeDesc" label-width="120px">
        <el-input v-model="form.quotaEndCdeDesc" placeholder="请输入终止代码描述" />
      </el-form-item>

      <el-form-item label="高层诊断码" prop="treatMatchCde" label-width="120px">
        <el-input v-model="form.diaMatParameterCde" placeholder="请输入高层诊疗码" />
      </el-form-item>
      <el-form-item label="高层诊断码描述" prop="treatMatchDesc" label-width="120px">
        <el-input v-model="form.diaMatchDesc" placeholder="请输入高层诊疗码描述" />
      </el-form-item>

      <el-form-item label="诊疗代码类型" prop="treatTyp" label-width="120px">
        <el-select v-model="form.treatTyp" placeholder="请选择">
          <el-option
            v-for="item in businessData.TreatCodeTyp"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="起始诊疗码" prop="medicDetailStart" label-width="120px">
        <el-input v-model="form.medicDetailStart" placeholder="请输入起始诊疗码" />
      </el-form-item>
      <el-form-item label="终止诊疗码" prop="medicDetailEnd" label-width="120px">
        <el-input v-model="form.medicDetailEnd" placeholder="请输入终止诊疗码" />
      </el-form-item>

      <el-form-item label="高层诊疗码" prop="treatMatchCde" label-width="120px">
        <el-input v-model="form.treatMatchCde" placeholder="请输入高层诊疗码" />
      </el-form-item>
      <el-form-item label="高层诊疗码描述" prop="treatMatchDesc" label-width="120px">
        <el-input v-model="form.treatMatchDesc" placeholder="请输入高层诊疗码描述" />
      </el-form-item>

      <el-row>
        <el-form-item label="费用类型" prop="categoryNo" label-width="120px">
          <div class="check">
            <el-checkbox v-model="checkCateAll" :indeterminate="isCateIndeterminate" @change="handleCheckCateAllChange">全选</el-checkbox>
            <div style="margin-left: 20px" />
            <el-checkbox-group v-model="categoryNo" @change="handleCheckedCateChange">
              <el-checkbox
                v-for="item in businessData.CostTyp"
                :key="item.value"
                :label="item.value"
              >{{ item.value+"-"+item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-row>
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
      <el-form-item label="起始年纪" prop="startingAge" label-width="120px">
        <el-input v-model="form.startingAge" placeholder="请输入起始年纪" />
      </el-form-item>

      <el-form-item label="终止年纪" prop="endAge" label-width="120px">
        <el-input v-model="form.endAge" placeholder="请输入终止年纪" />
      </el-form-item>

      <el-form-item label="性别" prop="sex" label-width="120px">
        <el-select v-model="form.sex" placeholder="请选择">
          <el-option
            v-for="item in businessData.CEasyDiaSex"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医院网络码" prop="hospitalNetCde" label-width="120px">
        <el-input v-model="form.hospitalNetCde" placeholder="请选择医院网络码">
          <svg-icon slot="suffix" icon-class="search" @click="hanldeMatch(1)" />
        </el-input>
      </el-form-item>
      <match v-model="matchVisable" :match-typ="matchTyp" @matchConfirm="matchConfirm" />

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
      basePath: 'exclusionsDuty',
      form: {
        id: '',
        exclusionsCde: '',
        exclusionsTyp: '',
        exclusionsDesc: '',
        invoiceTyp: '',
        explainCde: '',
        explainCdeDesc: '',
        quotaCodeTyp: '',
        quotaStarCde: '',
        quotaStarCdeDesc: '',
        quotaEndCde: '',
        quotaEndCdeDesc: '',
        sex: '',
        startingAge: '',
        endAge: '',
        hospitalLevel: '',
        hospitalTyp: '',
        hospitalNetCde: '',
        treamentTyp: [],
        diaMatDesc: '',
        diaMatParameterCde: '',
        treatTyp: '',
        medicDetailStart: '',
        medicDetailEnd: '',
        treatMatchCde: '',
        treatMatchDesc: '',
        categoryNo: []
      },
      matchVisable: false,
      matchTyp: null,
      categoryNo: [],
      checkCateAll: false,
      categoryNoArr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '99'],
      isCateIndeterminate: false,
      treatmentTyp: [],
      treatmentTypArr: ['1', '2', '3', '4'],
      checkAll: false,
      isIndeterminate: true,
      rules: {
        exclusionsCde: [{ required: true, trigger: 'blur', message: '请输入除外责任码' }],
        exclusionsDesc: [{ required: true, trigger: 'blur', message: '请输入除外责任说明' }],
        exclusionsTyp: [{ required: true, trigger: 'blur', message: '请输入除外责任类型' }],
        invoiceTyp: [{ required: true, trigger: 'blur', message: '请输入就诊类型' }],
        explainCde: [{ required: true, trigger: 'blur', message: '请输入解释码' }],
        explainCdeDesc: [{ required: true, trigger: 'blur', message: '请输入解释码描述' }],
        quotaCodeTyp: [{ required: true, trigger: 'blur', message: '请输入代码类型' }],
        quotaStarCde: [{ required: true, trigger: 'blur', message: '请输入起始代码描述' }],
        quotaEndCde: [{ required: true, trigger: 'blur', message: '请输入终止代码' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.dialogVisible = true
      if (this.form.categoryNo) {
        this.categoryNo = this.form.categoryNo
      }
      if (this.form.treamentTyp) {
        this.treatmentTyp = this.form.treamentTyp
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
    clearForm() {
      this.form.id = null
      this.form.exclusionsCde = null
      this.form.exclusionsTyp = null
      this.form.exclusionsDesc = null
      this.form.invoiceTyp = null
      this.form.explainCde = null
      this.form.explainCdeDesc = null
      this.form.quotaCodeTyp = null
      this.form.quotaStarCde = null
      this.form.quotaStarCdeDesc = null
      this.form.quotaEndCde = null
      this.form.quotaEndCdeDesc = null
      this.form.sex = null
      this.form.startingAge = null
      this.form.endAge = null
      this.form.hospitalLevel = null
      this.form.hospitalTyp = null
      this.form.hospitalNetCde = null
      this.form.treamentTyp = null
      this.form.diaMatDesc = null
      this.form.diaMatParameterCde = null
      this.form.treatTyp = null
      this.form.medicDetailStart = null
      this.form.medicDetailEnd = null
      this.form.treatMatchCde = null
      this.form.treatMatchDesc = null
      this.form.categoryNo = []
      this.categoryNo = []
      this.treatmentTyp = []
    },

    handleCheckCateAllChange(val) {
      this.form.categoryNo = val ? this.categoryNoArr : []
      this.isCateIndeterminate = false
    },
    handleCheckedCateChange(value) {
      const checkedCount = value.length
      this.checkCateAll = checkedCount === this.businessData.CostTyp.length
      this.isCateIndeterminate = checkedCount > 0 && checkedCount < this.businessData.CostTyp.length
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

    hanldeMatch(matchTyp) {
      this.matchVisable = true
      this.matchTyp = matchTyp
    },
    matchConfirm(data) {
      if (data.prodCde) { // 参数码
        this.form.hospitalNetCde = data.prodCde
      }
      if (data.explCde) { // 解释码
        this.form.explainCde = data.explCde
        this.form.explainCdeDesc = data.explCdeDesc
      }
      if (data.diaCde && this.matchTyp === 3) {
        this.form.quotaStarCde = data.diaCde
        this.form.quotaStarCdeDesc = data.diaDesc
      }
      if (data.diaCde && this.matchTyp === 4) {
        this.form.quotaEndCde = data.diaCde
        this.form.quotaEndCdeDesc = data.diaDesc
      }
    },
    handleClose() {
      this.clearForm()
      this.dialogVisible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.categoryNo) {
            this.form.categoryNo = this.categoryNo
          }
          this.form.treamentTyp = this.treatmentTyp
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

