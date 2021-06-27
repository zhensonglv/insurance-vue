<template>
  <el-dialog title="设置" :visible.sync="dialogTableVisible" append-to-body width="80%">
    <div>
      <template v-if="type == 1">
        <h1>保单号</h1>
        <el-input v-model="a" style="width: 200px;" placeholder="保单号" />
      </template>

      <template v-if="type == 2">
        <h1>甲方公司</h1>
        <el-input v-model="a" style="width: 200px;" placeholder="甲方公司" />
      </template>

      <template v-if="type == 3">
        <h1>诊断码</h1>
        <el-input v-model="a" style="width: 200px;" placeholder="诊断码" />
      </template>
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
import { getList } from '@/api/base'
export default {
  name: 'DialogSet',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      a: '',
      paramType: 'param_0015',
      list: null,
      listLoading: true,
      basePath: 'paramManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        prodCde: '',
        applyTyp: '',
        paramterTyp: '',
        paramterDesc: '',
        sort: '+id'
      },
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
    }
  },
  created() {
    /* this.listQuery.paramterTyp = 'param_0015'*/
    /* this.queryData()*/
  },
  methods: {
    queryData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
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
