<template>
  <div class="app-container">
    <el-card>
      <div class="left">
        <el-tree ref="tree" :data="treeData" :expand-on-click-node="false" @node-click="handleNodeClick">
          <template slot-scope="{ node, data }">
            <div>
              <svg-icon :icon-class="data.icon || 'group'" />
              {{ data.label }}
              <span class="action">
                <el-button type="text" @click="add(data)">新增</el-button>
                <el-button type="text" @click="update(data)">修改</el-button>
                <el-button type="text" @click="remove(data, node)">删除</el-button>
              </span>
            </div>
          </template>
        </el-tree>
      </div>
      <br>
      <div class="right">
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index +1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="集团号" width="150">
            <template slot-scope="scope">
              {{ scope.row.groupNo }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="集团名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.groupNme }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.pageNum"
          :limit.sync="listQuery.pageSize"
          @pagination="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList, findById, del } from '@/api/base'
import Pagination from '@/components/Pagination'
let id = 1000

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      basePath: 'group',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        groupNme: undefined,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      treeData: [{
        id: 1,
        icon: 'group',
        label: '一级 2',
        children: [{
          id: 3,
          icon: 'team',
          label: '二级 2-1',
          children: [{
            icon: 'bill',
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    add(data) {
      console.log(data, 'data----add')
      // 钱总可以在这个之前写业务逻辑获取
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    update(data) {
      console.log(data, 'data----update')
    },
    remove(data, node) {
      // 钱总可以在这个之前写业务逻辑获取
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      console.log(data, 'data----delete')
    },
    handleNodeClick(data) {
      console.log(data, '---')
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
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

    handleRoute(data) {
      console.log(data, '钱总来了---')
      this.$router.push('/system/dict')
    },

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此集团？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(this.basePath, id).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
          this.fetchData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  float: left;
  width: 40%;
}
.right {
  display: inline-block;
  width: 50%;
  clear: left;
}
.action {
  margin-left: 50px;
}

</style>
