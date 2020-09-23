<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.batchNo" style="width: 200px;" placeholder="请输入批次号查询" />
        <el-input v-model="listQuery.status" style="width: 200px;" placeholder="请选择" />
        <el-input v-model="listQuery.taskId" style="width: 200px;" placeholder="请输入任务id" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请号" width="200">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="任务id" width="200">
          <template slot-scope="scope">
            {{ scope.row.taskId }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="任务名称" width="200">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="匹配结果" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.selectValue" placeholder="请选择">
              <el-option
                v-for="item in scope.row.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column align="center" label="检索条件" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.searchName" size="small" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleSearch(scope.row)">检索</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="检索结果" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.selectSearchValue" placeholder="请选择">
              <el-option
                v-for="item in scope.row.searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <!--  <el-table-column align="center" label="编辑">
          <template slot-scope="scope">
            <el-button v-show='!scope.row.edit' type="primary" @click='scope.row.edit=true' size="small" icon="edit">编辑</el-button>
            <el-button v-show='scope.row.edit' type="success"  @click='handleFinish(scope.row)' size="small" icon="check">完成</el-button>
          </template>
        </el-table-column>-->
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">保存</el-button>
          </template>
        </el-table-column>-->
      </el-table>

      <save :son-data="form" :business-data="businessData" @sonStatus="status" />

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
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'treatMatchTask',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id',
        batchNo: '',
        status: '',
        taskId: ''
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      DiaMatchTyp: {}
    }
  },
  created() {
    /* if (this.$route.query.pubCoverId) { // 上级页面传入参数
          this.listQuery.pubCoverId = this.$route.query.pubCoverId
        }*/
    // this.fetchData()
    this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['DiaMatchTyp'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            !this[key] && (this[key] = {})
            this[key][item.value] = item.label
          })
        }
        this.fetchData()
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

    handleSearch(row) {

    },
    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此数据？, 是否继续?', '提示', {
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
