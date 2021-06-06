<template>
  <el-dialog :modal="false" :title="title" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <baseArea dialog @setMultipleSeleValues="setMultipleSeleValues" />
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
import baseArea from '../../system/area'
export default {
  name: 'Match',
  components: { baseArea },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    areaTyp: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      setParamData: { paramCode: null, paramType: 'param_0015' },
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        prodCde: '',
        applyTyp: '',
        paramterTyp: '',
        paramterDesc: '',
        sort: '+id'
      },
      title: null,
      total: 0,
      multipleSeleValues: [],
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    },
    areaTyp(val) {
      if (val === 1) {
        this.title = '事故地'
      } else if (val === 2) {
        this.title = '承保地'
      }
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
      this.$emit('areaConfirm', this.multipleSeleValues)
      this.dialogTableVisible = false
    }
  }
}
</script>
