<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!--三级联动已经是全局组件了-->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card>
      <!--底部由三部分进行切换-->
      <div>
        <!--展示spu列表结构-->
        <el-button type="primary" icon="el-icon-plus">添加spu</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!--这些按钮将来会用hintButton进行替换-->
              <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="info" icon="el-icon-info" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
          :current-page="6"
          :total="23"
          :page-size="3"
          :page-sizes="[3,5,10]"
          layout="prev,pager,next,jumper,->,sizes,total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      //分别是分类的id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      show: true
    }
  },
  methods: {
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
    getSpuList() {

    }
  }
}
</script>

<style scoped>

</style>
