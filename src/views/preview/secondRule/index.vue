<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-input v-model="listQuery.ruleNo" style="width: 200px;" placeholder="请输入规则号查询" />
        <el-input v-model="listQuery.ruleDesc" style="width: 200px;" placeholder="请输入规则描述查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
      </div>
      <br>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="规则号" width="250">
          <template slot-scope="scope">
            {{ scope.row.ruleNo }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="规则描述" width="250">
          <template slot-scope="scope">
            {{ scope.row.ruleDesc }}

          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间" width="250">
          <template slot-scope="scope">
            {{ scope.row.crtTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建人" width="250">
          <template slot-scope="scope">
            {{ scope.row.crtCde }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="修改时间" width="250">
          <template slot-scope="scope">
            {{ scope.row.updTm }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="修改人" width="250">
          <template slot-scope="scope">
            {{ scope.row.updCde }}
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
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
    </el-card>
    <el-card>

      <el-form ref="form" :inline="true" :rules="rules" :model="form" status-icon label-position="right" label-width="80px">
        <el-form-item label="规则描述" prop="ruleDesc" label-width="500px">
          <el-input v-model="form.ruleDesc" placeholder="规则描述" type="textarea" class="text" />
        </el-form-item>
      </el-form>
      <el-table v-loading="false" :data="detailList" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelect">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index +1 }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="因子名称" width="250">
          <template slot-scope="scope">
            {{ ruleTypOptin[scope.row.ruleTyp] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="因子条件" width="750">
          <template slot-scope="scope">
            <el-input v-model="scope.row.condition" size="small" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleSet(scope.row)">设置</el-button>
          </template>
        </el-table-column>
        <DialogSet v-model="setVisable" :type="typeData" />
      </el-table>
    </el-card>
    <br>
    <div>
      <el-button style="margin-left: 750px;" type="success" icon="el-icon-search" @click="handleSave('form')">保存</el-button>
    </div>
  </div>
</template>

<style>
.text {
  width: 400px;
}
</style>

<script>
import { getList, deleteByCascade, save, findById } from '@/api/preview/base'
/*
import { getCodeList } from '@/api/code'
*/
import Pagination from '@/components/Pagination'
import DialogSet from './dialogSet'

export default {
  components: { Pagination, DialogSet },
  data() {
    return {
      list: null,
      typeData: null,
      setVisable: false,
      listLoading: true,
      detailList: [
        { ruleTyp: '1', condition: '' },
        { ruleTyp: '2', condition: '' },
        { ruleTyp: '3', condition: '' }],
      ruleTypOptin: { '1': '保单号', '2': '甲方公司', '3': '诊断码' },
      basePath: 'secondRule',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        sort: '+id',
        ruleNo: '',
        ruleDesc: ''
      },
      total: 0,
      dialogVisible: false,
      form: { id: null,
        ruleNo: null,
        ruleDesc: null,
        detailList: []
      },
      rules: {
        ruleDesc: [{ required: true, trigger: 'blur', message: '请输入规则描述' }]
      },
      selected: null
    }
  },
  created() {
    this.fetchData()
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
        this.add()
        this.listLoading = false
      })
    },

    handleSave(form) {
      if (this.selected == null) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.form.detailList = this.selected
            save(this.basePath, this.form).then(response => {
              if (response.code === 200) {
                this._notify(response.msg, 'success')
                this.fetchData()
              } else {
                this._notify(response.msg, 'error')
              }
            })
          }
        })
      }
    },

    add() {
      this.form = { id: null, ruleNo: null, ruleDesc: null }
      this.form.detailList = [{ ruleTyp: '1', condition: '' },
        { ruleTyp: '2', condition: '' },
        { ruleTyp: '3', condition: '' }]
      this.detailList = this.form.detailList
    },

    handleSelect(data) {
      this.selected = data
    },
    handleEdit(id) {
      findById(this.basePath, id).then(response => {
        this.form = response.data
        this.detailList = this.form.detailList
      })
    },
    handleSet(row) {
      this.setVisable = true
      this.typeData = row.ruleTyp
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
        deleteByCascade(this.basePath, id).then(response => {
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
