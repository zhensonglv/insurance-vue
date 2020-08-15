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
          <tableTop :tree-id="treeId" :type="1" />
          <br>
          <tableTop :tree-id="treeId" :type="2" />
        </div>
      </div>
    </el-card>
    <saveTreeDialog :son-data="form" :dialog-visible="dialogVisible" @sonStatus="status" />
  </div>
</template>

<script>
import { findById, getTree, delTree } from '@/api/base'
import saveTreeDialog from './saveTreeDialog'
import tableTop from './table'

export default {
  components: { saveTreeDialog, tableTop },
  data() {
    return {
      expandArr: [],
      treeId: null,
      rowId: null,
      basePath: 'plyTreeConfig',
      paramPath: 'plyTreeSetParam',
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
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
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
        })
      }).catch(() => {
        this._notify('已取消删除', 'info')
      })
    },
    handleNodeClick(data) {
      console.log(data, '---')
      this.treeId = data.id
    },
    fetchTreeData() {
      getTree(this.basePath, this.treeQuery).then(response => {
        this.treeData = response.data
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
      }
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
