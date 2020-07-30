<template>
  <div class="app-container">
    <el-card>
      <div class="tab">
        <span v-for="(item, index) in tabData" :key="index">
          <span @click="handleTab(index)">{{ item }}</span>
          <i class="el-icon-arrow-right" />
        </span>
      </div>

      <div class="content">
        <div class="left">
          <el-tree
            ref="tree"
            :data="treeData"
            node-key="id"
            :default-expanded-keys="expandArr"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <template slot-scope="{ node, data }">
              <div>
                <svg-icon :icon-class="data.icon || 'group'" />
                {{ data.name }}
                <span class="action">
                  <el-button type="text" @click="add(data)">新增</el-button>
                  <el-button type="text" @click="update(data)">修改</el-button>
                  <el-button type="text" @click="remove(data, node)">删除</el-button>
                </span>
              </div>
            </template>
          </el-tree>
        </div>
        <div class="right">
          <tableTop :tree-id="treeId" />
          <br>
          <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index +1 }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="95">
              <template slot-scope="scope">
                <el-button type="text" size="mini" class="action-button" @click="set(scope.row)">设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="通用参数名称" width="150">
              <template slot-scope="scope">
                {{ scope.row.paramDesc }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="paramCode" label="参数码" width="150" />
            <el-table-column align="center" prop="paramDesc" label="描述" width="150" />
            <el-table-column align="center" prop="isValid" label="状态" width="150" />
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
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
      </div>
    </el-card>
    <saveTreeDialog :son-data="form" :dialog-visible="dialogVisible" @sonStatus="status" />
    <setDialog :id="rowId" :set-dialog-visible="setDialogVisible" />
  </div>
</template>

<script>
import { del, findById, getTree, delTree, getList } from '@/api/base'
import Pagination from '@/components/Pagination'
import saveTreeDialog from './saveTreeDialog'
import tableTop from './table'
import setDialog from './setDialog'

export default {
  components: { Pagination, saveTreeDialog, tableTop, setDialog },
  data() {
    return {
      list: [],
      expandArr: [],
      treeId: null,
      rowId: null,
      basePath: 'plyTreeConfig',
      paramPath: 'plyTreeSetParam',
      setDialogVisible: false,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyTreeId: undefined,
        type: undefined,
        level: undefined,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      treeQuery: {
        dataNo: null,
        level: null
      },
      form: null,
      treeData: [],
      tabData: ['集团', ' 团体', '保单', ' 等级', '产品', ' 险种', '责任']
    }
  },
  created() {
    if (this.$route.query.plyNo) {
      this.treeQuery.dataNo = this.$route.query.plyNo
      this.treeQuery.level = 3
    }
    this.fetchTreeData()
    this.fetchData()
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    set(row) {
      this.rowId = row.id
      this.setDialogVisible = true
    },
    handleTab(count) {
      this.expandArr = []
      const levelIds = this.getExpandArr(this.treeData)
      this.expandArr = levelIds.slice(0, count + 1)
    },
    getExpandArr(data) {
      return data.reduce((list, item) => {
        const { children, id } = item
        list.push(id)
        if (children && children.length > 0) {
          list = list.concat(this.getExpandArr(children))
        }
        return list
      }, [])
    },
    add(data) {
      this.form = { pid: data.id, id: null }
      this.dialogVisible = true
    },
    update(data) {
      findById(this.basePath, data.id).then(response => {
        this.form = response.data
      })
      this.dialogVisible = true
    },
    remove(data, node) {
      this.$confirm('你确定永久删除此配置？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTree(this.basePath, data).then(response => {
          if (response.code === 200) {
            this._notify(response.msg, 'success')
          } else {
            this._notify(response.msg, 'error')
          }
          this.fetchTreeData()
          this.fetchData()
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    },
    handleNodeClick(data) {
      console.log(data, '---')
      this.treeId = data.id
      this.listQuery.plyTreeId = this.treeId
      this.listQuery.level = data.level
      this.fetchData()
    },
    fetchTreeData() {
      getTree(this.basePath, this.treeQuery).then(response => {
        this.treeData = response.data
      })
    },
    fetchData() {
      this.listQuery.type = 2
      getList(this.paramPath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSave() {
      this.form = { id: null }
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
        this.fetchTreeData()
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此配置？, 是否继续?', '提示', {
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
.tab {
  cursor: pointer;
  margin-bottom: 10px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.left {
  width: 35%;
}
.right {
  width: 65%;
}
.action {
  margin-left: 50px;
}

</style>
