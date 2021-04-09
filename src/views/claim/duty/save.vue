<template>
  <el-dialog :title="dialogTitle" :before-close="handleClose" :visible.sync="dialogVisible" width="55%">
    <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">

      <div>
        <ul class="tab-tilte">
          <li>案件属性</li>
          <div class="right-part">
            <i @click="handlerThe1">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show1">
            <el-form-item label="意外" prop="isAccident" label-width="100px">
              <el-select v-model="form.isAccident" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="生育" prop="isBirth" label-width="100px">
              <el-select v-model="form.isBirth" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="齿科" prop="isDentidtry" label-width="100px">
              <el-select v-model="form.isDentidtry" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="工伤" prop="isInjuryJob" label-width="100px">
              <el-select v-model="form.isInjuryJob" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="重疾" prop="isStricken" label-width="100px">
              <el-select v-model="form.isStricken" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="医保投保" prop="isHasMedical" label-width="100px">
              <el-select v-model="form.isHasMedical" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="使用医保卡" prop="isUseMedical" label-width="100px">
              <el-select v-model="form.isUseMedical" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="是否特需" prop="isMust" label-width="100px">
              <el-select v-model="form.isMust" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesOrNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="急诊" prop="isEmergTreat" label-width="100px">
              <el-select v-model="form.isEmergTreat" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="康复" prop="isRehabiliation" label-width="100px">
              <el-select v-model="form.isRehabiliation" placeholder="请选择">
                <el-option
                  v-for="item in businessData.YesOrNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="缺材料" prop="isLackMaterial" label-width="100px">
              <el-select v-model="form.isLackMaterial" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="指定医院" prop="isDesignHospital" label-width="100px">
              <el-select v-model="form.isDesignHospital" placeholder="请选择指定医院">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="既往病史" prop="isMedicalHistory" label-width="100px">
              <el-select v-model="form.isMedicalHistory" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略等待期" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignWait" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略除外责任" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignExcelusion" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="忽略医保卡使用规则" prop="isignWait" label-width="100px">
              <el-select v-model="form.isignUseCardRule" placeholder="请选择">
                <el-option
                  v-for="item in businessData.TrueOrFalse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

          </div>
        </el-collapse-transition>
      </div>
      <div>
        <ul class="tab-tilte">
          <li>责任信息</li>
          <div class="right-part">
            <i @click="handlerThe2">折叠</i>
          </div>
        </ul>
        <el-collapse-transition>
          <div v-if="show2">
            <el-form-item label="批次号" prop="batchNo" label-width="120px">
              <el-input v-model="form.batchNo" placeholder="请输入批次号" />
            </el-form-item>

            <el-form-item label="分单号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.plyPartNo" placeholder="请输入分单号" />
            </el-form-item>

            <el-form-item label="保单号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.plyNo" placeholder="请输入保单号" />
            </el-form-item>

            <el-form-item label="客户申请号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.customAppNo" placeholder="请输入客户申请号" />
            </el-form-item>

            <el-form-item label="产品号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.prodNo" placeholder="请输入产品号" />
            </el-form-item>

            <el-form-item label="产品名称" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.prodName" placeholder="请输入产品名称" />
            </el-form-item>

            <el-form-item label="险种号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.cvrgNo" placeholder="请输入险种号" />
            </el-form-item>

            <el-form-item label="责任号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.responseNo" placeholder="请输入责任号" />
            </el-form-item>

            <el-form-item label="甲方产品号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaProdNo" placeholder="请输入甲方产品号" />
            </el-form-item>

            <el-form-item label="甲方产品名称" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaProdName" placeholder="请输入甲方产品名称" />
            </el-form-item>

            <el-form-item label="甲方险种号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaCvrgNo" placeholder="请输入甲方险种号" />
            </el-form-item>

            <el-form-item label="甲方险种名称" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaCvrgName" placeholder="请输入甲方险种名称" />
            </el-form-item>

            <el-form-item label="甲方责任号" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaResponseNo" placeholder="请输入甲方责任号" />
            </el-form-item>

            <el-form-item label="甲方责任名称" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.partaResponseName" placeholder="请输入甲方责任名称" />
            </el-form-item>

            <el-form-item label="总金额" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.invoiceSum" placeholder="请输入总金额" />
            </el-form-item>

            <el-form-item label="扣除金额" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.deductAmt" placeholder="请输入扣除金额" />
            </el-form-item>

            <el-form-item label="可理算金额" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.clacAmt" placeholder="请输入可理算金额" />
            </el-form-item>

            <el-form-item label="赔付金额" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.compensateAmt" placeholder="请输入赔付金额" />
            </el-form-item>

            <el-form-item label="最终赔付金额" prop="plyPartNo" label-width="120px">
              <el-input v-model="form.finalCompensateAmt" placeholder="请输入最终赔付金额" />
            </el-form-item>

            <el-form-item label="赔付结论" prop="compensateResult" label-width="120px">
              <el-select v-model="form.compensateResult" placeholder="请选择">
                <el-option
                  v-for="item in businessData.AdjustmentType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="校验审核信息" prop="auditInformation" label-width="120px">
              <el-input v-model="form.auditInformation" placeholder="请输入校验审核信息" />
            </el-form-item>

            <!--    <el-form-item label="申请层id" prop="clmAppId" label-width="120px">
              <el-input v-model="form.clmAppId" placeholder="请输入申请层id" />
            </el-form-item>-->

            <el-row>
              <el-form-item label="结论描述" prop="conclusionDesc" label-width="100px">
                <el-input v-model="form.conclusionDesc" type="textarea" style="width: 800px;" :autosize="{ minRows: 2, maxRows: 20}" placeholder="请输入结论描述" clearable />
              </el-form-item>
            </el-row>
          </div>
        </el-collapse-transition>
      </div>
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
import { initDutyData, save, edit } from '@/api/claim/duty'

export default {
  // 父组件向子组件传值，通过props获取。
  // 一旦父组件改变了`sonData`对应的值，子组件的`sonData`会立即改变，通过watch函数可以实时监听到值的变化
  // `props`不属于data，但是`props`中的参数可以像data中的参数一样直接使用
  props: ['sonData', 'businessData'],
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        id: '',
        clmAppId: '',
        batchNo: '',
        plyPartNo: '',
        plyNo: '',
        customAppNo: '',
        prodNo: '',
        prodName: '',
        cvrgNo: '',
        responseNo: '',
        partaProdNo: '',
        partaProdName: '',
        partaCvrgNo: '',
        partaCvrgName: '',
        partaResponseNo: '',
        partaResponseName: '',
        invoiceSum: '',
        deductAmt: '',
        clacAmt: '',
        compensateAmt: '',
        finalCompensateAmt: '',
        compensateResult: '',
        conclusionDesc: '',
        auditInformation: '',
        isAccident: '',
        isEmergTreat: '',
        isLackMaterial: '',
        isMedicalHistory: '',
        isBirth: '',
        isInjuryJob: '',
        isStricken: '',
        isMust: '',
        isDesignHospital: '',
        isignWait: '',
        isHasMedical: '',
        isUseMedical: '',
        isDentidtry: '',
        isignUseCardRule: '',
        isignExcelusion: '',
        isRehabiliation: ''
      },
      show1: true,
      show2: true,
      oldForm: {},
      rules: {
        batchNo: [{ required: true, trigger: 'blur', message: '请输入批次号' }]
      }
    }
  },
  watch: {
    'sonData': function(newVal, oldVal) {
      this.form = newVal
      this.exeOldForm(newVal)
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
    handlerThe1() {
      this.show1 = !this.show1
    },
    handlerThe2() {
      this.show2 = !this.show2
    },
    clearForm() {
      this.form.id = null
      this.form.clmAppId = null
      this.form.batchNo = null
      this.form.plyPartNo = null
      this.form.plyNo = null
      this.form.customAppNo = null
      this.form.prodNo = null
      this.form.prodName = null
      this.form.cvrgNo = null
      this.form.responseNo = null
      this.form.partaProdNo = null
      this.form.partaProdName = null
      this.form.partaCvrgNo = null
      this.form.partaCvrgName = null
      this.form.partaResponseNo = null
      this.form.partaResponseName = null
      this.form.invoiceSum = null
      this.form.deductAmt = null
      this.form.clacAmt = null
      this.form.compensateAmt = null
      this.form.finalCompensateAmt = null
      this.form.compensateResult = null
      this.form.conclusionDesc = null
      this.form.auditInformation = null
      this.form.isAccident = null
      this.form.isEmergTreat = null
      this.form.isLackMaterial = null
      this.form.isMedicalHistory = null
      this.form.isBirth = null
      this.form.isInjuryJob = null
      this.form.isStricken = null
      this.form.isMust = null
      this.form.isDesignHospital = null
      this.form.isignWait = null
      this.form.isHasMedical = null
      this.form.isUseMedical = null
      this.form.isDentidtry = null
      this.form.isignUseCardRule = null
      this.form.isignExcelusion = null
      this.form.isRehabiliation = null
    },
    handleClose() {
      this.clearForm()
      this.clearFlag()
    },
    clearFlag() {
      this.dialogVisible = false
      this.show1 = true
      this.show2 = true
    },
    exeOldForm(newVal) {
      this.oldForm.isAccident = newVal.isAccident// 是否意外
      this.oldForm.isEmergTreat = newVal.isEmergTreat// 是否急诊
      this.oldForm.isLackMaterial = newVal.isLackMaterial// 缺材料
      this.oldForm.isBirth = newVal.isBirth// 生育
      this.oldForm.isInjuryJob = newVal.isInjuryJob// 工伤
      this.oldForm.isStricken = newVal.isStricken// 重疾
      this.oldForm.isHasMedical = newVal.isHasMedical// 医保投保
      this.oldForm.isUseMedical = newVal.isUseMedical// 是否使用医保卡
      this.oldForm.isDentidtry = newVal.isDentidtry// 齿科
      this.oldForm.isMust = newVal.isMust// 是否特需
      this.oldForm.isDesignHospital = newVal.isDesignHospital// 指定医院
      this.oldForm.isMedicalHistory = newVal.isMedicalHistory// 既往病史
      this.oldForm.isignWait = newVal.isignWait// 忽略等待期
      this.oldForm.isignUseCardRule = newVal.isignUseCardRule// 忽略医保卡使用规则
      this.oldForm.isignExcelusion = newVal.isignExcelusion// 忽略除外责任
      this.oldForm.isRehabiliation = newVal.isRehabiliation// 是否康复
    },
    checkOldForm() {
      var flag = false
      if (this.form.isAccident !== this.oldForm.isAccident) {
        flag = true
      }
      if (this.form.isDentidtry !== this.oldForm.isDentidtry) {
        flag = true
      }
      if (this.form.isBirth !== this.oldForm.isBirth) {
        flag = true
      }
      if (this.form.isDesignHospital !== this.oldForm.isDesignHospital) {
        flag = true
      }
      if (this.form.isignExcelusion !== this.oldForm.isignExcelusion) {
        flag = true
      }
      if (this.form.isignWait !== this.oldForm.isignWait) {
        flag = true
      }
      if (this.form.isMedicalHistory !== this.oldForm.isMedicalHistory) {
        flag = true
      }
      if (this.form.isignUseCardRule !== this.oldForm.isignUseCardRule) {
        flag = true
      }

      return flag
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
                this.clearFlag()
              } else {
                this._notify(response.msg, 'error')
              }
            })
          } else {
            if (this.checkOldForm()) {
              this.$confirm('是否初始化理赔数据？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                initDutyData(this.form).then(response => {
                  if (response.code === 200) {
                    this._notify(response.msg, 'success')
                    this.clearForm()
                    this.$emit('sonStatus', true)
                    this.clearFlag()
                  } else {
                    this._notify(response.msg, 'error')
                  }
                })
              }).catch(() => {
                edit(this.form).then(response => {
                  if (response.code === 200) {
                    this._notify(response.msg, 'success')
                    this.clearForm()
                    this.$emit('sonStatus', true)
                    this.clearFlag()
                  } else {
                    this._notify(response.msg, 'error')
                  }
                })
              })
            } else {
              edit(this.form).then(response => {
                if (response.code === 200) {
                  this._notify(response.msg, 'success')
                  this.clearForm()
                  this.$emit('sonStatus', true)
                  this.clearFlag()
                } else {
                  this._notify(response.msg, 'error')
                }
              })
            }
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

