<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  },
  methods: {
    //自定义事件的回调
    getCategoryId({categoryId,level}) {
      //区分三级分类的id
      if(level==1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      }else if(level==2) {
        this.category2Id = categoryId
        this.category3Id = ''
      }else {
        this.category3Id = categoryId
        //发请求获取数据
        this.getAttrList()
      }
    },
    //获取平台属性的数据
    getAttrList() {
      console.log('faqingqiu')
    }
  }
}
</script>

<style scoped>

</style>
