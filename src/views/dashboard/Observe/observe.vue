<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
          <Search></Search>
      </el-col>
      <el-col :span="12">
          <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from "@/views/dashboard/Observe/Category/category";
import Search from "@/views/dashboard/Observe/Search/search";
export default {
  name: '',
  components: {
    Search,
    Category
  }
}
</script>

<style scoped>

</style>
