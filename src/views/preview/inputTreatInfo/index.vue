<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="序号" width="250">
          <template slot-scope="scope">
            {{ scope.row.idx }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="录入名称" width="250">
          <template slot-scope="scope">
            {{ scope.row.inputNme }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="录入剂型" width="250">
          <template slot-scope="scope">
            {{ scope.row.inputDrug }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="录入比例" width="250">
          <template slot-scope="scope">
            {{ scope.row.inputRate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="录入医保类型" width="250">
          <template slot-scope="scope">
            {{ scope.row.inputSecuTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="费用编码" width="250">
          <template slot-scope="scope">
            {{ scope.row.treatCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="费用名称" width="250">
          <template slot-scope="scope">
            {{ scope.row.payNme }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医保地省" width="250">
          <template slot-scope="scope">
            {{ scope.row.province }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医保地市" width="250">
          <template slot-scope="scope">
            {{ scope.row.city }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="系统比例" width="250">
          <template slot-scope="scope">
            {{ scope.row.sysRate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="费用金额" width="250">
          <template slot-scope="scope">
            {{ scope.row.sumAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="扣费比例" width="250">
          <template slot-scope="scope">
            {{ scope.row.categSelfpayRate }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医保类型" width="250">
          <template slot-scope="scope">
            {{ scope.row.secuTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="自付金额" width="250">
          <template slot-scope="scope">
            {{ scope.row.categSelfpayAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="大项号" width="250">
          <template slot-scope="scope">
            {{ scope.row.maxtermNo }}
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
import { getList, findById, del } from '@/api/preview/base'
// import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    invPkId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'inputTreatInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        invPkId: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {}
    }
  },
  mounted() {
    if (this.invPkId) {
      this.listQuery.invPkId = this.invPkId
      this.fetchData()
    }
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
    /* fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['DiaMatchTyp'] }).then(res => {
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
    },*/
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
