<template>
  <div class="app-container">
    <el-card>
      <div>
        <template v-if="paramType != 'param_0015'">
          <el-input v-model="listQuery.prodCde" style="width: 200px;" placeholder="请输入参数码查询" />
          <el-select v-model="listQuery.applyTyp" placeholder="请选择适用层级" clearable @change="applyTypChange">
            <el-option
              v-for="item in businessData.CProdApplyTyp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="listQuery.paramterTyp"
            placeholder="请选择参数类型"
            clearable
          >
            <el-option
              v-for="item in paramData.prodParamterTyp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="listQuery.paramterDesc" style="width: 200px;" placeholder="请输入参数描述查询" />
          <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
          <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
        </template>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleSave">添加</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleRoute">明细</el-button>
      </div>
      <br>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
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
        <el-table-column align="center" label="参数码" width="150">
          <template slot-scope="scope">
            {{ scope.row.prodCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="适用层级" width="150">
          <template slot-scope="scope">
            {{ CProdApplyTyp[scope.row.applyTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="参数类型" width="150">
          <template slot-scope="scope">
            {{ CParamTyps[scope.row.paramterTyp] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="参数描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.paramterDesc }}
          </template>
        </el-table-column> <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            {{ scope.row.descCrible }}
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

      <jumpDialog :visible="visible" :param-code="paramCde" :path-route="typPath" @sonVisible="sonVisible" />

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
import { getList, findById, del, getPath } from '@/api/base'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'
import Save from './save'
import jumpDialog from './jumpDialog'

export default {
  components: { Pagination, Save, jumpDialog },
  props: {
    setParamData: {
      type: Object,
      default: _ => {}
    },
    paramType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      typPath: '',
      visible: false,
      paramCde: null,
      list: null,
      listLoading: true,
      paramLoading: false,
      basePath: 'paramManage',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        prodCde: '',
        applyTyp: '',
        paramterTyp: '',
        paramterDesc: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      paramData: {},
      prodParamterTyp: {},
      selected: null,
      paramRadio: false
    }
  },
  watch: {
    setParamData: {
      handler(v) {
        this.listQuery.applyTyp = v && v.treeType
        this.listQuery.paramterTyp = v && v.paramType
        this.fetchTypeData()
      },
      immediate: true
    }
  },
  created() {
    // this.fetchData()
    this.fetchTypeData()
  },
  mounted() {
  },
  methods: {
    handleRoute() {
      const self = this
      if (this.selected == null) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        getPath({ paramterTyp: this.selected.paramterTyp }).then(res => {
          debugger
          self.typPath = res.data.typPath || ''
          self.visible = true
          self.paramCde = this.selected.prodCde
          // this.$router.push({ path: '/param/' + typPath, query: { paramCde: this.selected.prodCde }})
        })
      }
    },
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
    },
    _notify(message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    fetchData() {
      /* if (this.paramType === 'param_0015') {
        this.listQuery.paramterTyp = this.paramType
      }*/
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetData() {
      this.listQuery.prodCde = null
      this.listQuery.applyTyp = null
      this.listQuery.paramterTyp = null
      this.listQuery.paramterDesc = null
    },
    fetchTypeData() {
      // 获取codeList
      getCodeList({ parent: ['CProdApplyTyp', 'CParamTyps'] }).then(res => {
        this.businessData = res.data
        // 组装table 的map
        for (const key in this.businessData) {
          this.businessData[key].forEach(item => {
            !this[key] && (this[key] = {})
            this[key][item.value] = item.label
          })
        }
        // 参数类型配置
        if (this.listQuery.applyTyp) {
          getCodeList({ parent: [this.listQuery.applyTyp] }).then(res => {
            this.paramData = res.data
            for (const key in this.paramData) { // key:group  value：array
              // 数组[{label:'限额',value:'1',parent:'duty'},{label:'免赔额',value:'2',parent:'duty'}]
              this.paramData.prodParamterTyp = this.paramData[key]
            }
          })
        }
        this.fetchData()
      })
    },
    applyTypChange(data) {
      if (this.listQuery.applyTyp) {
        // 清空参数类型数据
        this.listQuery.paramterTyp = null
        getCodeList({ parent: [this.listQuery.applyTyp] }).then(res => {
          this.paramData = res.data
          for (const key in this.paramData) { // key:group  value：array
            // 数组[{label:'限额',value:'1',parent:'duty'},{label:'免赔额',value:'2',parent:'duty'}]
            this.paramData.prodParamterTyp = this.paramData[key]
          }
        })
      }
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
    sonVisible(v) {
      this.visible = v
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
