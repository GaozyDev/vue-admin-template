<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!--三级联动已经是全局组件了-->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card>
      <!--底部由三部分进行切换-->
      <div v-show="scene==0">
        <!--展示spu列表结构-->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加spu</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!--这些按钮将来会用hintButton进行替换-->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改sku" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini"  title="查看当前spu全部sku列表"></hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
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
          :page-sizes="[3,5,10]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev,pager,next,jumper,->,sizes,total"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1"></SpuForm>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
//引入子组件
import SkuForm from "@/views/product/Spu/SkuForm/SkuForm";
import SpuForm from "@/views/product/Spu/SpuForm/SpuForm";
export default {
  name: 'Spu',
  components:{
    SpuForm,
    SkuForm
  },
  data() {
    return {
      //分别是分类的id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      //控制三级联动的可操作性
      show: true,
      page:1,//分页器当前是第几页
      limit:3,//每一页展示多少条数据
      records:[],//spu列表的数据
      total:0,//分页器一共需要展示多少条数据
      scene:0,//0:展示spu列表数据 1：添加spu|修改spu 3：添加sku
    }
  },
  methods: {
    //点击分页器第几页的按钮的回调
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    //当分页器的某一页展示的数据发生变化时的回调
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit
      //再次发请求
      this.getSpuList()
    },
    //三级联动的自定义事件，可以把子组件的id传递给父组件
    getCategoryId({categoryId, level}) {
      //categoryId：获取到一、二、三级分类的id level：为了区分是几级id
      if (level == 1) {
        this.getCategory1Id = categoryId
        //清除2、3级分类的id
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        //清除三级分类的id
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        //获取spu列表数据进行展示
        this.getSpuList()
      }

    },
    //获取spu列表数据的方法
    async getSpuList() {
      const {page,limit,category3Id} = this
      //携带三个参数：page：第几页 limit：每一页展示多少条数据 三级分类的id
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
      if(result.code==200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    //添加spu按钮的回调
    addSpu() {
      this.scene = 1
    },
    //修改某一个spu
    updateSpu(row) {
      this.scene = 1
    }
  }
}
</script>

<style scoped>

</style>
