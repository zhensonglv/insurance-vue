<template>
  <div class="app-container">
    <el-card>
      <div>

        <el-input v-model="listQuery.paramCde" style="width: 200px;" placeholder="请输入参数码查询" />

        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="承诺后N天赔付" width="150">
          <template slot-scope="scope">
            {{ scope.row.payoutAfterDay }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否忽略" width="150">
          <template slot-scope="scope">
            {{ scope.row.byPass }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="生效日" width="150">
          <template slot-scope="scope">
            {{ scope.row.startTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止日" width="150">
          <template slot-scope="scope">
            {{ scope.row.endTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="起始代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.sickBgnCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="起始代码描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.sickEndDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.sickEndDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止代码描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.sickEndDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
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
      basePath: 'clientAnamnesis',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        plyNo: '',
        plyPartNo: '',
        insuredNo: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      DiaMatchTyp: {}
    }
  },
  created() {
    if (this.$route.query.plyNo) { // 上级页面传入参数
      this.listQuery.plyNo = this.$route.query.plyNo
    }
    if (this.$route.query.plyPartNo) { // 上级页面传入参数
      this.listQuery.plyPartNo = this.$route.query.plyPartNo
    }
    if (this.$route.query.insuredNo) { // 上级页面传入参数
      this.listQuery.insuredNo = this.$route.query.insuredNo
    }
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
    resetData() {
      this.listQuery.paramCde = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['DiaMatchTyp', 'TrueOrFalse'] }).then(res => {
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
      this.form = { id: null, plyNo: this.listQuery.plyNo, plyPartNo: this.listQuery.plyPartNo, insuredNo: this.listQuery.insuredNo }
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
