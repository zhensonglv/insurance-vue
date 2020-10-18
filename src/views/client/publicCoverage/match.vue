<template>
  <el-dialog :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">

    <div v-if="matchTyp == '1'">
      <group dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else-if="matchTyp == '2'">
      <insuranceCompany dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div v-else>
      <product dialog @setMultipleSeleValues="setMultipleSeleValues" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import group from '../../client/group'
import insuranceCompany from '../../client/insuranceCompany'
import product from '../../productData/product'
export default {
  name: 'Match',
  components: { group, insuranceCompany, product },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    matchTyp: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'group',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        prodCde: '',
        groupNme: '',
        sort: '+id'
      },
      total: 0,
      multipleSeleValues: [],
      dialogTableVisible: false,
      title: null
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    matchTyp(val) {
      if (val === '1') {
        this.basePath = 'group'
        this.title = '集团'
      } else if (val === '2') {
        this.basePath = 'insuranceCompany'
        this.title = '团体'
      } else if (val === '3') {
        this.basePath = 'product'
        this.title = '产品'
      }
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {

  },
  methods: {

    handleClose() {
      this.dialogTableVisible = false
    },
    setMultipleSeleValues(value) {
      this.multipleSeleValues = value
    },
    onSubmit() {
      this.$emit('matchConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
