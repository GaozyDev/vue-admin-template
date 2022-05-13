<template>
  <div>
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px">添加</el-button>
    <!--表格组件
    data:表格组件将来需要展示的数据----数组类型
    border：表格边框
    label:显示的标题
    width：对应列的宽度
    align:标题的对齐方式
    prop：对应列内容的字段名
    注意：elementUI当中的table组件，展示数据是一列一列展示的
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
    分页器
    当前第几页、数据总条数、每一页展示的条数、连续页码数
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    current-page:当前第几页
    total：一共需要展示多少条数据、
    page-size：每一页需要展示多少条数据
    pager-count:页码按钮的数量 如果设置7 那么连续页码数就是5
    page-sizes=：可以设置每一页展示多少条数据
    layout：实现分页器的布局
    -->
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3,5,10]"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,sizes,total"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      //当前第几页
      page:1,
      //每一页展示的数据条数
      limit:3,
      //总数据数
      total:0,
      //列表展示的数据
      list:[]
    }
  },
  //组件挂载完毕发请求
  mounted() {
    //获取列表数据方法
    this.getPageList()
  },
  methods: {
    //获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager
      //解构出参数
      const {page,limit} = this
      //获取品牌列表接口,向服务器发请求需要带参，因此在data中初始化两个字段，代表给服务器传递参数
      let result = await this.$API.tradeMark.reqTradeMarkList(page,limit)
      if(result.code==200) {
        //展示的数据总条数与列表展示的数据
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    //分页器中的一页展示的条数发生变化时会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    }
  }
}
</script>

<style scoped>

</style>
