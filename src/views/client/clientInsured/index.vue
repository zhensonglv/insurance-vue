<template>
  <div class="app-container">
    <el-card>
      <div>

        <el-input v-model="listQuery.insuredNme" style="width: 200px;" placeholder="请输入被保险人姓名查询" />
        <el-input v-model="listQuery.certCde" style="width: 200px;" placeholder="请输入被保人证件号查询" />
        <el-input v-model="listQuery.insuredNo" style="width: 200px;" placeholder="请输入被保人客户号查询" />
        <el-input v-model="listQuery.plyNo" style="width: 200px;" placeholder="请输入保单号查询" />
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-search" @click="resetData">重置</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleMedical">被保人既往症设置</el-button>

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
        <el-table-column align="center" label="被保人姓名" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuredNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人证件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.certCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人客户号" width="150">
          <template slot-scope="scope">
            {{ scope.row.insuredNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="保单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单号" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="公司名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.department }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="证件类型" width="150">
          <template slot-scope="scope">
            {{ BQCertType[scope.row.certCls] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="生日" width="150">
          <template slot-scope="scope">
            {{ scope.row.birthTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别" width="150">
          <template slot-scope="scope">
            {{ CEasyDiaSex[scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主被保人客户号" width="150">
          <template slot-scope="scope">
            {{ scope.row.principalInsuredNo }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主被保人姓名" width="150">
          <template slot-scope="scope">
            {{ scope.row.principalInsuredNme }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主被保人证件类型" width="150">
          <template slot-scope="scope">
            {{ BQCertType[scope.row.principalCertCls] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="主被保人证件号" width="150">
          <template slot-scope="scope">
            {{ scope.row.principalCertCde }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="关系" width="150">
          <template slot-scope="scope">
            {{ CRelations[scope.row.relation] }}

          </template>
        </el-table-column>
        <el-table-column align="center" label="被保人手机" width="150">
          <template slot-scope="scope">
            {{ scope.row.tel }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否医保" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isMedicare] }}

          </template>
        </el-table-column>
        <el-table-column align="center" label="医保所在地" width="150">
          <template slot-scope="scope">
            {{ scope.row.medicareArea }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否生育保险" width="150">
          <template slot-scope="scope">
            {{ TrueOrFalse[scope.row.isMaternity] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="生育保险所在地" width="150">
          <template slot-scope="scope">
            {{ scope.row.maternityArea }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱" width="150">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="地址" width="150">
          <template slot-scope="scope">
            {{ scope.row.addr }}
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
  </div>
</template>

<script>
import { getList, del } from '@/api/base'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      listLoading: true,
      basePath: 'clientInsured',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        insuredNme: '',
        certCde: '',
        insuredNo: '',
        plyNo: '',
        sort: '+id'
      },
      total: 0,
      dialogVisible: false,
      form: null,
      businessData: {},
      BQCertType: {},
      CEasyDiaSex: {},
      CRelations: {},
      TrueOrFalse: {},
      paramRadio: false

    }
  },
  created() {
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
      this.listQuery.amountCode = null
    },
    handleSelect(data) {
      this.selected = data
    },
    handleMedical() {
      if (this.selected == null) {
        this.$message({
          showClose: true,
          message: '只能选择一条查看',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/client/clientAnamnesis', query: { plyNo: this.selected.plyNo, plyPartNo: this.selected.plyPartNo, insuredNo: this.selected.insuredNo }})
      }
    },
    fetchTypeData() {
      // 获取codeList
      var parantData = ['BQCertType', 'CEasyDiaSex', 'CRelations', 'TrueOrFalse']
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
