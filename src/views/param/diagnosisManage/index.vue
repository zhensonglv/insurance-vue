<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.diaCde" style="width: 200px;" placeholder="请输入诊断ICD主码查询" />
        <el-input v-model="listQuery.diaDesc" style="width: 200px;" placeholder="请输入诊断描述查询" />
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
        <el-table-column align="center" label="诊断ICD主码" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="诊断描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="对应事故原因" width="150">
          <template slot-scope="scope">
            {{ scope.row.accidentReason }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="ICD主码分类" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaTyp }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="ICD主码分类名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.icdTypNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否慢性病" width="150">
          <template slot-scope="scope">
            {{ scope.row.isSlowlyDise }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="易发年龄起始" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaBgnSex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="易发年龄结束" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaEndSex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="易发性别" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaSex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否外包" width="150">
          <template slot-scope="scope">
            {{ scope.row.isOut }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="临床诊断" width="150">
          <template slot-scope="scope">
            {{ scope.row.clinicDia }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="严重程度" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaSeverityLevel }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发病率" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaSeverityRate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="每次住院费用" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaOnceHospitalCost }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="每次门诊费用" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaOnceClinicCost }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="平均年就诊次数" width="150">
          <template slot-scope="scope">
            {{ scope.row.diaYeareClinicTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="解释码" width="150">
          <template slot-scope="scope">
            {{ scope.row.explCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="解释码描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.explCdeDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" class="action-button" @click="handleDel(scope.row.id)">删除</el-button>
            <!--<el-button type="primary" size="mini" icon="el-icon-view" class="action-button" @click="handleRoute(scope.row.id)">查看</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <save :son-data="form" @sonStatus="status" />

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

export default {
  components: { Pagination, Save },
  data() {
    return {
      list: null,
      basePath: 'diagnosisManage',
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        diaCde: '',
        diaDesc: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      paramRadio: false
    }
  },
  created() {
    this.fetchData()
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
      this.paramRadio = false
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
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
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
    },
    handleRoute(id) {
      console.log(id, '--')
      this.$router.push({ path: '/system/dict', query: { id: id }})
    },

    // 子组件的状态Flag，子组件通过`this.$emit('sonStatus', val)`给父组件传值
    // 父组件通过`@sonStatus`的方法`status`监听到子组件传递的值
    status(data) {
      if (data) {
        this.fetchData()
      }
    },

    handleDel(id) {
      this.$confirm('你确定永久删除此诊断码？, 是否继续?', '提示', {
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
