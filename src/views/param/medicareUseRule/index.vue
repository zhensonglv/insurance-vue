<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.medicareParamCde" style="width: 200px;" placeholder="请输入医保规则参数码查询" />
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

        <el-table-column align="center" label="医保规则参数码" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicareParamCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="社保地" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicareAddress }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院码" width="150">
          <template slot-scope="scope">
            {{ scope.row.hospitalCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="是否使用医保卡" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isUseMedicare] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="适用层级" width="150">
          <template slot-scope="scope">
            {{ scope.row.accidentTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="人员类别" width="150">
          <template slot-scope="scope">
            {{ scope.row.suitLevel }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="就诊类型" width="150">
          <template slot-scope="scope">
            {{ CProDutyDesc[scope.row.visitTyp] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="事故类型" width="150">
          <template slot-scope="scope">
            {{ AccidentType[scope.row.userTyp] }}

          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicareRemark }}
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
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  props: {
    paramCode: String
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'medicareUseRule',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        medicareParamCde: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      TrueOrFalse: {},
      CProDutyDesc: {},
      AccidentType: {}
    }
  },
  watch: {
    paramCode: {
      handler(v) {
        if (v) {
          this.listQuery.medicareParamCde = v
          this.fetchTypeData()
        }
      },
      immediate: true
    }
  },
  created() {
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
      getCodeList({ parent: ['TrueOrFalse', 'AccidentType', 'CProDutyDesc'] }).then(res => {
        debugger
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
      this.form = { id: null, medicareParamCde: this.listQuery.medicareParamCde }
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
