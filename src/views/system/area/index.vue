<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.areaCode" style="width: 200px;" placeholder="请输入代码查询" />
        <el-input v-model="listQuery.level" style="width: 200px;" placeholder="请输入类型查询" />
        <el-input v-model="listQuery.name" style="width: 200px;" placeholder="请输入中文名称查询" />
        <el-input v-model="listQuery.pid" style="width: 200px;" placeholder="请输入父类查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column
          type="center"
          label="选择"
          width="55"
        >
          <template slot-scope="scope">
            <el-radio v-model="paramRadio" :label="scope.$index" @change.native="handleSelect(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.areaCode }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.levelStr }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="父类" width="150">
          <template slot-scope="scope">
            {{ scope.row.parentName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="中文名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.pinyin }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="简称" width="150">
          <template slot-scope="scope">
            {{ scope.row.shortName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="邮编" width="150">
          <template slot-scope="scope">
            {{ scope.row.zipCode }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <save :son-data="form" @sonStatus="status" />

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
    </el-card>
  </div>
</template>

<script>
import { getList, findById, del } from '@/api/base'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  /* props:{
    level : Number
  },*/
  /* watch: {
    level(val) {debugger
      if(val){
        this.listQuery.level = val
        this.fetchData()
      }
    }
  },*/
  data() {
    return {
      list: null,
      basePath: 'area',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      paramRadio: false,
      form: null
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
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
    },
    fetchData() {
      this.listLoading = true
      this.paramRadio = false
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

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此字典？, 是否继续?', '提示', {
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
