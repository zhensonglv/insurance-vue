<template>
  <div class="app-container">
    <el-card>
      <div class="tab">
        <span v-for="(item, index) in tabData" :key="index">
          <span @click="handleTab(index)">{{ item }}</span>
          <i class="el-icon-arrow-right" />
        </span>
        <span>
          <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" circle @click="handlePublish" />
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
                  <el-button v-if="data.level!==7" type="text" @click="add(data)">新增</el-button>
                  <el-button type="text" @click="update(data)">修改</el-button>
                  <el-button type="text" @click="remove(data, node)">删除</el-button>
                </span>
              </div>
            </template>
          </el-tree>
        </div>
        <div class="right">
          <tableTop :set-tree-data="setTreeData" :type="1" />
          <br>
          <tableTop :set-tree-data="setTreeData" :type="2" />
        </div>
      </div>
    </el-card>
    <saveTreeDialog :son-data="form" :dialog-visible="dialogVisible" @sonStatus="status" />
  </div>
</template>

<script>
import { findById, getTree, delTree } from '@/api/base'
import { publish } from '@/api/tree/plytree'

import saveTreeDialog from './saveTreeDialog'
import tableTop from './table'

export default {
  components: { saveTreeDialog, tableTop },
  data() {
    return {
      expandArr: [],
      setTreeData: {},
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
      tabData: ['集团', '团体', '保单', '等级', '产品', '险种', '责任']
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
      for (const item of levelIds) {
        if (item.level <= count) {
          this.expandArr.push(item.id)
        }
      }
    },
    getExpandArr(data) {
      return data.reduce((list, item) => {
        const { children, id, level } = item
        list.push({
          level: level,
          id: id
        })
        if (children && children.length > 0) {
          list = list.concat(this.getExpandArr(children))
        }
        return list
      }, [])
    },
    add(data) {
      var levelType = null
      if (data.level === 1) {
        levelType = 'insurancedept'
      } else if (data.level === 2) {
        levelType = 'policy'
      } else if (data.level === 3) {
        levelType = 'inslv'
      } else if (data.level === 4) {
        levelType = 'product'
      } else if (data.level === 5) {
        levelType = 'insurecde'
      } else if (data.level === 6) {
        levelType = 'exdutycde'
      }
      this.form = { pid: data.id, level: data.level + 1, type: levelType, id: null }
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
      this.setTreeData = data
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

    handlePublish() {
      publish(this.basePath, this.treeQuery).then(response => {
        if (response.code === 200) {
          this._notify('发布成功', 'success')
          this.fetchTreeData()
        } else {
          this._notify(response.msg, 'error')
        }
      }).catch(() => {
        this._notify('已取消发布', 'info')
      })
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
