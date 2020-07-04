<template>
  <div class="table-container">
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        fit
        highlight-current-row
        @expand-change="expaneChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <table-component
              v-if="props.row.datalist"
              :list="props.row.datalist"
              :list-query="props.row.datalistQuery"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主被保险人客户标识号" width="200">
          <template slot-scope="scope">
            {{ scope.row.principalInsuredClientNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保险人客户号" width="200">
          <template slot-scope="scope">
            {{ scope.row.insuredNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人姓名" width="200">
          <template slot-scope="scope">
            {{ scope.row.insuredNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人证件号" width="200">
          <template slot-scope="scope">
            {{ scope.row.insuredCert }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保单位" width="200">
          <template slot-scope="scope">
            {{ scope.row.insuranceApplication }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="别名" width="200">
          <template slot-scope="scope">
            {{ scope.row.aliasNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="listQuery.total>0"
        :total="listQuery.total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
    </el-card>
  </div>
</template>

<script>
import { getList, findById } from '@/api/base'
import Pagination from '@/components/Pagination'

export default {
  name: 'TableComponent',
  components: { Pagination },
  props: {
    list: {
      type: Array,
      default: _ => []
    },
    listQuery: {
      type: Object,
      default: _ => {}
    }
  },
  data() {
    return {
      datalist: null,
      basePath: 'clientAlias',
      listLoading: false,
      datalistQuery: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      form: null
    }
  },
  created() {},
  methods: {
    expaneChange(row, arg) {
      console.log(arguments, '-------')
      row.datalist = [
        {
          aliasNme: 'eqewq',
          crtCde: 'tycoding',
          id: 1,
          insuranceApplication: 'eqeqw',
          insuredCert: '3123123123',
          insuredNme: '1111',
          insuredNo: 'eqweq',
          principalInsuredClientNo: 'eqweqwe',
          updCde: 'tycoding'
        },
        {
          aliasNme: '2eqewq',
          crtCde: '2tycoding',
          id: 2,
          insuranceApplication: 'eqeqw',
          insuredCert: '3123123123',
          insuredNme: '1111',
          insuredNo: 'eqweq',
          principalInsuredClientNo: '2eqweqwe',
          updCde: 'tycoding'
        }
      ]
      row.datalistQuery = this.datalistQuery
    },
    fetchData() {
      // this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.datalist = response.data.data
        this.datalistQuery.total = response.data.total
        // this.listLoading = false
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
    }
  }
}
</script>
