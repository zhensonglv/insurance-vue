<template>
  <div class="app-container">
    <!-- <table-component :list="list" :list-query="listQuery" /> -->
    <company aggregate />
  </div>
</template>

<script>
import { getList, findById } from '@/api/base'
import company from '../company'

export default {
  components: { company },
  data() {
    return {
      list: null,
      basePath: 'clientAlias',
      listLoading: true,
      listQuery: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        aliasNme: '',
        sort: '+id'
      },
      dialogVisible: false,
      form: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.listQuery.total = response.data.total
        this.listLoading = false
      })
    },
    handleSave() {
      this.form = { id: null }
      this.dialogVisible = true
    },
    handleEdit(id) {
      // 跳转到新的页面
      findById(this.basePath, id).then(response => {
        this.form = response.data
      })
    },

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.app-container >>> .el-table__expanded-cell {
  padding: 10px 20px;
  .app-container {
    padding: 0;
  }
}
</style>
