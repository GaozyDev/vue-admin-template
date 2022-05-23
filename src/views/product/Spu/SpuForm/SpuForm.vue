<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--上传图片：action图片上传的地址 list-type:文件列表的类型 on-preview:点击文件列表中已上传的文件时的钩子 on-remove:文件列表移除文件时的钩子
        file-list:上传的文件列表-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      //spu初始化的时候是一个空对象，点击修改按钮，会向服务器发请求，返回spu信息（是一个对象），在修改的时候可以利用服务器返回的对象收集最新的数据提交给服务器
      //添加spu：点击添加spu按钮并不会向服务器发请求，关于数据收集到哪里？收集哪些字段？要看文档
      spu:{
        //三级分类的id
        "category3Id":0,
        //描述
        "description":'',
        //品牌的id
        "tmId":0,
        //spu名称
        "spuName":'',
        //收集spu图片的信息
        "spuImageList":[
          // {
          //   "id":0,
          //   "imageName":'string',
          //   "imageUrl":'string',
          //   "spuId":0
          // }
        ],
        //平台属性与属性值的收集
        "spuSaleAttrList":[
          // {
          //   "baseSaleAttrId":0,
          //   "id":0,
          //   "saleAttrName":'string',
          //   "spuId":0,
          //   "spuSaleAttrValueList":[
          //     {
          //       "baseSaleAttrId":0,
          //       "id":0,
          //       "isChecked":'string',
          //       "saleAttrName":'string',
          //       "saleAttrValueName":'string',
          //       "spuId":0
          //     }
          //   ]
          // }
        ],
      },
      tradeMarkList:[],//存储品牌的信息
      spuImageList:[],//存储spu图片
      saleAttrList:[],//获取平台全部的销售属性
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化SpuForm数据
    async initSpuDate(spu) {
      //获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if(spuResult.code==200) {
        this.spu = spuResult.data
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code==200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if(spuImageResult.code==200) {
        let listArr = spuImageResult.data
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要有name和url字段
        //需要吧服务器返回来的数据进行修改
        listArr.forEach(item=>{
          item.name = item.imgName
          item.url = item.imgUrl
        })
        //把整理好的数据赋值给spuImageList
        this.spuImageList = listArr
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code=200) {
        this.saleAttrList = saleResult.data
      }
    }
  }
}

</script>
