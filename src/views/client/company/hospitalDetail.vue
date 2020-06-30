<template>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible" append-to-body>
    <el-table :data="gridData" type="selection" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column property="date" label="日期" width="150" />
      <el-table-column property="name" label="姓名" width="200" />
      <el-table-column property="address" label="地址" />
    </el-table>
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
export default {
  name: 'Hospital',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      console.log(val, '---')
      this.dialogTableVisible = val
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClose() {
      console.log('close')
      this.dialogTableVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSubmit() {
      if (this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$emit('hospitalConfirm', this.multipleSelection)
      console.log('comfirm---', this.multipleSelection)
      this.dialogTableVisible = false
    }
  }
}
</script>
