<template>
  <div>
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
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
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
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
    <!--
    对话框
    :visible.sync:控制对话框显示与隐藏
    -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!--表单 :model="tmForm" :model属性的意思是，把表单的数据收集到tmForm的身上，表单验证也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!--
            这里收集数据不能使用v-model，因为不是表单元素
            action:设置图片上传的地址
            :on-success="handleAvatarSuccess"：可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload="beforeAvatarUpload"：在图片上传之前会执行一次
            -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      //当前第几页
      page: 1,
      //每一页展示的数据条数
      limit: 3,
      //总数据数
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示与隐藏
      dialogFormVisible: false,
      //上传图片使用的属性
      // imageUrl: '',
      //收集品牌信息：对象身上的属性不能瞎写，需要看文档
      tmForm: {
        tmName: '',
        logoUrl: ''
      }
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
      const {page, limit} = this
      //获取品牌列表接口,向服务器发请求需要带参，因此在data中初始化两个字段，代表给服务器传递参数
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        //展示的数据总条数与列表展示的数据
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    //分页器中的一页展示的条数发生变化时会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    //点击添加品牌按钮
    showDialog() {
      //显示对话框
      this.dialogFormVisible = true
      //清除数据
      this.tmForm = {tmName: '', logoUrl: ''}
    },
    //修改某一个品牌
    updateTradeMark(row) {
      //row:用户选中的品牌的信息
      this.dialogFormVisible = true
      //将已有的品牌信息赋值给tmForm在界面进行展示
      this.tmForm = {...row}
    },
    //上传图片成功
    handleAvatarSuccess(res, file) {
      //res:上传成功之后，服务器返回的数据
      //file：上传成功之后，服务器返回的数据
      //收集品牌图片数据，将来带给服务器
      this.tmForm.logoUrl = res.data
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //确定按钮：添加|修改品牌
    async addOrUpdateTradeMark() {
      //关闭对话框
      this.dialogFormVisible = false
      //发请求（添加|修改品牌）
      try {
        let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
        if (result.code == 200) {
          //弹出信息：添加品牌成功|修改品牌成功
          this.$message.success(this.tmForm.id ? '修改品牌成功' : '添加品牌成功')
          //操作成功之后，获取品牌列表
          this.getPageList(this.tmForm.id?this.page:1)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
