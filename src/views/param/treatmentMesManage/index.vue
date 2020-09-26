<template>
  <div class="app-container">
    <el-card>
      <div>

        <el-input v-model="listQuery.treatNo" style="width: 200px;" placeholder="请输入诊疗码查询" />
        <el-input v-model="listQuery.treatDrugForm" style="width: 200px;" placeholder="请输入剂型查询" />
        <el-input v-model="listQuery.cateGoryNoDesc" style="width: 200px;" placeholder="请输入大项名称查询" />
        <el-input v-model="listQuery.subCateGoryName" style="width: 200px;" placeholder="请输入适应症名称查询" />
        <el-input v-model="listQuery.treatDesc" style="width: 200px;" placeholder="请输入诊疗描述查询" />
        <el-input v-model="listQuery.treatmentAlias" style="width: 200px;" placeholder="请输入别名查询" />
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
        <el-table-column align="center" label="诊疗码" width="150">
          <template slot-scope="scope">
            {{ scope.row.treatNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="剂型码" width="150">
          <template slot-scope="scope">
            {{ scope.row.drugformCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="剂型" width="150">
          <template slot-scope="scope">
            {{ CTreatDrugForm[scope.row.treatDrugForm] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="诊疗类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.treatTyp }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="成分代码" width="150">
          <template slot-scope="scope">
            {{ scope.row.componentCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="成分描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.componentDesc }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="诊疗描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.treatDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.treatEngDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="从属剂型" width="150">
          <template slot-scope="scope">
            {{ scope.row.belongDrugform }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="大项号" width="150">
          <template slot-scope="scope">
            {{ scope.row.cateGoryNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="大项号描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.cateGoryNoDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="适应症号" width="150">
          <template slot-scope="scope">
            {{ scope.row.subCateGoryNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="适应症名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.subCateGoryName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="别名" width="150">
          <template slot-scope="scope">
            {{ scope.row.treatmentAlias }}
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
      basePath: 'treatmentMesManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        treatNo: '',
        treatDrugForm: '',
        cateGoryNoDesc: '',
        subCateGoryName: '',
        treatDesc: '',
        treatmentAlias: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      CTreatDrugForm: {},
      CostTyp: {},
      businessData: {}
    }
  },
  created() {
    /* if (this.$route.query.amountCode) { // 上级页面传入参数
      this.listQuery.amountCode = this.$route.query.amountCode
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
    resetData() {
      this.listQuery.treatNo = null
      this.listQuery.treatDrugForm = null
      this.listQuery.cateGoryNoDesc = null
      this.listQuery.subCateGoryName = null
      this.listQuery.treatDesc = null
      this.listQuery.treatmentAlias = null
    },
    fetchTypeData() {
      // 获取codeList
      var parantData = ['CTreatDrugForm', 'CostTyp']
      getCodeList({ parent: parantData }).then(res => {
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
