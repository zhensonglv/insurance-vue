<template>
  <el-dialog title="责任服务类型匹配" :visible.sync="dialogTableVisible" append-to-body>
    <div>
      <el-input v-model="listQuery.dutyNo" style="width: 200px;" placeholder="请输入责任号查询" />
      <el-input v-model="listQuery.dutyDesc" style="width: 200px;" placeholder="请输入责任描述查询" />
      <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="queryData">查询</el-button>
      <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
    </div>
    <br>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row type="selection" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="责任号" width="150">
        <template slot-scope="scope">
          {{ scope.row.dutyNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="责任描述" width="150">
        <template slot-scope="scope">
          {{ scope.row.dutyDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="服务类型起始码" width="150">
        <template slot-scope="scope">
          {{ scope.row.begSertypCde }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="服务类型结束码" width="150">
        <template slot-scope="scope">
          {{ scope.row.endSertypCde }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="queryData"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">
        取消
      </el-button>
      <el-button type="primary" @click="onSubmit">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getList } from '@/api/base'
import Pagination from '@/components/Pagination'
export default {
  name: 'Match',
  components: { Pagination },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'dutySertypMatching',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        dutyNo: '',
        dutyDesc: '',
        sort: '+id'
      },
      total: 0,
      multipleSelection: [],
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      this.dialogTableVisible = val
    },
    dialogTableVisible(val) {
      this.$emit('input', val)
    }
  },
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.listLoading = true
      getList(this.basePath, this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleClose() {
      this.dialogTableVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetData() {
      this.listQuery.dutyNo = null
      this.listQuery.dutyDesc = null
    },
    onSubmit() {
      if (this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '只能选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$emit('matchConfirm', this.multipleSelection)
      this.dialogTableVisible = false
    }
  }
}
</script>
