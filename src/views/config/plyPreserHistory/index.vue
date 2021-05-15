<template>
  <div class="app-container">
    <el-card>
      <div>

        <el-input v-model="listQuery.plyNo" style="width: 200px;" placeholder="请输入保单号查询" />
        <el-input v-model="listQuery.plyPartNo" style="width: 200px;" placeholder="请输入分单号查询" />
        <el-input v-model="listQuery.insuredNo" style="width: 200px;" placeholder="请输入被保人id查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
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
        <el-table-column align="center" label="投保公司名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.department }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人id" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuredNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuredNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人证件类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCls }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人证件号码" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.crtCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="投保等级" width="150">
          <template slot-scope="scope">
            {{ scope.row.insLv }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保全申请日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.cpreserBgnTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保全生效日期" width="150">
          <template slot-scope="scope">
            {{ PlyPreserType[scope.row.cpreserAppTm] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保全类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.preserType }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)" />
            </el-tooltip>
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
      basePath: 'plyPreserHistory',
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
      paramRadio: false
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
      this.listQuery.plyNo = null
      this.listQuery.plyPartNo = null
      this.listQuery.insuredNo = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['PlyPreserType', 'ChangeBasicInfo', 'TerminalGroup', 'AddInsured', 'ChangerPersonalInfo', 'TerminalInsured'] }).then(res => {
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
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
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
