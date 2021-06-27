<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
      </div>
      <br>
      <el-table
        v-loading="listLoading"
        class="table"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @expand-change="expandChange"
        @selection-change="handleSelect"
      >
        <el-table-column v-if="aggregate" type="expand">
          <template>
            <treat aggregate :inv-pk-id="invPkId" />
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
        />
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="批次号">
          <template slot-scope="scope">
            {{ scope.row.batchNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="对应人员层序号">
          <template slot-scope="scope">
            {{ scope.row.appId }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="就诊医院代码">
          <template slot-scope="scope">
            {{ scope.row.hospitalNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="医院名称">
          <template slot-scope="scope">
            {{ scope.row.hospitalNme }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="科室代码">
          <template slot-scope="scope">
            {{ scope.row.hospitalDepart }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="账单类型">
          <template slot-scope="scope">
            {{ scope.row.invTyp }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="发票金额">
          <template slot-scope="scope">
            {{ scope.row.sumAmt }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
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
import treat from '../inputTreatInfo'
import { getAreaCascader } from '@/api/preview/code'
import Pagination from '@/components/Pagination'
import Save from './save'

export default {
  components: { Pagination, Save, treat },
  props: {
    aggregate: {
      type: Boolean,
      default: false
    },
    appPkId: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      invPkId: null,
      basePath: 'inputInvInfo',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        appPkId: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      selected: []
      // DiaMatchTyp: {}
    }
  },
  mounted() {
    if (this.appPkId) {
      this.listQuery.appPkId = this.appPkId
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

    expandChange(row, extend) {
      this.invPkId = row.id
    },
    handleSelect(data) {
      this.selected = data
    },
    fetchData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        this.getAreaCascader()
      })
    },
    getAreaCascader() {
      getAreaCascader().then(response => {
        this.businessData.area = response.data
      })
    },
    /* fetchTypeData() {
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
    },*/
    handleSave() {
      this.form = { id: null, appPkId: this.listQuery.appPkId }
      /* if (this.$route.query.pubCoverId) { // 上级页面传入参数
            this.form.pubCoverId = this.$route.query.pubCoverId
          }*/
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
