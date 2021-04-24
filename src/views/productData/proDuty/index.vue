<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.proDutyNme" style="width: 200px;" placeholder="请输入责任名称查询" />
        <el-input v-model="listQuery.proDuty" style="width: 200px;" placeholder="请输入责任号查询" />
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
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="责任号	" width="150">
          <template slot-scope="scope">
            {{ scope.row.proDuty }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="责任名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.proDutyNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="责任类型" width="150">
          <template slot-scope="scope">
            {{ CProDutyTyp[scope.row.proDutyTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊类型" width="150">
          <template slot-scope="scope">
            {{ CProDutyDesc[scope.row.vistDoctor] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否意外" width="150">
          <template slot-scope="scope">
            {{ CIsAcciddent[scope.row.isAcciddent] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否生育" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isBirth] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否齿科" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isDentidtry] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否重疾" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isStricken] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
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
import Pagination from '@/components/Pagination'
import Save from './save'
import { getCodeList } from '@/api/code'

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      basePath: 'proDuty',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        proDutyNme: '',
        proDuty: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      paramRadio: false,
      businessData: {},
      CProDutyDesc: {},
      CProDutyTyp: {},
      TrueOrFalse: {},
      CIsAcciddent: {}
    }
  },
  created() {
    this.fetchTypeData()
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

    fetchTypeData() {
      getCodeList({ parent: ['TrueOrFalse', 'CProDutyDesc', 'CProDutyTyp', 'CIsAcciddent'] }).then(res => {
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

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此业务线？, 是否继续?', '提示', {
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
