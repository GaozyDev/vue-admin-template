<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width">
      </el-table-column>
      <el-table-column
        prop=""
        label="默认图片"
        width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 80px;height: 80px">
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(千克)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" icon="el-icon-top" size="mini"></el-button>
          <el-button type="success" icon="el-icon-bottom" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3,5,10]"
      :page-size="limit"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,//当前第几页
      limit: 10,//当前页面有多少条数据
      records: [],//存储sku列表的数据
      total: 0,//分页器一共展示的数据
    }
  },
  mounted() {
    //获取sku列表数据的方法
    this.getSkuList()
  },
  methods: {
    //点击分页器第几页的按钮的回调
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    //当分页器的某一页展示的数据发生变化时的回调
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit
      //再次发请求
      this.getSkuList()
    },
    //获取sku列表数据的方法
    async getSkuList() {
      //解构出数据
      const {page, limit} = this
      let result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    }
  }
}
</script>

<style scoped>

</style>
