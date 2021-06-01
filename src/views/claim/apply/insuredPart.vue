<template>
  <div class="app-container">
    <el-card>
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
        <el-table-column align="center" label="等级" width="150">
          <template slot-scope="scope">
            {{ scope.row.insLv }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="等级描述" width="150">
          <template slot-scope="scope">
            {{ scope.row.insLvDesc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单起始日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNoBgnTm }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分单终止日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.plyPartNoEndTm }}
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
import { getInsuredPartList } from '@/api/base'
import { getCodeList } from '@/api/code'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    insuredId: String
  },
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

  watch: {
    insuredId: {
      handler(v) {
        if (v) {
          this.listQuery.insuredNo = v
          this.fetchTypeData()
        }
      },
      immediate: true
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
      this.paramRadio = false
      getInsuredPartList(this.basePath, this.listQuery).then(response => {
        this.list = response.data
        // this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSelect(data) {
      this.selected = data
      this.$emit('setMultipleSeleValues', data)
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
    }
  }
}
</script>
